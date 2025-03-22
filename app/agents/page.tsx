"use client";

import { useState } from "react";
import { Search, Briefcase, Users, Scale } from "lucide-react";
import AgentCard from "@/components/AgentCard";
import { agents, Agent } from "@/lib/agents-data";

export default function AgentsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter((agent) => {
    const matchesType = !selectedType || agent.type === selectedType;
    const matchesSearch =
      agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAgentSelect = (agent: Agent) => {
    // Handle agent selection - you can implement this based on your needs
    console.log("Selected agent:", agent);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "HR":
        return <Users className="w-5 h-5" />;
      case "Marketing":
        return <Briefcase className="w-5 h-5" />;
      case "Legal":
        return <Scale className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#cfcfcf] mb-2">
            Select Your Agent
          </h1>
          <p className="text-gray-400">
            Choose from our specialized agents to build your dream team
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] text-[#cfcfcf] rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex gap-2">
            {["HR", "Marketing", "Legal"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setSelectedType(selectedType === type ? null : type)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  selectedType === type
                    ? "bg-cyan-500 text-black border-cyan-500"
                    : "bg-[#2a2a2a] text-[#cfcfcf] border-gray-700 hover:border-cyan-500"
                }`}
              >
                {getTypeIcon(type)}
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onSelect={handleAgentSelect}
            />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No agents found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
