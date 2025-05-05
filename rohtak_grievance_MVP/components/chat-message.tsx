import { format } from "date-fns"

interface ChatMessageProps {
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatMessage({ content, sender, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          sender === "user" ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="text-sm">{content}</div>
        <div className={`text-xs mt-1 ${sender === "user" ? "text-primary-foreground/70" : "text-gray-500"}`}>
          {format(timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  )
}
