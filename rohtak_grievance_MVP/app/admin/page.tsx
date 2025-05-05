"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, Search, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ComplaintDetails } from "@/components/complaint-details"

// Mock data for complaints
const mockComplaints = [
  {
    id: "RGR12345",
    type: "Water Supply Issue",
    description: "Low water pressure in Sector 4 area",
    location: "Sector 4, Block B",
    status: "In Progress",
    priority: "Medium",
    submittedBy: "Rahul Sharma",
    submittedOn: "2025-05-03",
    assignedTo: "Water Department",
    lastUpdated: "2025-05-04",
    updates: [
      { date: "2025-05-03", content: "Complaint registered" },
      { date: "2025-05-04", content: "Assigned to field team for inspection" },
    ],
  },
  {
    id: "RGR12346",
    type: "Road Maintenance",
    description: "Pothole on main road near market",
    location: "Sector 2, Market Road",
    status: "Pending",
    priority: "High",
    submittedBy: "Priya Patel",
    submittedOn: "2025-05-02",
    assignedTo: "Roads Department",
    lastUpdated: "2025-05-02",
    updates: [{ date: "2025-05-02", content: "Complaint registered" }],
  },
  {
    id: "RGR12347",
    type: "Garbage Collection",
    description: "Garbage not collected for 3 days",
    location: "Sector 7, C Block",
    status: "Resolved",
    priority: "Medium",
    submittedBy: "Amit Kumar",
    submittedOn: "2025-05-01",
    assignedTo: "Sanitation Department",
    lastUpdated: "2025-05-03",
    updates: [
      { date: "2025-05-01", content: "Complaint registered" },
      { date: "2025-05-02", content: "Assigned to sanitation team" },
      { date: "2025-05-03", content: "Issue resolved - garbage collected" },
    ],
  },
  {
    id: "RGR12348",
    type: "Electricity Issue",
    description: "Frequent power cuts in the evening",
    location: "Sector 5, D Block",
    status: "In Progress",
    priority: "High",
    submittedBy: "Neha Singh",
    submittedOn: "2025-05-02",
    assignedTo: "Electricity Department",
    lastUpdated: "2025-05-04",
    updates: [
      { date: "2025-05-02", content: "Complaint registered" },
      { date: "2025-05-03", content: "Assigned to electrical team" },
      { date: "2025-05-04", content: "Team dispatched for inspection" },
    ],
  },
  {
    id: "RGR12349",
    type: "Water Supply Issue",
    description: "Contaminated water supply",
    location: "Sector 1, A Block",
    status: "Pending",
    priority: "Critical",
    submittedBy: "Vikram Malhotra",
    submittedOn: "2025-05-04",
    assignedTo: "Water Department",
    lastUpdated: "2025-05-04",
    updates: [{ date: "2025-05-04", content: "Complaint registered" }],
  },
]

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStatusChange = (complaintId: string, newStatus: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: newStatus,
              lastUpdated: new Date().toISOString().split("T")[0],
              updates: [
                ...complaint.updates,
                {
                  date: new Date().toISOString().split("T")[0],
                  content: `Status updated to ${newStatus}`,
                },
              ],
            }
          : complaint,
      ),
    )

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint({
        ...selectedComplaint,
        status: newStatus,
        lastUpdated: new Date().toISOString().split("T")[0],
        updates: [
          ...selectedComplaint.updates,
          {
            date: new Date().toISOString().split("T")[0],
            content: `Status updated to ${newStatus}`,
          },
        ],
      })
    }
  }

  const viewComplaintDetails = (complaint: any) => {
    setSelectedComplaint(complaint)
    setShowDetails(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="ml-auto">
            <span className="font-bold">Admin Dashboard</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container p-4 py-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Complaint Management</h1>
                <p className="text-gray-500">Manage and respond to citizen complaints</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search complaints..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {showDetails && selectedComplaint ? (
              <div>
                <Button variant="outline" className="mb-4" onClick={() => setShowDetails(false)}>
                  Back to List
                </Button>
                <ComplaintDetails complaint={selectedComplaint} onStatusChange={handleStatusChange} />
              </div>
            ) : (
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Complaints</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Submitted On</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredComplaints.map((complaint) => (
                            <TableRow key={complaint.id}>
                              <TableCell className="font-medium">{complaint.id}</TableCell>
                              <TableCell>{complaint.type}</TableCell>
                              <TableCell>{complaint.location}</TableCell>
                              <TableCell>{complaint.submittedOn}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    complaint.status === "Resolved"
                                      ? "default"
                                      : complaint.status === "In Progress"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {complaint.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    complaint.priority === "Critical"
                                      ? "destructive"
                                      : complaint.priority === "High"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {complaint.priority}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end">
                                  <Button variant="ghost" size="sm" onClick={() => viewComplaintDetails(complaint)}>
                                    View
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleStatusChange(complaint.id, "In Progress")}>
                                        Mark as In Progress
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleStatusChange(complaint.id, "Resolved")}>
                                        Mark as Resolved
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>Reassign Complaint</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="pending" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Submitted On</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredComplaints
                            .filter((complaint) => complaint.status === "Pending")
                            .map((complaint) => (
                              <TableRow key={complaint.id}>
                                <TableCell className="font-medium">{complaint.id}</TableCell>
                                <TableCell>{complaint.type}</TableCell>
                                <TableCell>{complaint.location}</TableCell>
                                <TableCell>{complaint.submittedOn}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      complaint.priority === "Critical"
                                        ? "destructive"
                                        : complaint.priority === "High"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {complaint.priority}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => viewComplaintDetails(complaint)}>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="in-progress" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredComplaints
                            .filter((complaint) => complaint.status === "In Progress")
                            .map((complaint) => (
                              <TableRow key={complaint.id}>
                                <TableCell className="font-medium">{complaint.id}</TableCell>
                                <TableCell>{complaint.type}</TableCell>
                                <TableCell>{complaint.location}</TableCell>
                                <TableCell>{complaint.assignedTo}</TableCell>
                                <TableCell>{complaint.lastUpdated}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => viewComplaintDetails(complaint)}>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="resolved" className="mt-4">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Resolved On</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredComplaints
                            .filter((complaint) => complaint.status === "Resolved")
                            .map((complaint) => (
                              <TableRow key={complaint.id}>
                                <TableCell className="font-medium">{complaint.id}</TableCell>
                                <TableCell>{complaint.type}</TableCell>
                                <TableCell>{complaint.location}</TableCell>
                                <TableCell>{complaint.lastUpdated}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => viewComplaintDetails(complaint)}>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{complaints.length}</div>
                  <p className="text-xs text-gray-500">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "Pending").length}</div>
                  <p className="text-xs text-gray-500">Requires attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {complaints.filter((c) => c.status === "In Progress").length}
                  </div>
                  <p className="text-xs text-gray-500">Being addressed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "Resolved").length}</div>
                  <p className="text-xs text-gray-500">Successfully completed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
