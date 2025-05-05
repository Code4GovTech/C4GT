"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "@/components/chat-message"
import { ComplaintForm } from "@/components/complaint-form"
import { TicketConfirmation } from "@/components/ticket-confirmation"

type MessageType = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

type ChatStage = "welcome" | "complaint-type" | "complaint-form" | "confirmation"

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "Welcome to Rohtak Grievance Redressal System. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [stage, setStage] = useState<ChatStage>("welcome")
  const [complaintType, setComplaintType] = useState<string | null>(null)
  const [ticketId, setTicketId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    // Add user message
    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    // Process based on current stage
    if (stage === "welcome") {
      setTimeout(() => {
        const botResponse: MessageType = {
          id: (Date.now() + 1).toString(),
          content: "Please select the type of complaint you want to register:",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setStage("complaint-type")
      }, 1000)
    } else if (stage === "complaint-type") {
      setComplaintType(inputValue)
      setTimeout(() => {
        const botResponse: MessageType = {
          id: (Date.now() + 1).toString(),
          content: `You've selected: ${inputValue}. Please provide more details about your complaint.`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setStage("complaint-form")
      }, 1000)
    }
  }

  const handleComplaintSubmit = (data: any) => {
    // Generate a random ticket ID
    const newTicketId = `RGR${Math.floor(10000 + Math.random() * 90000)}`
    setTicketId(newTicketId)

    setTimeout(() => {
      const botResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for submitting your complaint. Your ticket ID is: ${newTicketId}`,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setStage("confirmation")
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="ml-auto">
            <span className="font-bold">Rohtak Grievance Chat</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="container h-full flex flex-col max-w-3xl mx-auto p-4">
          <div className="flex-1 overflow-y-auto bg-white rounded-t-lg shadow-sm p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  sender={message.sender}
                  timestamp={message.timestamp}
                />
              ))}

              {stage === "complaint-type" && (
                <div className="flex flex-wrap gap-2 my-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue("Water Supply Issue")
                      setTimeout(() => handleSend(), 100)
                    }}
                  >
                    Water Supply Issue
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue("Road Maintenance")
                      setTimeout(() => handleSend(), 100)
                    }}
                  >
                    Road Maintenance
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue("Garbage Collection")
                      setTimeout(() => handleSend(), 100)
                    }}
                  >
                    Garbage Collection
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue("Electricity Issue")
                      setTimeout(() => handleSend(), 100)
                    }}
                  >
                    Electricity Issue
                  </Button>
                </div>
              )}

              {stage === "complaint-form" && (
                <ComplaintForm complaintType={complaintType || ""} onSubmit={handleComplaintSubmit} />
              )}

              {stage === "confirmation" && ticketId && <TicketConfirmation ticketId={ticketId} />}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="bg-white p-4 border-t rounded-b-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={stage === "complaint-form" || stage === "confirmation"}
              />
              <Button
                size="icon"
                className="shrink-0"
                onClick={handleSend}
                disabled={stage === "complaint-form" || stage === "confirmation"}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
