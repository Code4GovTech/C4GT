import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface TicketConfirmationProps {
  ticketId: string
}

export function TicketConfirmation({ ticketId }: TicketConfirmationProps) {
  return (
    <Card className="my-4 border-green-200 bg-green-50">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-2">
          <div className="rounded-full bg-green-100 p-2">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-center text-green-800">Complaint Submitted Successfully</CardTitle>
        <CardDescription className="text-center text-green-700">
          Your complaint has been registered with the Rohtak Municipal Corporation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-sm text-green-700 mb-1">Your Ticket ID</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-bold text-green-900">{ticketId}</p>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-green-700 text-center max-w-md">
            <p>
              Please save this ticket ID for future reference. You can use it to track the status of your complaint.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" className="border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900">
          Track Complaint Status
        </Button>
      </CardFooter>
    </Card>
  )
}
