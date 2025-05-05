"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ComplaintDetailsProps {
  complaint: any
  onStatusChange: (complaintId: string, newStatus: string) => void
}

export function ComplaintDetails({ complaint, onStatusChange }: ComplaintDetailsProps) {
  const [newUpdate, setNewUpdate] = useState("")

  const handleAddUpdate = () => {
    if (!newUpdate.trim()) return

    // In a real app, this would call an API to add the update
    console.log("Adding update:", newUpdate)
    setNewUpdate("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Complaint #{complaint.id}</CardTitle>
              <CardDescription>Submitted on {complaint.submittedOn}</CardDescription>
            </div>
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
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Complaint Type</h4>
              <p className="font-medium">{complaint.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Priority</h4>
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
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p>{complaint.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
              <p>{complaint.assignedTo}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Submitted By</h4>
              <p>{complaint.submittedBy}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
              <p>{complaint.lastUpdated}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1">{complaint.description}</p>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium">Status Updates</h4>
              <div className="flex items-center gap-2">
                <Select defaultValue={complaint.status} onValueChange={(value) => onStatusChange(complaint.id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {complaint.updates.map((update: any, index: number) => (
                <div key={index} className="flex gap-3 text-sm">
                  <div className="w-24 shrink-0 text-gray-500">{update.date}</div>
                  <div>{update.content}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-2">
            <h4 className="text-sm font-medium">Add Update</h4>
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a new update or note..."
                className="min-h-[80px]"
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
              />
            </div>
            <Button onClick={handleAddUpdate} className="gap-1">
              <Send className="h-4 w-4" /> Add Update
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
