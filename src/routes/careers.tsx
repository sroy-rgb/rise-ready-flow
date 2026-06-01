import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return (
    <iframe
      src={`/cedp-careers.html${hash}`}
      title="Careers — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}