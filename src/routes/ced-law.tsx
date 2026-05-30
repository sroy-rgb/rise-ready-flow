import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ced-law")({
  head: () => ({
    meta: [
      { title: "CED Law — Free Legal Defense for Coloradans" },
      { name: "description", content: "CED Law is CEDP's nonprofit law firm providing free legal representation for eviction, foreclosure, towing, and debt collection." },
      { property: "og:title", content: "CED Law — Free Legal Defense for Coloradans" },
      { property: "og:description", content: "Free legal representation for Coloradans facing economic abuse." },
    ],
  }),
  component: CedLaw,
});

function CedLaw() {
  return (
    <iframe
      src="/cedp-ced-law.html"
      title="CED Law — CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}