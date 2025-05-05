import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchUnresolved } from '../store/slices/disputesSlice'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from '../components/Table'

export default function DisputesPage() {
  const dispatch = useAppDispatch()
  const { duplicates, disputedPlots, loading, error } = useAppSelector(s => s.disputes)

  useEffect(() => {
    dispatch(fetchUnresolved())
  }, [dispatch])

  if (loading) return <div className="p-4">Loading…</div>
  if (error)   return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Duplicates & Unresolved</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Duplicates</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Plot #</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Circle ID</TableHead>
              <TableHead>Duplicates</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {duplicates.map((p, i) => (
              <TableRow key={p.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{p.plot_number}</TableCell>
                <TableCell>{p.location}</TableCell>
                <TableCell>{p.circle_id}</TableCell>
                <TableCell>{p.no_of_duplicates}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Pending / Disputed</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Plot #</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Circle ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disputedPlots.map((p, i) => (
              <TableRow key={p.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{p.plot_number}</TableCell>
                <TableCell>{p.location}</TableCell>
                <TableCell>{p.circle_id}</TableCell>
                <TableCell className="capitalize">{p.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
