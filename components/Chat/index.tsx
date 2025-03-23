"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect } from "react";
import { SendHorizontal, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatInterfaceProps {
  agentId: string;
  departmentId: string;
}

interface MessagePart {
  type: "text" | "reasoning";
  text?: string;
  details?: Array<{ type: string; text: string }>;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  parts?: MessagePart[];
}

export default function Chat({ agentId, departmentId }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =

    useChat({
      api: "/api/chat",
      body: {
        agentId,
        departmentId,
      },
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content: `Hello! I'm your AI Assistant. How can I help you today?`,
        },
      ],
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Render message content based on part type
  const renderMessageContent = (message: ChatMessage) => {
    if (!message.parts) {
      // Handle legacy message format
      return <div>{message.content}</div>;
    }

    return message.parts.map((part: MessagePart, index: number) => {
      switch (part.type) {
        case "text":
          return <div key={`${message.id}-${index}`}>{part.text}</div>;
        case "reasoning":
          return (
            <div
              key={`${message.id}-${index}`}
              className="text-sm bg-muted/30 rounded-lg p-2 mt-2 font-mono"
            >
              {part.details?.map((detail, detailIndex) => (
                <div
                  key={`${message.id}-${index}-${detailIndex}`}
                  className="text-muted-foreground"
                >
                  {detail.type === "text" ? detail.text : "<redacted>"}
                </div>
              ))}
            </div>
          );
        default:
          return null;
      }
    });

  };

  return (
    <Card className="flex flex-col h-full border-muted shadow-sm">
      <CardContent className="flex-1 overflow-y-auto p-4 pt-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[85%] ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar
                  className={
                    message.role === "user" ? "bg-primary" : "bg-muted"
                  }
                >
                  {message.role === "user" ? (
                    <AvatarFallback>U</AvatarFallback>
                  ) : (
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt="Agent"
                    />
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <div
                    className={`rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-foreground border border-border/50"
                    }`}
                  >
                    {renderMessageContent(message as ChatMessage)}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-2">
                    {formatTime(new Date())}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <Avatar className="bg-muted">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt="Agent"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <div className="rounded-2xl p-4 bg-muted/50 text-foreground border border-border/50">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">
                {error.message}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-2 items-center"
        >
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="pr-10 rounded-full"
              disabled={isLoading}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-full h-10 w-10 bg-primary"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}


// si es agent id legal , guarda la respuesta si la respuesta es un markdown , convierte 