import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-BP2HGQtw.js";
import "@supabase/supabase-js";
const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  color: "#444",
  marginBottom: 4,
  display: "block"
};
const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #d0d0d0",
  borderRadius: 4,
  fontSize: 13,
  fontFamily: "inherit"
};
const taStyle = {
  ...inputStyle,
  minHeight: 70,
  resize: "vertical"
};
const sectionStyle = {
  background: "#fff",
  border: "1px solid #e5e5e5",
  borderRadius: 8,
  padding: 20,
  marginBottom: 16
};
const h2Style = {
  fontSize: 18,
  margin: "0 0 14px",
  paddingBottom: 8,
  borderBottom: "1px solid #eee"
};
const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginBottom: 12
};
function BiField({
  label,
  value,
  onChange,
  area = false,
  hint
}) {
  const v = value || {
    en: "",
    es: ""
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    marginBottom: 12
  }, children: [
    /* @__PURE__ */ jsxs("label", { style: labelStyle, children: [
      label,
      hint && /* @__PURE__ */ jsx("span", { style: {
        fontWeight: 400,
        color: "#888",
        marginLeft: 6
      }, children: hint })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: rowStyle, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: 10,
          color: "#999",
          marginBottom: 3,
          textTransform: "uppercase",
          letterSpacing: 1
        }, children: "English" }),
        area ? /* @__PURE__ */ jsx("textarea", { style: taStyle, value: v.en, onChange: (e) => onChange({
          ...v,
          en: e.target.value
        }) }) : /* @__PURE__ */ jsx("input", { style: inputStyle, value: v.en, onChange: (e) => onChange({
          ...v,
          en: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: 10,
          color: "#999",
          marginBottom: 3,
          textTransform: "uppercase",
          letterSpacing: 1
        }, children: "Español" }),
        area ? /* @__PURE__ */ jsx("textarea", { style: taStyle, value: v.es, onChange: (e) => onChange({
          ...v,
          es: e.target.value
        }) }) : /* @__PURE__ */ jsx("input", { style: inputStyle, value: v.es, onChange: (e) => onChange({
          ...v,
          es: e.target.value
        }) })
      ] })
    ] })
  ] });
}
function TextField({
  label,
  value,
  onChange,
  hint
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    marginBottom: 12
  }, children: [
    /* @__PURE__ */ jsxs("label", { style: labelStyle, children: [
      label,
      hint && /* @__PURE__ */ jsx("span", { style: {
        fontWeight: 400,
        color: "#888",
        marginLeft: 6
      }, children: hint })
    ] }),
    /* @__PURE__ */ jsx("input", { style: inputStyle, value: value || "", onChange: (e) => onChange(e.target.value) })
  ] });
}
function GetHelpAdmin() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    supabase.from("page_content").select("content").eq("page", "get-help").maybeSingle().then(({
      data,
      error
    }) => {
      if (error) {
        setMsg("Load error: " + error.message);
        return;
      }
      setContent(data?.content || {});
    });
  }, []);
  function update(path, value) {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      let o = next;
      for (let i = 0; i < path.length - 1; i++) {
        const k = path[i];
        if (o[k] == null) o[k] = isNaN(Number(path[i + 1])) ? {} : [];
        o = o[k];
      }
      o[path[path.length - 1]] = value;
      return next;
    });
  }
  async function save() {
    if (!content) return;
    setSaving(true);
    setMsg("");
    const {
      error
    } = await supabase.from("page_content").update({
      content,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("page", "get-help");
    setSaving(false);
    setMsg(error ? "Save failed: " + error.message : "Saved ✓");
    setTimeout(() => setMsg(""), 3e3);
  }
  if (!content) return /* @__PURE__ */ jsx("div", { children: "Loading…" });
  const cards = content.cards || [];
  const safetyItems = content.safety?.items || [];
  return /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: 1100
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
      position: "sticky",
      top: 0,
      background: "#fafafa",
      padding: "12px 0",
      zIndex: 10
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { style: {
          fontSize: 24,
          margin: "0 0 4px"
        }, children: "Get Help Page" }),
        /* @__PURE__ */ jsxs("p", { style: {
          margin: 0,
          color: "#666",
          fontSize: 13
        }, children: [
          "Edit every text element shown on /get-help (desktop + mobile). Some fields have a separate ",
          /* @__PURE__ */ jsx("em", { children: "mobile" }),
          " variant — shorter copy used on phones."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }, children: [
        msg && /* @__PURE__ */ jsx("span", { style: {
          fontSize: 13,
          color: msg.startsWith("Save") || msg.startsWith("Load") ? "#c62828" : "#2e7d32"
        }, children: msg }),
        /* @__PURE__ */ jsx("button", { onClick: save, disabled: saving, style: {
          padding: "10px 20px",
          background: "#c9a84c",
          color: "#000",
          border: 0,
          borderRadius: 4,
          fontWeight: 600,
          cursor: "pointer"
        }, children: saving ? "Saving…" : "Save changes" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Contact" }),
      /* @__PURE__ */ jsxs("div", { style: rowStyle, children: [
        /* @__PURE__ */ jsx(TextField, { label: "Phone (display)", value: content.contact?.phone_display, onChange: (v) => update(["contact", "phone_display"], v), hint: "(303) 838-1200" }),
        /* @__PURE__ */ jsx(TextField, { label: "Phone (dialed digits)", value: content.contact?.phone_tel, onChange: (v) => update(["contact", "phone_tel"], v), hint: "3038381200" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Top bar (desktop)" }),
      /* @__PURE__ */ jsx(BiField, { label: "Need-help prompt", value: content.topbar?.need_help, onChange: (v) => update(["topbar", "need_help"], v) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Hero" }),
      /* @__PURE__ */ jsx(BiField, { label: "Label (small caps)", value: content.hero?.label, onChange: (v) => update(["hero", "label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Title (H1)", value: content.hero?.title, onChange: (v) => update(["hero", "title"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Subtitle", value: content.hero?.subtitle, onChange: (v) => update(["hero", "subtitle"], v), area: true }),
      /* @__PURE__ */ jsx(BiField, { label: "Hours label", value: content.hero?.hours_label, onChange: (v) => update(["hero", "hours_label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Hours text", value: content.hero?.hours_text, onChange: (v) => update(["hero", "hours_text"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "After-hours link (desktop)", value: content.hero?.after_hours_label, onChange: (v) => update(["hero", "after_hours_label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "After-hours link (mobile)", value: content.hero?.after_hours_short, onChange: (v) => update(["hero", "after_hours_short"], v) }),
      /* @__PURE__ */ jsx(TextField, { label: "After-hours link URL", value: content.hero?.after_hours_href, onChange: (v) => update(["hero", "after_hours_href"], v) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Bilingual prompt (mobile strip)" }),
      /* @__PURE__ */ jsx(TextField, { label: "Prompt text", value: content.bilingual?.mobile_to_es?.text, onChange: (v) => update(["bilingual", "mobile_to_es", "text"], v), hint: "Shown when current language is English" }),
      /* @__PURE__ */ jsx(TextField, { label: "Link text", value: content.bilingual?.mobile_to_es?.link, onChange: (v) => update(["bilingual", "mobile_to_es", "link"], v) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Fraud warning banner" }),
      /* @__PURE__ */ jsx(BiField, { label: "Label (bold prefix, desktop)", value: content.fraud?.label, onChange: (v) => update(["fraud", "label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Body (desktop)", value: content.fraud?.body, onChange: (v) => update(["fraud", "body"], v), area: true }),
      /* @__PURE__ */ jsx(BiField, { label: "Body (mobile)", value: content.fraud?.mobile_body, onChange: (v) => update(["fraud", "mobile_body"], v), area: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Triage section headings" }),
      /* @__PURE__ */ jsx(BiField, { label: "Label (desktop)", value: content.triage?.label, onChange: (v) => update(["triage", "label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Label (mobile)", value: content.triage?.mobile_label, onChange: (v) => update(["triage", "mobile_label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Title (desktop)", value: content.triage?.title, onChange: (v) => update(["triage", "title"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Title (mobile)", value: content.triage?.mobile_title, onChange: (v) => update(["triage", "mobile_title"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Subtitle (desktop only)", value: content.triage?.subtitle, onChange: (v) => update(["triage", "subtitle"], v), area: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Triage cards (in order shown on page)" }),
      /* @__PURE__ */ jsx("p", { style: {
        fontSize: 12,
        color: "#666",
        marginTop: -8,
        marginBottom: 16
      }, children: "The 6th card differs between desktop (homeowner info) and mobile (other resources) — fill both variants." }),
      cards.map((card, i) => /* @__PURE__ */ jsxs("div", { style: {
        border: "1px solid #eee",
        borderRadius: 6,
        padding: 14,
        marginBottom: 12,
        background: "#fcfcfc"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#c9a84c",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 10
        }, children: [
          "Card ",
          i + 1,
          " — id: ",
          card.id || "(unset)"
        ] }),
        /* @__PURE__ */ jsx(BiField, { label: "Title (desktop)", value: card.title, onChange: (v) => update(["cards", String(i), "title"], v) }),
        /* @__PURE__ */ jsx(BiField, { label: "Title (mobile, shorter)", value: card.title_mobile, onChange: (v) => update(["cards", String(i), "title_mobile"], v) }),
        /* @__PURE__ */ jsx(BiField, { label: "Body (desktop)", value: card.body, onChange: (v) => update(["cards", String(i), "body"], v), area: true }),
        (i === 5 || card.body_mobile) && /* @__PURE__ */ jsx(BiField, { label: "Body (mobile, optional override)", value: card.body_mobile, onChange: (v) => update(["cards", String(i), "body_mobile"], v), area: true }),
        /* @__PURE__ */ jsxs("div", { style: rowStyle, children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BiField, { label: "Primary button label", value: card.cta_primary_label, onChange: (v) => update(["cards", String(i), "cta_primary_label"], v) }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextField, { label: "Primary button URL", value: card.cta_primary_href, onChange: (v) => update(["cards", String(i), "cta_primary_href"], v), hint: "Use tel:... for phone" }) })
        ] }),
        (i === 5 || card.cta_primary_label_mobile) && /* @__PURE__ */ jsx(BiField, { label: "Primary button label (mobile override)", value: card.cta_primary_label_mobile, onChange: (v) => update(["cards", String(i), "cta_primary_label_mobile"], v) }),
        /* @__PURE__ */ jsxs("div", { style: rowStyle, children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BiField, { label: "Alt button label (optional)", value: card.cta_alt_label, onChange: (v) => update(["cards", String(i), "cta_alt_label"], v) }) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TextField, { label: "Alt button URL", value: card.cta_alt_href, onChange: (v) => update(["cards", String(i), "cta_alt_href"], v) }) })
        ] }),
        (i === 5 || card.cta_alt_label_mobile) && /* @__PURE__ */ jsx(BiField, { label: "Alt button label (mobile override)", value: card.cta_alt_label_mobile, onChange: (v) => update(["cards", String(i), "cta_alt_label_mobile"], v) })
      ] }, card.id || i))
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Chat card" }),
      /* @__PURE__ */ jsx(BiField, { label: "Title (desktop)", value: content.chat?.title, onChange: (v) => update(["chat", "title"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Title (mobile)", value: content.chat?.title_mobile, onChange: (v) => update(["chat", "title_mobile"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Subtitle (desktop)", value: content.chat?.subtitle, onChange: (v) => update(["chat", "subtitle"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Subtitle (mobile)", value: content.chat?.subtitle_mobile, onChange: (v) => update(["chat", "subtitle_mobile"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Status (desktop)", value: content.chat?.status, onChange: (v) => update(["chat", "status"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Status (mobile)", value: content.chat?.status_mobile, onChange: (v) => update(["chat", "status_mobile"], v) }),
      /* @__PURE__ */ jsx(TextField, { label: "Chat URL", value: content.chat?.href, onChange: (v) => update(["chat", "href"], v) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Business hours panel" }),
      /* @__PURE__ */ jsx(BiField, { label: "Open-now title", value: content.hours?.during_title, onChange: (v) => update(["hours", "during_title"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Open-now body (desktop)", value: content.hours?.during_body, onChange: (v) => update(["hours", "during_body"], v), area: true }),
      /* @__PURE__ */ jsx(BiField, { label: "Open-now body (mobile)", value: content.hours?.during_body_mobile, onChange: (v) => update(["hours", "during_body_mobile"], v), area: true }),
      /* @__PURE__ */ jsx(BiField, { label: "Open-now hours line", value: content.hours?.during_hours, onChange: (v) => update(["hours", "during_hours"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "After-hours title", value: content.hours?.after_title, onChange: (v) => update(["hours", "after_title"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "After-hours body (desktop)", value: content.hours?.after_body, onChange: (v) => update(["hours", "after_body"], v), area: true }),
      /* @__PURE__ */ jsx(BiField, { label: "After-hours body (mobile)", value: content.hours?.after_body_mobile, onChange: (v) => update(["hours", "after_body_mobile"], v), area: true }),
      /* @__PURE__ */ jsx(BiField, { label: "After-hours CTA (desktop)", value: content.hours?.after_cta, onChange: (v) => update(["hours", "after_cta"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "After-hours CTA (mobile)", value: content.hours?.after_cta_mobile, onChange: (v) => update(["hours", "after_cta_mobile"], v) }),
      /* @__PURE__ */ jsx(TextField, { label: "After-hours CTA URL", value: content.hours?.after_cta_href, onChange: (v) => update(["hours", "after_cta_href"], v) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: '"CEDP will never..." safety section' }),
      /* @__PURE__ */ jsx(BiField, { label: "Label", value: content.safety?.label, onChange: (v) => update(["safety", "label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Title", value: content.safety?.title, onChange: (v) => update(["safety", "title"], v) }),
      safetyItems.map((item, i) => /* @__PURE__ */ jsxs("div", { style: {
        border: "1px solid #eee",
        borderRadius: 6,
        padding: 12,
        marginTop: 10,
        background: "#fcfcfc"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#c9a84c",
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: 1
        }, children: [
          "Item ",
          i + 1
        ] }),
        /* @__PURE__ */ jsx(BiField, { label: "Title (desktop)", value: item.title, onChange: (v) => update(["safety", "items", String(i), "title"], v) }),
        (item.title_mobile || i === 2) && /* @__PURE__ */ jsx(BiField, { label: "Title (mobile, optional)", value: item.title_mobile, onChange: (v) => update(["safety", "items", String(i), "title_mobile"], v) }),
        /* @__PURE__ */ jsx(BiField, { label: "Body (desktop)", value: item.body, onChange: (v) => update(["safety", "items", String(i), "body"], v), area: true }),
        /* @__PURE__ */ jsx(BiField, { label: "Body (mobile, shorter)", value: item.body_mobile, onChange: (v) => update(["safety", "items", String(i), "body_mobile"], v), area: true })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Footer" }),
      /* @__PURE__ */ jsx(BiField, { label: "Phone caption (under big phone number on mobile)", value: content.footer?.phone_caption, onChange: (v) => update(["footer", "phone_caption"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Copyright", value: content.footer?.copyright, onChange: (v) => update(["footer", "copyright"], v) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
      /* @__PURE__ */ jsx("h2", { style: h2Style, children: "Mobile bottom call bar" }),
      /* @__PURE__ */ jsx(BiField, { label: "Call button label", value: content.bottom_call?.call_label, onChange: (v) => update(["bottom_call", "call_label"], v) }),
      /* @__PURE__ */ jsx(BiField, { label: "Chat button label", value: content.bottom_call?.chat_label, onChange: (v) => update(["bottom_call", "chat_label"], v) })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 24
    }, children: /* @__PURE__ */ jsx("button", { onClick: save, disabled: saving, style: {
      padding: "12px 28px",
      background: "#c9a84c",
      color: "#000",
      border: 0,
      borderRadius: 4,
      fontWeight: 700,
      cursor: "pointer"
    }, children: saving ? "Saving…" : "Save changes" }) })
  ] });
}
export {
  GetHelpAdmin as component
};
