import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Community Economic Defense Project" },
      { name: "description", content: "CEDP research on housing instability, economic abuse, and the link between medical debt and eviction." },
      { property: "og:title", content: "Research — CEDP" },
      { property: "og:description", content: "Data-driven defense — research that becomes law." },
    ],
  }),
  component: Research,
});

function Research() {
  return (
    <iframe
      src="/cedp-research.html"
      title="Research — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}