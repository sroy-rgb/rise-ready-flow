import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Community Economic Defense Project — Defending Colorado families" },
      { name: "description", content: "CEDP partners with low-income and working people to confront economic abuse with legal, financial, and advocacy tools. 68,000+ Coloradans served." },
      { property: "og:title", content: "Community Economic Defense Project" },
      { property: "og:description", content: "A financial emergency room — eviction defense, foreclosure, towing, debt, and disaster relief for Colorado families." },
      { property: "og:image", content: "https://i0.wp.com/cedproject.org/wp-content/uploads/2022/12/cedp_bill_signing-scaled.jpeg?resize=1080%2C810&quality=100&ssl=1" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/cedp-home.html"
      title="CEDP Homepage"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
