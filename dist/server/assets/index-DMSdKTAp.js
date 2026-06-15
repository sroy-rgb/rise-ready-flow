import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Laptop, FileText, PlayCircle, Building2 } from "lucide-react";
const url = "/__l5e/assets-v1/2345e4e6-ecf9-49d2-9486-9992d63d7361/XTS_Corporate_Overview.pdf";
const xtsPdf = {
  url
};
function Index() {
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    try {
      const skip = sessionStorage.getItem("cedp_skip_overlay") === "1";
      if (!skip) setShowOverlay(true);
    } catch {
      setShowOverlay(true);
    }
  }, []);
  const enterPrototype = () => {
    try {
      sessionStorage.setItem("cedp_skip_overlay", "1");
    } catch {
    }
    setShowOverlay(false);
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    position: "relative",
    width: "100vw",
    height: "100vh"
  }, children: [
    /* @__PURE__ */ jsx("iframe", { src: "/cedp-home.html", title: "CEDP Homepage", style: {
      border: 0,
      width: "100vw",
      height: "100vh",
      display: "block"
    } }),
    showOverlay && /* @__PURE__ */ jsx(AccessOverlay, { onEnterPrototype: enterPrototype })
  ] });
}
function AccessOverlay({
  onEnterPrototype
}) {
  const gold = "#E8B960";
  const options = [{
    label: "Access Live Prototype",
    href: "#",
    Icon: Laptop,
    onClick: (e) => {
      e.preventDefault();
      onEnterPrototype();
    }
  }, {
    label: "Access PDF Proposal",
    href: "/pdf-proposal.html",
    Icon: FileText
  }, {
    label: "Access Interactive Proposal",
    href: "/Interactive_Proposal.html",
    Icon: PlayCircle
  }, {
    label: "XTS Corporate Overview",
    href: xtsPdf.url,
    Icon: Building2
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        .access-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(27,40,56,.55);backdrop-filter:blur(6px);z-index:9998;pointer-events:auto;padding:24px}
        .access-grid{display:grid;grid-template-columns:repeat(2,260px);grid-template-rows:repeat(2,140px);gap:24px}
        .access-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:100%;height:100%;padding:18px 24px;border-radius:0;border:1.5px solid #E8B960;background:rgba(27,40,56,.78);color:#fff;font-weight:700;font-size:16px;text-decoration:none;text-align:center;transition:transform .25s ease, box-shadow .25s ease, background .25s ease}
        .access-card span{display:block;line-height:1.25}
        .access-card:hover{transform:translateY(-4px) scale(1.02);background:rgba(232,185,96,.12);box-shadow:0 8px 32px rgba(232,185,96,.45)}
        .access-card svg{flex-shrink:0}
        @media (max-width:640px){
          .access-overlay{padding:16px;overflow:auto}
          .access-grid{grid-template-columns:1fr;grid-template-rows:repeat(4,auto);gap:14px;width:100%;max-width:340px}
          .access-card{height:110px;padding:13px 20px;font-size:15px}
        }
        @media (min-width:641px) and (max-width:1024px){
          .access-overlay{padding:20px}
          .access-grid{grid-template-columns:repeat(2,minmax(220px,240px));grid-template-rows:repeat(2,130px);gap:18px}
          .access-card{padding:16px 20px;font-size:15px}
        }
      ` }),
    /* @__PURE__ */ jsx("div", { className: "access-overlay", role: "dialog", "aria-label": "Access options", children: /* @__PURE__ */ jsx("div", { className: "access-grid", children: options.map(({
      label,
      href,
      Icon,
      onClick
    }) => onClick ? /* @__PURE__ */ jsxs("button", { type: "button", className: "access-card", onClick, style: {
      cursor: "pointer",
      font: "inherit"
    }, children: [
      /* @__PURE__ */ jsx(Icon, { size: 32, color: gold, strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("span", { children: label })
    ] }, label) : /* @__PURE__ */ jsxs("a", { className: "access-card", href, target: "_blank", rel: "noopener noreferrer", children: [
      /* @__PURE__ */ jsx(Icon, { size: 32, color: gold, strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("span", { children: label })
    ] }, label)) }) })
  ] });
}
export {
  Index as component
};
