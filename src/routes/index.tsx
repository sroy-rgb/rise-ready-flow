import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <iframe
        src="/cedp-home.html"
        title="CEDP Homepage"
        style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
      />
      <AccessOverlay />
    </div>
  );
}

function AccessOverlay() {
  const gold = "#E8B960";
  const options = [
    {
      label: "Access Live Prototype",
      href: "https://rise-ready-flow.lovable.app",
      Icon: Laptop,
    },
    {
      label: "Access PDF Proposal",
      href: "file:///C:/Users/2000018/AppData/Local/Microsoft/Windows/INetCache/Content.Outlook/4OLR5RS5/CEDP-Website_Redesign_Proposal-XTS_30May26_V1.html",
      Icon: FileText,
    },
    {
      label: "Access Interactive Proposal",
      href: "file:///C:/Users/2000018/AppData/Local/Microsoft/Windows/INetCache/Content.Outlook/4OLR5RS5/cedp-ourwork_2.html",
      Icon: PlayCircle,
    },
  ];
  return (
    <>
      <style>{`
        .access-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(27,40,56,.55);backdrop-filter:blur(6px);z-index:9998;pointer-events:auto}
        .access-card{display:flex;flex-direction:column;gap:18px;padding:40px 44px;border-radius:20px;background:rgba(27,40,56,.78);border:1px solid rgba(232,185,96,.35);box-shadow:0 20px 60px rgba(0,0,0,.45)}
        
        .access-btn{display:flex;align-items:center;gap:14px;padding:14px 22px;min-width:340px;border-radius:999px;border:1.5px solid #E8B960;background:transparent;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:transform .25s ease, box-shadow .25s ease, background .25s ease}
        .access-btn:hover{transform:translateY(-2px) scale(1.02);background:rgba(232,185,96,.12);box-shadow:0 0 24px rgba(232,185,96,.45)}
        .access-btn svg{flex-shrink:0}
      `}</style>
      <div className="access-overlay" role="dialog" aria-label="Access options">
        <div className="access-card">
          <h2 className="access-title">CEDP Redesign Access</h2>
          {options.map(({ label, href, Icon }) => (
            <a
              key={label}
              className="access-btn"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={22} color={gold} strokeWidth={2} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
