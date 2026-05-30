import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Community Economic Defense Project" },
      { name: "description", content: "Eviction defense, foreclosure, towing, debt collection, disaster relief, and resource navigation across Colorado." },
    ],
  }),
  component: OurWork,
});

function OurWork() {
  return (
    <iframe
      src="/cedp-our-work.html"
      title="Our Work — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}