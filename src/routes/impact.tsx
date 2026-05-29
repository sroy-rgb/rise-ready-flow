import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — Community Economic Defense Project" },
      { name: "description", content: "Legislative wins, research, and the measurable outcomes of CEDP's work across 59 Colorado counties." },
    ],
  }),
  component: () => <Placeholder title="Our Impact" currentPath="/impact" />,
});