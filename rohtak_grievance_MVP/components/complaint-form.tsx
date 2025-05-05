"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface ComplaintFormProps {
  complaintType: string
  onSubmit: (data: any) => void
}

export function ComplaintForm({ complaintType, onSubmit }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    description: "",
    attachments: [] as File[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      type: complaintType,
    })
  }

  return (
    <Card className="my-4">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Input
                id="location"
                name="location"
                placeholder="Enter the location of the issue"
                value={formData.location}
                onChange={handleChange}
                className="pl-9"
                required
              />
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Describe the Issue</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Please provide details about the issue"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Add Photos (Optional)</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Attach Photos
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Complaint
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
