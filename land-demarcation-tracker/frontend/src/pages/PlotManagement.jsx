// src/pages/PlotManagement.jsx
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchPlots, registerPlot, updatePlot } from '../store/slices/plotSlice'

import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from '../components/Table'
import { Button } from '../components/Button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/Select'
import { toast } from 'react-toastify'

export default function PlotManagement() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(s => s.auth)
  const circles = useAppSelector(s => s.auth.circles);
  const { plots, pagination, loading, error } = useAppSelector(s => s.plots)

  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage]                 = useState(1)
  const [showCreate, setShowCreate]     = useState(false)
  const [newPlot, setNewPlot]           = useState({ plot_number: '', location: '', circle_id: '', status: 'pending' })

  const [editing, setEditing]           = useState(null)
  const [editStatus, setEditStatus]     = useState('')
  const [editRemarks, setEditRemarks]   = useState('')

  useEffect(() => {
    dispatch(fetchPlots({
      status: statusFilter === 'all' ? undefined : statusFilter,
      page,
      limit: pagination.limit,
    }))
    
  }, [dispatch, statusFilter, page])  

  const onCreateSubmit = async e => {
    e.preventDefault()
    try {
      await dispatch(registerPlot(newPlot)).unwrap()
      toast.success('Plot created')
      setShowCreate(false)
    } catch (err) {
      toast.error(err)
    }
  }

  const onUpdateSubmit = async e => {
    e.preventDefault()
    try {
      await dispatch(updatePlot({ plot_id: editing.id, status: editStatus, remarks: editRemarks })).unwrap()
      toast.success('Status updated')
      setEditing(null)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Plot Management</h1>

        {/* status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Filter status" /></SelectTrigger>
            <SelectContent>
                {/* value="all" instead of empty string */}
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
        </Select>
        {/* Admin only: Create button */}
        {user.user.role === 'admin' && (
          <Button onClick={() => setShowCreate(true)}>+ Create Plot</Button>
        )}
      </div>

      {loading && <div>Loading…</div>}
      {error   && <div className="text-red-600">{error}</div>}

      {/* Plots table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Circle</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Duplicates</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plots.map((p, i) => (
            <TableRow key={p.id}>
              <TableCell>{i + 1 + (page-1)*pagination.limit}</TableCell>
              <TableCell>{p.plot_number}</TableCell>
              <TableCell>{p.location}</TableCell>
              <TableCell>{p.circle_id}</TableCell>
              <TableCell className="capitalize">{p.status}</TableCell>
              <TableCell>{p.no_of_duplicates}</TableCell>
              <TableCell>
                {user.user.role === 'officer' && (
                  <Button size="sm" onClick={() => {
                    setEditing(p)
                    setEditStatus(p.status)
                    setEditRemarks('')
                  }}>
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <div className="flex justify-between">
        <Button disabled={page<=1} onClick={()=>setPage(page-1)}>Previous</Button>
        <span>Page {page} / {pagination.pages}</span>
        <Button disabled={page>=pagination.pages} onClick={()=>setPage(page+1)}>Next</Button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form
            onSubmit={onCreateSubmit}
            className="bg-white p-6 rounded shadow space-y-4 w-96"
          >
            <h2 className="text-lg font-semibold">New Plot</h2>

            <input
              type="text"
              required
              placeholder="Plot number"
              className="w-full border p-2"
              value={newPlot.plot_number}
              onChange={e => setNewPlot({
                ...newPlot,
                plot_number: e.target.value
              })}
            />

            <input
              type="text"
              required
              placeholder="Location"
              className="w-full border p-2"
              value={newPlot.location}
              onChange={e => setNewPlot({
                ...newPlot,
                location: e.target.value
              })}
            />

            {/* Circle dropdown */}
            <Select
              value={newPlot.circle_id}
              onValueChange={val => setNewPlot({
                ...newPlot,
                circle_id: val
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select circle" />
              </SelectTrigger>
              <SelectContent>
                {circles.map(c => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <select
              value={newPlot.status}
              onChange={e => setNewPlot({
                ...newPlot,
                status: e.target.value
              })}
              className="w-full border p-2"
            >
              <option value="pending">pending</option>
              <option value="resolved">resolved</option>
              <option value="disputed">disputed</option>
            </select>

            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      { editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form onSubmit={onUpdateSubmit} className="bg-white p-6 rounded shadow space-y-4 w-96">
            <h2 className="text-lg font-semibold">Update Plot #{editing.plot_number}</h2>
            <select
              value={editStatus}
              onChange={e=>setEditStatus(e.target.value)}
              className="w-full border p-2"
            >
              <option value="pending">pending</option>
              <option value="resolved">resolved</option>
              <option value="disputed">disputed</option>
            </select>
            <textarea
              placeholder="Remarks (optional)"
              className="w-full border p-2"
              value={editRemarks}
              onChange={e=>setEditRemarks(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={()=>setEditing(null)}>Cancel</Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
