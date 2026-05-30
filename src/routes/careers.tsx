import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Community Economic Defense Project" },
      { name: "description", content: "Join a team of 200+ defending Colorado families through housing law, advocacy, policy, data, and community organizing." },
    ],
  }),
  component: Careers,
});

function Careers() {
  return (
    <iframe
      src="/cedp-careers.html"
      title="Careers — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}