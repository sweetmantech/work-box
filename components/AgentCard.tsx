import { Star, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import { Agent } from "@/lib/agents-data";

type AgentCardProps = {
  agent: Agent;
  onSelect: (agent: Agent) => void;
};

export default function AgentCard({ agent, onSelect }: AgentCardProps) {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "Busy":
        return "bg-red-500";
      case "Scheduled":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-[#2a2a2a] rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all">
      <div className="relative h-48">
        <Image
          src={agent.imageUrl}
          alt={agent.title}
          fill
          className="object-cover"
        />
        <div
          className={`absolute top-2 right-2 ${getAvailabilityColor(agent.availability)} text-white px-3 py-1 rounded-full text-sm font-medium`}
        >
          {agent.availability}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#cfcfcf]">{agent.title}</h3>
            <p className="text-gray-400">{agent.experience}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-[#cfcfcf]">{agent.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{agent.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {agent.specializations.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="bg-[#212121] text-sm text-[#cfcfcf] px-2 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>${agent.pricing.hourly}/hr</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>${agent.pricing.monthly}/mo</span>
          </div>
        </div>

        <button
          onClick={() => onSelect(agent)}
          className="w-full bg-[#a194a7] hover:bg-cyan-500 text-black py-2 rounded-lg font-medium transition-colors"
        >
          Select Agent
        </button>
      </div>
    </div>
  );
}
