import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Community Economic Defense Project" },
      { name: "description", content: "Upcoming and past events from the Community Economic Defense Project, including office closures and community gatherings." },
      { property: "og:title", content: "Events — CEDP" },
      { property: "og:description", content: "Upcoming events, calendar, and past events from CEDP." },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <iframe
      src="/cedp-events.html"
      title="Events — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}