import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Community Economic Defense Project" },
      { name: "description", content: "Join a team of 200+ defending Colorado families through housing law, advocacy, policy, data, and community organizing." },
    ],
  }),
  component: () => <Placeholder title="Join CEDP" currentPath="/careers" />,
});