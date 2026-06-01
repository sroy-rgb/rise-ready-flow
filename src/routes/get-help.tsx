import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/get-help")({
  head: () => ({
    meta: [
      { title: "Get Help — Community Economic Defense Project" },
      { name: "description", content: "Free legal defense and financial assistance for Colorado families facing eviction, foreclosure, towing, debt, or disaster." },
    ],
  }),
  component: GetHelp,
});

function GetHelp() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hash, setHash] = useState("");
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("resize", check);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);
  if (!mounted) return null;
  return (
    <iframe
      src={`${isMobile ? "/cedp-gethelp-mobile.html" : "/cedp-gethelp.html"}${hash}`}
      title="Get Help"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}