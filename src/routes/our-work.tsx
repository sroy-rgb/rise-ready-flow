import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return (
    <iframe
      src={`/cedp-our-work.html${hash}`}
      title="Our Work — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}