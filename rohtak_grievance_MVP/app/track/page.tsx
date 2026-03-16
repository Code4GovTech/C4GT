"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function TrackPage() {
  const [ticketId, setTicketId] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [ticketDetails, setTicketDetails] = useState<any>(null)
  const [error, setError] = useState("")

  const handleSearch = () => {
    if (!ticketId.trim()) {
      setError("Please enter a ticket ID")
      return
    }

    setSearchPerformed(true)
    setError("")

    // Mock ticket lookup - in a real app, this would be an API call
    if (ticketId.startsWith("RGR")) {
      setTicketDetails({
        id: ticketId,
        status: "In Progress",
        type: "Water Supply Issue",
        description: "Low water pressure in Sector 4 area",
        location: "Sector 4, Block B",
        submittedOn: "2025-05-03",
        assignedTo: "Water Department",
        lastUpdated: "2025-05-04",
        updates: [
          { date: "2025-05-03", content: "Complaint registered" },
          { date: "2025-05-04", content: "Assigned to field team for inspection" },
        ],
      })
    } else {
      setTicketDetails(null)
      setError("No ticket found with this ID. Please check and try again.")
    }
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
            <span className="font-bold">Track Your Complaint</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container max-w-3xl mx-auto p-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Track Complaint Status</CardTitle>
              <CardDescription>Enter your ticket ID to check the status of your complaint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="ticketId">Ticket ID</Label>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      id="ticketId"
                      placeholder="e.g. RGR12345"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                    />
                    <Button onClick={handleSearch}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                {searchPerformed && ticketDetails && (
                  <div className="mt-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Ticket: {ticketDetails.id}</h3>
                      <Badge
                        variant={
                          ticketDetails.status === "Resolved"
                            ? "default"
                            : ticketDetails.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {ticketDetails.status}
                      </Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Complaint Type</h4>
                        <p>{ticketDetails.type}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Submitted On</h4>
                        <p>{ticketDetails.submittedOn}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p>{ticketDetails.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
                        <p>{ticketDetails.assignedTo}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p>{ticketDetails.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Status Updates</h4>
                      <div className="space-y-2">
                        {ticketDetails.updates.map((update: any, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-24 shrink-0 text-gray-500">{update.date}</div>
                            <div>{update.content}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">Need help? Contact our support at support@rohtak.gov.in</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
