import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "quiz" | "visualization";
}

interface ChatInterfaceProps {
  messages: Message[];
}

export default function ChatInterface({ messages }: ChatInterfaceProps) {
  return (
    <ScrollArea className="h-full pr-4" data-testid="component-chat">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
            data-testid={`message-${message.role}`}
          >
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>

            <div
              className={`flex max-w-[80%] flex-col gap-2 rounded-lg px-4 py-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.type === "quiz" && (
                <Badge variant="outline" className="w-fit">Quiz Triggered</Badge>
              )}
              {message.type === "visualization" && (
                <Badge variant="outline" className="w-fit">Visualization</Badge>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
              <span className={`text-xs ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
