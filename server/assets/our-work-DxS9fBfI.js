import { jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
function OurWork() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return /* @__PURE__ */ jsx("iframe", { src: `/cedp-our-work.html${hash}`, title: "Our Work — CEDP", style: {
    border: 0,
    width: "100vw",
    height: "100vh",
    display: "block"
  } });
}
export {
  OurWork as component
};
