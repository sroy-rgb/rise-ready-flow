import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-BP2HGQtw.js";
function AdminTable({ table, fields, title, orderBy = "sort_order" }) {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    if (error) console.error(error);
    setRows(data || []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [table]);
  useEffect(() => {
    const channel = supabase.channel(`admin-${table}`).on("postgres_changes", { event: "*", schema: "public", table }, () => load()).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table]);
  function blank() {
    const o = {};
    fields.forEach((f) => {
      if (f.type === "checkbox") o[f.key] = false;
      else if (f.type === "number") o[f.key] = 0;
      else if (f.type === "select") o[f.key] = f.options?.[0]?.value ?? "";
      else o[f.key] = "";
    });
    return o;
  }
  async function save() {
    if (!editing) return;
    const payload = { ...editing };
    delete payload.created_at;
    delete payload.updated_at;
    if (editing.id) {
      const { error } = await supabase.from(table).update(payload).eq("id", editing.id);
      if (error) {
        alert(error.message);
        return;
      }
    } else {
      delete payload.id;
      const { error } = await supabase.from(table).insert(payload);
      if (error) {
        alert(error.message);
        return;
      }
    }
    setEditing(null);
    load();
  }
  async function remove(id) {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    load();
  }
  const tableFields = fields.filter((f) => !f.hideInTable);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", marginBottom: 16 }, children: [
      /* @__PURE__ */ jsx("h1", { style: { fontSize: 24, margin: 0, flex: 1 }, children: title }),
      /* @__PURE__ */ jsx("button", { onClick: () => setEditing(blank()), style: btnPri, children: "+ Add New" })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { children: "Loading…" }) : /* @__PURE__ */ jsx("div", { style: { background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden" }, children: /* @__PURE__ */ jsxs("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
      /* @__PURE__ */ jsx("thead", { style: { background: "#f5f5f5" }, children: /* @__PURE__ */ jsxs("tr", { children: [
        tableFields.map((f) => /* @__PURE__ */ jsx("th", { style: th, children: f.label }, f.key)),
        /* @__PURE__ */ jsx("th", { style: th, children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        rows.map((r) => /* @__PURE__ */ jsxs("tr", { style: { borderTop: "1px solid #eee" }, children: [
          tableFields.map((f) => /* @__PURE__ */ jsx("td", { style: td, children: f.type === "checkbox" ? r[f.key] ? "✓" : "" : String(r[f.key] ?? "").slice(0, 80) }, f.key)),
          /* @__PURE__ */ jsxs("td", { style: td, children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setEditing(r), style: btnSm, children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => remove(r.id), style: { ...btnSm, marginLeft: 6, color: "#c00" }, children: "Delete" })
          ] })
        ] }, r.id)),
        rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: tableFields.length + 1, style: { ...td, textAlign: "center", color: "#999", padding: 24 }, children: "No entries yet." }) })
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsx("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }, onClick: () => setEditing(null), children: /* @__PURE__ */ jsxs("div", { onClick: (e) => e.stopPropagation(), style: { background: "#fff", borderRadius: 8, padding: 24, width: "100%", maxWidth: 600, maxHeight: "90vh", overflow: "auto" }, children: [
      /* @__PURE__ */ jsxs("h2", { style: { margin: "0 0 16px", fontSize: 18 }, children: [
        editing.id ? "Edit" : "Add",
        " ",
        title
      ] }),
      fields.map((f) => /* @__PURE__ */ jsxs("div", { style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }, children: f.label }),
        f.type === "textarea" ? /* @__PURE__ */ jsx("textarea", { value: editing[f.key] ?? "", onChange: (e) => setEditing({ ...editing, [f.key]: e.target.value }), rows: 3, style: inp }) : f.type === "checkbox" ? /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !!editing[f.key], onChange: (e) => setEditing({ ...editing, [f.key]: e.target.checked }) }) : f.type === "select" ? /* @__PURE__ */ jsx("select", { value: editing[f.key] ?? "", onChange: (e) => setEditing({ ...editing, [f.key]: e.target.value }), style: inp, children: f.options?.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value)) }) : f.type === "number" ? /* @__PURE__ */ jsx("input", { type: "number", value: editing[f.key] ?? 0, onChange: (e) => setEditing({ ...editing, [f.key]: Number(e.target.value) }), style: inp }) : /* @__PURE__ */ jsx("input", { type: "text", value: editing[f.key] ?? "", onChange: (e) => setEditing({ ...editing, [f.key]: e.target.value }), style: inp })
      ] }, f.key)),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }, children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing(null), style: btnSec, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: save, style: btnPri, children: "Save" })
      ] })
    ] }) })
  ] });
}
const th = { padding: "10px 12px", textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "#666", fontWeight: 600 };
const td = { padding: "10px 12px", verticalAlign: "top" };
const inp = { width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 13, fontFamily: "inherit" };
const btnPri = { background: "#0a0a0a", color: "#fff", border: 0, padding: "8px 14px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" };
const btnSec = { background: "#fff", color: "#111", border: "1px solid #ddd", padding: "8px 14px", borderRadius: 4, fontSize: 13, cursor: "pointer" };
const btnSm = { background: "transparent", border: 0, fontSize: 12, cursor: "pointer", color: "#0066cc", padding: 0 };
export {
  AdminTable as A
};
