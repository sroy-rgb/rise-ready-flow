import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function Dashboard() {
  const cards = [{
    to: "/admin/team",
    label: "Team Members",
    desc: "Add, edit, or remove team members shown on /team and CED Law."
  }, {
    to: "/admin/jobs",
    label: "Job Listings",
    desc: "Manage open positions shown on /careers."
  }, {
    to: "/admin/legislation",
    label: "Legislative Wins",
    desc: "Manage bills shown on /legislative-wins."
  }, {
    to: "/admin/get-help",
    label: "Get Help Page",
    desc: "Edit every text element on /get-help (desktop + mobile) in English and Spanish."
  }];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { style: {
      fontSize: 28,
      margin: "0 0 8px"
    }, children: "Content Management" }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "#666",
      margin: "0 0 24px"
    }, children: "Prototype CMS. Changes save instantly to Lovable Cloud and appear on the public site on next page load." }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
      gap: 16
    }, children: cards.map((c) => /* @__PURE__ */ jsxs(Link, { to: c.to, style: {
      background: "#fff",
      border: "1px solid #e5e5e5",
      padding: 20,
      borderRadius: 8,
      textDecoration: "none",
      color: "#111"
    }, children: [
      /* @__PURE__ */ jsx("h3", { style: {
        margin: "0 0 6px",
        fontSize: 16
      }, children: c.label }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: 0,
        fontSize: 13,
        color: "#666"
      }, children: c.desc })
    ] }, c.to)) })
  ] });
}
export {
  Dashboard as component
};
