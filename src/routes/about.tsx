import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Community Economic Defense Project" },
      { name: "description", content: "Born from a Facebook post in April 2020, CEDP has grown into a team of 200 serving 68,000 Coloradans across 59 counties." },
      { property: "og:title", content: "About CEDP — Born from a Facebook post" },
      { property: "og:description", content: "Co-founders Zach Neumann and Sam Gilman built a financial emergency room for Colorado families in crisis." },
      { property: "og:image", content: "https://i0.wp.com/cedproject.org/wp-content/uploads/2022/12/cedp_bill_signing-scaled.jpeg?resize=1080%2C810&quality=100&ssl=1" },
    ],
  }),
  component: About,
});

function About() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return (
    <iframe
      src={`/cedp-about.html${hash}`}
      title="About CEDP"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}