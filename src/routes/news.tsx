import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Community Economic Defense Project" },
      { name: "description", content: "Press, media coverage, events, and the latest from the Community Economic Defense Project." },
    ],
  }),
  component: () => <Placeholder title="News & Press" currentPath="/news" />,
});