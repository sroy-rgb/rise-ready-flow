import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Community Economic Defense Project" },
      { name: "description", content: "Press, media coverage, events, and the latest from the Community Economic Defense Project." },
    ],
  }),
  component: News,
});

function News() {
  return (
    <iframe
      src="/cedp-news.html"
      title="News & Press — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}