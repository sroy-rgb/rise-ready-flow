import { jsx } from "react/jsx-runtime";
function News() {
  return /* @__PURE__ */ jsx("iframe", { src: "/cedp-news.html", title: "News & Press — CEDP", style: {
    border: 0,
    width: "100vw",
    height: "100vh",
    display: "block"
  } });
}
export {
  News as component
};
