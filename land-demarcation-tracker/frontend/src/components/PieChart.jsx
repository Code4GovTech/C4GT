import React from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function PieChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full">No data</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name" labelLine={false}>
          {data.map((e,i) => <Cell key={i} fill={e.color} />)}
        </Pie>
        <Tooltip formatter={val => [`${val}`, 'Count']} />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
