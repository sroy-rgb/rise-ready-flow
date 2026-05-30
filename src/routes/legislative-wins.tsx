import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legislative-wins")({
  head: () => ({
    meta: [
      { title: "Legislative Wins — Community Economic Defense Project" },
      { name: "description", content: "From case to cause: how individual CEDP cases became Colorado law — towing reform, renters' rights, and the right to a jury trial." },
      { property: "og:title", content: "Legislative Wins — CEDP" },
      { property: "og:description", content: "Every law on this page started with one person's story." },
    ],
  }),
  component: LegislativeWins,
});

function LegislativeWins() {
  return (
    <iframe
      src="/cedp-legislative-wins.html"
      title="Legislative Wins — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}