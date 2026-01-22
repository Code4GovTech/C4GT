import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchLogs } from '../store/slices/demarcationSlice'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from '../components/Table'
import { Button } from '../components/Button'

export default function DemarcationLogs() {
  const dispatch = useAppDispatch()
  const { logs, pagination, loading, error } = useAppSelector(s => s.demarcation)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchLogs({ page, limit: pagination.limit }))
  }, [dispatch, page, pagination.limit])

  if (loading) return <div className="p-4">Loading…</div>
  if (error)   return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Demarcation Logs</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Plot ID</TableHead>
            <TableHead>Officer ID</TableHead>
            <TableHead>Prev Status</TableHead>
            <TableHead>New Status</TableHead>
            <TableHead>Action Type</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, i) => (
            <TableRow key={log.id}>
              <TableCell>{i + 1 + (page - 1) * pagination.limit}</TableCell>
              <TableCell>{log.plot_id}</TableCell>
              <TableCell>{log.officer_id}</TableCell>
              <TableCell>{log.previous_status || '–'}</TableCell>
              <TableCell>{log.new_status}</TableCell>
              <TableCell>{log.action_type}</TableCell>
              <TableCell>{log.remarks}</TableCell>
              <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center space-x-2">
        <Button
          disabled={page <= 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span>Page {page} / {pagination.pages}</span>
        <Button
          disabled={page >= pagination.pages}
          onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
