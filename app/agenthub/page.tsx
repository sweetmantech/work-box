"use client";

import { useState, useEffect } from "react";
import {
  BrainCircuit,
  Clock,
  FileText,
  MessageCircleIcon as Message,
  Users,
  FileSignature,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { MiniKit, WalletAuthInput } from '@worldcoin/minikit-js'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatInterface from "@/components/Chat";
import ContractSigningModule from "@/components/LegalAgent";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // [^1]
import { useIsMobile } from "@/hooks/use-mobile";

// Define departments and their agents
const departments = [
  {
    id: "ops",
    name: "Operations",
    icon: Users,
    agents: [
      {
        id: "onboarding",
        name: "Employee Onboarding/Offboarding",
        description:
          "Handles new hire data collection, policy checks, and offboarding tasks.",
      },
      {
        id: "performance",
        name: "Performance Reviews",
        description:
          "Gathers peer reviews, analyzes feedback, and suggests training plans.",
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    icon: FileText,
    agents: [
      {
        id: "web3-agent",
        name: "ZkSync Agent",
        description:
          "Interact with the ZkSync network to send ETH, ERC20 tokens, and more.",
      },
      {
        id: "forecasting",
        name: "Financial Forecasting",
        description:
          "Integrates financial data to generate predictions and reports.",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: BrainCircuit,
    agents: [
      {
        id: "leads",
        name: "Lead Qualification",
        description:
          "Captures and scores leads based on conversion data and behavior.",
      },
      {
        id: "content",
        name: "Content Generation",
        description:
          "Creates social media posts, emails, and blog outlines in your brand voice.",
      },
    ],
  },
  {
    id: "legal",
    name: "Legal",
    icon: Clock,
    agents: [
      {
        id: "contracts-agent",
        name: "Contract Drafting & Review",
        description:
          "Drafts contract clauses, highlights risks, and ensures compliance.",
      },
      {
        id: "compliance",
        name: "Compliance Checks",
        description:
          "Cross-checks policies with regulations and triggers alerts for mismatches.",
      },
    ],
  },
  {
    id: "contracts",
    name: "Contracts",
    icon: FileSignature,
    agents: [
      {
        id: "signing",
        name: " NDA Signing",
        description: "Digital contract signing with multi-party verification.",
      },
    ],
  },
];

export default function AgentPicker() {
  const [selectedDept, setSelectedDept] = useState("hr");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleSelectDepartment = (deptId: string) => {
    setSelectedDept(deptId);
    setSelectedAgent(null); // Reset selected agent when changing departments
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleBackToAgents = () => {
    setSelectedAgent(null);
  };

  const currentDepartment = departments.find(
    (dept) => dept.id === selectedDept
  );
  const currentAgent = currentDepartment?.agents.find(
    (agent) => agent.id === selectedAgent
  );
  const isContractSigning =
    selectedDept === "contracts" && selectedAgent === "signing";

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen bg-background">
        <Sidebar
          variant="floating"
          collapsible={isMobile ? "offcanvas" : "icon"}
        >
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-3">
              <Message className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Agent Hub</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Departments</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {departments.map((dept) => (
                    <SidebarMenuItem key={dept.id}>
                      <SidebarMenuButton
                        isActive={selectedDept === dept.id}
                        onClick={() => handleSelectDepartment(dept.id)}
                        tooltip={dept.name}
                      >
                        <dept.icon className="h-4 w-4" />
                        <span>{dept.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-3 text-xs text-muted-foreground">
              © 2025 ALEPH
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className={`flex-1 flex flex-col ${!isMobile && sidebarOpen ? "ml-[var(--sidebar-width)]" : ""}`}>
          <header className="border-b bg-card p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2">
              {isMobile && <SidebarTrigger className="mr-2" />}
              <h1 className="text-xl font-semibold">
                {currentDepartment?.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {!selectedAgent ? (
              <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight mb-2">
                    Available Agents
                  </h2>
                  <p className="text-muted-foreground">
                    Select an agent to start a conversation or process.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {currentDepartment?.agents.map((agent) => (
                    <Card
                      key={agent.id}
                      className="w-full cursor-pointer hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20 overflow-hidden group"
                      onClick={() => handleSelectAgent(agent.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-primary/10 text-primary">
                            {currentDepartment.icon && (
                              <currentDepartment.icon className="h-5 w-5" />
                            )}
                          </div>
                          {agent.name}
                        </CardTitle>
                        <CardDescription>{agent.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button
                          variant="ghost"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                        >
                          Select Agent
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col max-w-7xl mx-auto">
                <div className="flex items-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToAgents}
                    className="mr-4 flex items-center gap-1"
                  >
                    <span>←</span> Back
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {currentAgent?.name}
                  </h2>
                </div>
                <div className="flex-1">
                  {isContractSigning ? (
                    <ContractSigningModule />
                  ) : (
                    <ChatInterface
                      agentId={selectedAgent}
                      departmentId={selectedDept}
                    />
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
