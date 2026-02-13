// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchDashboardSummary } from '../store/slices/dashboardSlice'

import PieChart from '../components/PieChart'
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from '../components/Card'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from '../components/Table'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '../components/Select'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { summary, loading, error } = useAppSelector(s => s.dashboard)
  const { circles: allCircles, officers: allOfficers } = useAppSelector(s => s.auth)

  const [circleFilter, setCircleFilter]   = useState('all')
  const [officerFilter, setOfficerFilter] = useState('all')
  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (!summary && !loading) dispatch(fetchDashboardSummary())
  }, [dispatch, summary, loading])

  if (loading) return <div className="p-4">Loading…</div>
  if (error)   return <div className="p-4 text-red-600">Error: {error}</div>
  if (!summary) return null

  const {
    totalPlots,
    pending,
    resolved,
    disputed,
    duplicateCount,
    byCircle,
    byOfficer
  } = summary

  // 1️⃣ Build global status data for the PieChart
  const globalStatusData = [
    { name: 'Resolved',   value: resolved,       color: '#4C9935' },
    { name: 'Pending',    value: pending,        color: '#F59E0B' },
    { name: 'Disputed',   value: disputed,       color: 'red' },
    { name: 'Duplicates', value: duplicateCount, color: '#3B82F6' },
  ]

  // 2️⃣ Filtered circle/officer tables
  const filteredCircles = byCircle.filter(c =>
    circleFilter === 'all' || String(c.circle_id) === circleFilter
  )
  const filteredOfficers = byOfficer.filter(o =>
    officerFilter === 'all' || String(o.officer_id) === officerFilter
  )

  return (
    <div className="space-y-6 p-4">
      {/* Global Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: 'Total Plots', value: totalPlots },
          { title: 'Resolved',    value: resolved,  color: 'text-green-600' },
          { title: 'Pending',     value: pending,   color: 'text-yellow-600' },
          { title: 'Disputed',    value: disputed,  color: 'text-red-600' },
          { title: 'Duplicates',  value: duplicateCount },
        ].map(({ title, value, color = '' }, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${color}`}>{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Global Status Pie Chart */}
      <Card>
        <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Global Plot Status</CardTitle>
              <CardDescription>Overall distribution of plots</CardDescription>
            </div>
            {/* 1️⃣ Total count in header */}
            <div className="text-sm font-medium text-gray-700">
              Total: <span className="font-bold">{totalPlots}</span>
            </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
            {/* 2️⃣ The pie itself */}
            <div className="w-full h-56">
              <PieChart data={globalStatusData} label />
            </div>

            {/* 3️⃣ Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {globalStatusData.map(({ name, color }) => (
                  <div key={name} className="flex items-center space-x-1">
                  <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                  />
                  <span className="text-sm">{name}</span>
                  </div>
              ))}
            </div>
        </CardContent>
      </Card>

      {/* Circle Breakdown Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Circle Breakdown</CardTitle>
            <CardDescription>Plots by circle</CardDescription>
          </div>
          {
            user.user.role === 'admin' && (
              <div className="w-full sm:w-48 mt-4 sm:mt-0">
                <Select value={circleFilter} onValueChange={setCircleFilter}>
                  <SelectTrigger><SelectValue placeholder="Filter circle" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Circles</SelectItem>
                    {allCircles.map(c => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          }
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Circle</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Resolved</TableHead>
                <TableHead>Disputed</TableHead>
                <TableHead>Duplicates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCircles.map(c => (
                <TableRow key={c.circle_id}>
                  <TableCell>{c.circle_name}</TableCell>
                  <TableCell>{c.total}</TableCell>
                  <TableCell>{c.pending}</TableCell>
                  <TableCell>{c.resolved}</TableCell>
                  <TableCell>{c.disputed}</TableCell>
                  <TableCell>{c.duplicateCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Officer Breakdown Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Officer Breakdown</CardTitle>
            <CardDescription>Plots by officer</CardDescription>
          </div>
          {
            user.user.role === 'admin' && (
              <div className="w-full sm:w-48 mt-4 sm:mt-0">
                <Select value={officerFilter} onValueChange={setOfficerFilter}>
                  <SelectTrigger><SelectValue placeholder="Filter officer" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Officers</SelectItem>
                    {allOfficers.map(o => (
                      <SelectItem key={o.id} value={String(o.id)}>
                        {o.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          }
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Officer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Resolved</TableHead>
                <TableHead>Disputed</TableHead>
                <TableHead>Duplicates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOfficers.map(o => (
                <TableRow key={o.officer_id}>
                  <TableCell>{o.name}</TableCell>
                  <TableCell>{o.total}</TableCell>
                  <TableCell>{o.pending}</TableCell>
                  <TableCell>{o.resolved}</TableCell>
                  <TableCell>{o.disputed}</TableCell>
                  <TableCell>{o.duplicateCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
