import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const NAV = [
  { label: "About", to: "/about" },
  { label: "Our Work", to: "/our-work" },
  { label: "Impact", to: "/impact" },
  { label: "News", to: "/news" },
  { label: "Careers", to: "/careers" }
];
function Placeholder({ title, currentPath }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        fontFamily: "'Libre Franklin', system-ui, sans-serif",
        background: "#FAF9F6",
        color: "#1B2838"
      },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: "#1B2838",
              color: "#fff",
              fontSize: 12,
              padding: "8px 32px",
              display: "flex",
              justifyContent: "space-between"
            },
            children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "☎ Need help now? ",
                /* @__PURE__ */ jsx("a", { href: "tel:3038381200", style: { color: "#E8B960" }, children: "(303) 838-1200" })
              ] }),
              /* @__PURE__ */ jsx("span", { children: "English · Español" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "nav",
          {
            style: {
              position: "sticky",
              top: 0,
              zIndex: 50,
              background: "#fff",
              borderBottom: "1px solid #eee",
              padding: "16px 32px",
              display: "flex",
              alignItems: "center",
              gap: 28
            },
            children: [
              /* @__PURE__ */ jsx(Link, { to: "/", style: { marginRight: "auto" }, children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://cedproject.org/wp-content/uploads/2022/10/CEDP_2022Logo_Horizontal_RGBWeb-01-e1670360921367.png",
                  alt: "CEDP",
                  style: { height: 38 }
                }
              ) }),
              NAV.map((n) => {
                const active = n.to === currentPath;
                return /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: n.to,
                    style: {
                      fontSize: 14,
                      textDecoration: "none",
                      color: active ? "#C53030" : "#1B2838",
                      borderBottom: active ? "2px solid #C53030" : "2px solid transparent",
                      paddingBottom: 2,
                      fontWeight: 600
                    },
                    children: n.label
                  },
                  n.to
                );
              }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/#donateSection",
                  style: {
                    background: "#1B2838",
                    color: "#fff",
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: 1
                  },
                  children: "DONATE"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/get-help",
                  style: {
                    background: "#C53030",
                    color: "#fff",
                    padding: "10px 20px",
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: 1
                  },
                  children: "GET HELP"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "main",
          {
            style: {
              maxWidth: 720,
              margin: "0 auto",
              padding: "120px 32px",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    color: "#C53030",
                    marginBottom: 16
                  },
                  children: "Coming soon"
                }
              ),
              /* @__PURE__ */ jsx("h1", { style: { fontFamily: "'Playfair Display', serif", fontSize: 56, margin: "0 0 16px" }, children: title }),
              /* @__PURE__ */ jsx("p", { style: { color: "#5A6B7A", fontSize: 17, lineHeight: 1.6 }, children: "This page is being built. Check back soon, or explore the rest of the site in the meantime." }),
              /* @__PURE__ */ jsxs("div", { style: { marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }, children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/",
                    style: {
                      padding: "12px 24px",
                      border: "1.5px solid #1B2838",
                      color: "#1B2838",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 600
                    },
                    children: "← Back to home"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/get-help",
                    style: {
                      padding: "12px 24px",
                      background: "#C53030",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 600
                    },
                    children: "Get help now"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
const SplitComponent = () => /* @__PURE__ */ jsx(Placeholder, { title: "Our Impact", currentPath: "/impact" });
export {
  SplitComponent as component
};
