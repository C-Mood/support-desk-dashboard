export const seedTickets = [
  {
    id: crypto.randomUUID(),
    title: "Login issue on mobile",
    description: "User reports getting logged out when switching apps.",
    status: "open",
    priority: "high",
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: crypto.randomUUID(),
    title: "Billing question",
    description: "Customer wants a copy of last month's invoice.",
    status: "pending",
    priority: "medium",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: crypto.randomUUID(),
    title: "Feature request: Dark mode",
    description: "Multiple users asked for a dark theme toggle.",
    status: "resolved",
    priority: "low",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
];
