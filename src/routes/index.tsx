import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Laptop, FileText, PlayCircle } from "lucide-react";

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
  const [showOverlay, setShowOverlay] = useState(true);
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <iframe
        src="/cedp-home.html"
        title="CEDP Homepage"
        style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
      />
      {showOverlay && <AccessOverlay onEnterPrototype={() => setShowOverlay(false)} />}
    </div>
  );
}

function AccessOverlay({ onEnterPrototype }: { onEnterPrototype: () => void }) {
  const gold = "#E8B960";
  const options = [
    {
      label: "Access Live Prototype",
      href: "#",
      Icon: Laptop,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        onEnterPrototype();
      },
    },
    {
      label: "Access PDF Proposal",
      href: "/pdf-proposal.html",
      Icon: FileText,
    },
    {
      label: "Access Interactive Proposal",
      href: "/Interactive_Proposal.html",
      Icon: PlayCircle,
    },
  ];
  return (
    <>
      <style>{`
        .access-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;gap:24px;background:rgba(27,40,56,.55);backdrop-filter:blur(6px);z-index:9998;pointer-events:auto}
        .access-card{display:flex;flex-direction:column;align-items:center;gap:10px;width:260px;padding:22px 24px;border-radius:14px;border:1.5px solid #E8B960;background:rgba(27,40,56,.78);color:#fff;font-weight:700;font-size:16px;text-decoration:none;text-align:center;transition:transform .25s ease, box-shadow .25s ease, background .25s ease}
        .access-card:hover{transform:translateY(-4px) scale(1.02);background:rgba(232,185,96,.12);box-shadow:0 8px 32px rgba(232,185,96,.45)}
        .access-card svg{flex-shrink:0}
        @media (max-width:640px){
          .access-overlay{flex-direction:column;gap:16px;padding:16px}
          .access-card{width:100%;max-width:320px;padding:16px 20px;font-size:15px}
        }
        @media (min-width:641px) and (max-width:1024px){
          .access-overlay{flex-wrap:wrap;gap:18px;padding:20px}
          .access-card{width:240px;padding:20px 20px;font-size:15px}
        }
      `}</style>
      <div className="access-overlay" role="dialog" aria-label="Access options">
        {options.map(({ label, href, Icon, onClick }) => (
          <a
            key={label}
            className="access-card"
            href={href}
            onClick={onClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={40} color={gold} strokeWidth={1.5} />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </>
  );
}
