import { jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
function Careers() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return /* @__PURE__ */ jsx("iframe", { src: `/cedp-careers.html${hash}`, title: "Careers — CEDP", style: {
    border: 0,
    width: "100vw",
    height: "100vh",
    display: "block"
  } });
}
export {
  Careers as component
};
