export type AgentSkill = {
  name: string;
  level: number; // 1-5
};

export type Agent = {
  id: string;
  title: string;
  type: "HR" | "Marketing" | "Legal";
  description: string;
  experience: string;
  availability: "Available" | "Busy" | "Scheduled";
  rating: number;
  skills: AgentSkill[];
  specializations: string[];
  imageUrl: string;
  pricing: {
    hourly: number;
    monthly: number;
  };
};

export const agents: Agent[] = [
  {
    id: "hr-specialist",
    title: "HR Services Specialist",
    type: "HR",
    description:
      "Expert in talent acquisition, employee relations, and HR compliance",
    experience: "8 years experience",
    availability: "Available",
    rating: 4.8,
    skills: [
      { name: "Recruitment", level: 5 },
      { name: "Employee Relations", level: 5 },
      { name: "HR Compliance", level: 4 },
      { name: "Training & Development", level: 4 },
    ],
    specializations: [
      "Talent Acquisition",
      "Performance Management",
      "Employee Engagement",
      "HR Policy Development",
    ],
    imageUrl: "/agents/hr-agent.svg",
    pricing: {
      hourly: 85,
      monthly: 12000,
    },
  },
  {
    id: "marketing-strategist",
    title: "Marketing Strategist",
    type: "Marketing",
    description:
      "Digital marketing expert specializing in growth and brand development",
    experience: "6 years experience",
    availability: "Available",
    rating: 4.9,
    skills: [
      { name: "Digital Marketing", level: 5 },
      { name: "Content Strategy", level: 5 },
      { name: "Social Media", level: 4 },
      { name: "Analytics", level: 4 },
    ],
    specializations: [
      "Growth Marketing",
      "Brand Strategy",
      "Social Media Management",
      "Marketing Analytics",
    ],
    imageUrl: "/agents/marketing-agent.svg",
    pricing: {
      hourly: 95,
      monthly: 14000,
    },
  },
  {
    id: "legal-counsel",
    title: "Legal Counsel",
    type: "Legal",
    description:
      "Business and startup law specialist with focus on compliance and contracts",
    experience: "10 years experience",
    availability: "Available",
    rating: 4.7,
    skills: [
      { name: "Contract Law", level: 5 },
      { name: "Business Law", level: 5 },
      { name: "IP Law", level: 4 },
      { name: "Compliance", level: 5 },
    ],
    specializations: [
      "Contract Drafting & Review",
      "Intellectual Property",
      "Corporate Law",
      "Regulatory Compliance",
    ],
    imageUrl: "/agents/legal-agent.svg",
    pricing: {
      hourly: 150,
      monthly: 20000,
    },
  },
];
