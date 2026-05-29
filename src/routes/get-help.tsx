import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/get-help")({
  head: () => ({
    meta: [
      { title: "Get Help — Community Economic Defense Project" },
      { name: "description", content: "Free legal defense and financial assistance for Colorado families facing eviction, foreclosure, towing, debt, or disaster." },
    ],
  }),
  component: () => <Placeholder title="Get Help" currentPath="/get-help" />,
});