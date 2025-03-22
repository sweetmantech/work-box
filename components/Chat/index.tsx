"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateText } from "ai"; // [^2]
import { openai } from "@ai-sdk/openai"; // [^2]

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  agentId: string;
  departmentId: string;
}

export default function Chat({ agentId, departmentId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add initial welcome message from agent
  useEffect(() => {
    const agentRoles: Record<string, string> = {
      "hr-onboarding": "Employee Onboarding/Offboarding Assistant",
      "hr-performance": "Performance Review Assistant",
      "finance-expenses": "Expense Approval Assistant",
      "finance-forecasting": "Financial Forecasting Assistant",
      "marketing-leads": "Lead Qualification Assistant",
      "marketing-content": "Content Generation Assistant",
      "legal-contracts": "Contract Drafting Assistant",
      "legal-compliance": "Compliance Check Assistant",
    };

    const agentKey = `${departmentId}-${agentId}`;
    const role = agentRoles[agentKey] || "AI Assistant";

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm your ${role}. How can I help you today?`,
        timestamp: new Date(),
      },
    ]);

    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [agentId, departmentId]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Generate agent prompt based on department and agent type
      const agentContext = getAgentContext(departmentId, agentId);

      // Use AI SDK to generate a response
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: input,
        system: agentContext,
      });

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "I'm sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Get the right context for the agent based on department and agent type
  const getAgentContext = (department: string, agent: string): string => {
    const contexts: Record<string, string> = {
      "hr-onboarding":
        "You are an Employee Onboarding/Offboarding assistant. Help with collecting new hire data, checking policies, setting up accounts, and managing offboarding tasks.",
      "hr-performance":
        "You are a Performance Review assistant. Help analyze feedback, identify themes, spot skill gaps, and suggest training plans.",
      "finance-expenses":
        "You are an Expense Approval assistant. Review expenses for policy compliance, flag suspicious items, and streamline approvals.",
      "finance-forecasting":
        "You are a Financial Forecasting assistant. Help with financial modeling, predictions, and generating reports.",
      "marketing-leads":
        "You are a Lead Qualification assistant. Help score leads, analyze conversion data, and recommend follow-up actions.",
      "marketing-content":
        "You are a Content Generation assistant. Create social media posts, emails, and blog outlines in the company's brand voice.",
      "legal-contracts":
        "You are a Contract Drafting assistant. Help create standard contract clauses, highlight risks, and ensure compliance.",
      "legal-compliance":
        "You are a Compliance Check assistant. Cross-check policies with regulations and identify potential compliance issues.",
    };

    const key = `${department}-${agent}`;
    return contexts[key] || "You are a helpful assistant.";
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="flex flex-col h-full border-muted shadow-sm">
      <CardContent className="flex-1 overflow-y-auto p-4 pt-6">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
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
                    {message.content}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-2">
                    {formatTime(message.timestamp)}
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
              onChange={(e) => setInput(e.target.value)}
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
            disabled={isLoading || input.trim() === ""}
            className="rounded-full h-10 w-10 bg-primary"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
