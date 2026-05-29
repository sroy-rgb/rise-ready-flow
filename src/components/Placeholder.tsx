import { Link } from "@tanstack/react-router";

type NavItem = { label: string; to: string };

const NAV: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Our Work", to: "/our-work" },
  { label: "Impact", to: "/impact" },
  { label: "News", to: "/news" },
  { label: "Careers", to: "/careers" },
];

export function Placeholder({ title, currentPath }: { title: string; currentPath: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Libre Franklin', system-ui, sans-serif",
        background: "#FAF9F6",
        color: "#1B2838",
      }}
    >
      <div
        style={{
          background: "#1B2838",
          color: "#fff",
          fontSize: 12,
          padding: "8px 32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          ☎ Need help now? <a href="tel:3038381200" style={{ color: "#E8B960" }}>(303) 838-1200</a>
        </span>
        <span>English · Español</span>
      </div>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#fff",
          borderBottom: "1px solid #eee",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <Link to="/" style={{ marginRight: "auto" }}>
          <img
            src="https://cedproject.org/wp-content/uploads/2022/10/CEDP_2022Logo_Horizontal_RGBWeb-01-e1670360921367.png"
            alt="CEDP"
            style={{ height: 38 }}
          />
        </Link>
        {NAV.map((n) => {
          const active = n.to === currentPath;
          return (
            <Link
              key={n.to}
              to={n.to}
              style={{
                fontSize: 14,
                textDecoration: "none",
                color: active ? "#C53030" : "#1B2838",
                borderBottom: active ? "2px solid #C53030" : "2px solid transparent",
                paddingBottom: 2,
                fontWeight: 600,
              }}
            >
              {n.label}
            </Link>
          );
        })}
        <a
          href="/#donateSection"
          style={{
            background: "#1B2838",
            color: "#fff",
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: 1,
          }}
        >
          DONATE
        </a>
        <Link
          to="/get-help"
          style={{
            background: "#C53030",
            color: "#fff",
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: 1,
          }}
        >
          GET HELP
        </Link>
      </nav>
      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "120px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            color: "#C53030",
            marginBottom: 16,
          }}
        >
          Coming soon
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, margin: "0 0 16px" }}>
          {title}
        </h1>
        <p style={{ color: "#5A6B7A", fontSize: 17, lineHeight: 1.6 }}>
          This page is being built. Check back soon, or explore the rest of the site in the
          meantime.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            to="/"
            style={{
              padding: "12px 24px",
              border: "1.5px solid #1B2838",
              color: "#1B2838",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ← Back to home
          </Link>
          <Link
            to="/get-help"
            style={{
              padding: "12px 24px",
              background: "#C53030",
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Get help now
          </Link>
        </div>
      </main>
    </div>
  );
}