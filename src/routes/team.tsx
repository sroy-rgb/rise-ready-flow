import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Community Economic Defense Project" },
      { name: "description", content: "200 people. 4 offices. 1 mission. Meet the team defending Coloradans from economic abuse." },
      { property: "og:title", content: "Our Team — CEDP" },
      { property: "og:description", content: "Meet the team defending Coloradans from economic abuse." },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <iframe
      src="/cedp-team.html"
      title="Our Team — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}