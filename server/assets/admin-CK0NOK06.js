import { jsx, jsxs } from "react/jsx-runtime";
import { useRouter, Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-BP2HGQtw.js";
import "@supabase/supabase-js";
function AdminLayout() {
  const [status, setStatus] = useState("loading");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function check() {
    const {
      data: {
        user
      }
    } = await supabase.auth.getUser();
    if (!user) {
      setStatus("signed-out");
      return;
    }
    const {
      data: roles
    } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    setStatus(roles ? "ok" : "not-admin");
  }
  useEffect(() => {
    check();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(() => {
      check();
    });
    return () => subscription.unsubscribe();
  }, []);
  async function handleSignIn(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password: pw
    });
    setBusy(false);
    if (error) setErr(error.message);
    else {
      setPw("");
    }
  }
  async function handleSignOut() {
    await supabase.auth.signOut();
    router.invalidate();
  }
  if (status === "loading") {
    return /* @__PURE__ */ jsx("div", { style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: "system-ui"
    }, children: "Loading…" });
  }
  if (status === "signed-out") {
    return /* @__PURE__ */ jsx("div", { style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: "system-ui"
    }, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSignIn, style: {
      background: "#1a1a1a",
      padding: 32,
      borderRadius: 8,
      width: 360,
      border: "1px solid #333"
    }, children: [
      /* @__PURE__ */ jsx("h1", { style: {
        margin: "0 0 16px",
        fontSize: 20
      }, children: "CEDP Admin" }),
      /* @__PURE__ */ jsx("p", { style: {
        fontSize: 13,
        opacity: 0.7,
        margin: "0 0 16px"
      }, children: "Sign in with your admin account." }),
      /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), autoFocus: true, required: true, style: {
        width: "100%",
        padding: 10,
        background: "#0a0a0a",
        border: "1px solid #444",
        color: "#fff",
        borderRadius: 4,
        marginBottom: 10
      } }),
      /* @__PURE__ */ jsx("input", { type: "password", placeholder: "Password", value: pw, onChange: (e) => setPw(e.target.value), required: true, style: {
        width: "100%",
        padding: 10,
        background: "#0a0a0a",
        border: "1px solid #444",
        color: "#fff",
        borderRadius: 4,
        marginBottom: 12
      } }),
      err && /* @__PURE__ */ jsx("div", { style: {
        color: "#ff6b6b",
        fontSize: 12,
        marginBottom: 8
      }, children: err }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: busy, style: {
        width: "100%",
        padding: 10,
        background: "#c9a84c",
        color: "#000",
        border: 0,
        borderRadius: 4,
        fontWeight: 600,
        cursor: busy ? "wait" : "pointer"
      }, children: busy ? "Signing in…" : "Sign in" })
    ] }) });
  }
  if (status === "not-admin") {
    return /* @__PURE__ */ jsxs("div", { style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: "system-ui",
      gap: 16
    }, children: [
      /* @__PURE__ */ jsx("h1", { style: {
        fontSize: 20,
        margin: 0
      }, children: "Access denied" }),
      /* @__PURE__ */ jsxs("p", { style: {
        fontSize: 13,
        opacity: 0.7,
        margin: 0,
        maxWidth: 360,
        textAlign: "center"
      }, children: [
        "This account is not an admin. Ask an existing admin to grant you the ",
        /* @__PURE__ */ jsx("code", { children: "admin" }),
        " role in ",
        /* @__PURE__ */ jsx("code", { children: "user_roles" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: handleSignOut, style: {
        background: "transparent",
        border: "1px solid #444",
        color: "#fff",
        padding: "6px 14px",
        borderRadius: 4,
        cursor: "pointer"
      }, children: "Sign out" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { style: {
    minHeight: "100vh",
    background: "#fafafa",
    color: "#111",
    fontFamily: "system-ui"
  }, children: [
    /* @__PURE__ */ jsxs("header", { style: {
      background: "#0a0a0a",
      color: "#fff",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      gap: 24
    }, children: [
      /* @__PURE__ */ jsx("strong", { style: {
        fontSize: 16
      }, children: "CEDP CMS" }),
      /* @__PURE__ */ jsxs("nav", { style: {
        display: "flex",
        gap: 16,
        fontSize: 14
      }, children: [
        /* @__PURE__ */ jsx(Link, { to: "/admin", style: {
          color: "#fff",
          textDecoration: "none"
        }, activeOptions: {
          exact: true
        }, activeProps: {
          style: {
            color: "#c9a84c",
            textDecoration: "none"
          }
        }, children: "Dashboard" }),
        /* @__PURE__ */ jsx(Link, { to: "/admin/team", style: {
          color: "#fff",
          textDecoration: "none"
        }, activeProps: {
          style: {
            color: "#c9a84c",
            textDecoration: "none"
          }
        }, children: "Team" }),
        /* @__PURE__ */ jsx(Link, { to: "/admin/jobs", style: {
          color: "#fff",
          textDecoration: "none"
        }, activeProps: {
          style: {
            color: "#c9a84c",
            textDecoration: "none"
          }
        }, children: "Jobs" }),
        /* @__PURE__ */ jsx(Link, { to: "/admin/legislation", style: {
          color: "#fff",
          textDecoration: "none"
        }, activeProps: {
          style: {
            color: "#c9a84c",
            textDecoration: "none"
          }
        }, children: "Legislation" }),
        /* @__PURE__ */ jsx(Link, { to: "/admin/get-help", style: {
          color: "#fff",
          textDecoration: "none"
        }, activeProps: {
          style: {
            color: "#c9a84c",
            textDecoration: "none"
          }
        }, children: "Get Help" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        marginLeft: "auto",
        display: "flex",
        gap: 12,
        fontSize: 13
      }, children: [
        /* @__PURE__ */ jsx("a", { href: "/", style: {
          color: "#aaa"
        }, children: "View site →" }),
        /* @__PURE__ */ jsx("button", { onClick: handleSignOut, style: {
          background: "transparent",
          border: "1px solid #444",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 4,
          cursor: "pointer"
        }, children: "Log out" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "32px 24px"
    }, children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
export {
  AdminLayout as component
};
