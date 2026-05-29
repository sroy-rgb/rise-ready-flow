import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Community Economic Defense Project" },
      { name: "description", content: "Eviction defense, foreclosure, towing, debt collection, disaster relief, and resource navigation across Colorado." },
    ],
  }),
  component: () => <Placeholder title="Our Work" currentPath="/our-work" />,
});