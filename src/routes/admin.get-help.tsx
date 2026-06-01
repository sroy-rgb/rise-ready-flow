import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/get-help")({ component: GetHelpAdmin });

type Bi = { en: string; es: string };
type CardField = {
  id: string;
  title: Bi; title_mobile?: Bi;
  body: Bi; body_mobile?: Bi;
  cta_primary_label: Bi; cta_primary_label_mobile?: Bi; cta_primary_href: string;
  cta_alt_label: Bi; cta_alt_label_mobile?: Bi; cta_alt_href: string;
};
type SafetyItem = { title: Bi; title_mobile?: Bi; body: Bi; body_mobile?: Bi };
type Content = any;

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 4, display: "block" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 10px", border: "1px solid #d0d0d0", borderRadius: 4, fontSize: 13, fontFamily: "inherit" };
const taStyle: React.CSSProperties = { ...inputStyle, minHeight: 70, resize: "vertical" };
const sectionStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, padding: 20, marginBottom: 16 };
const h2Style: React.CSSProperties = { fontSize: 18, margin: "0 0 14px", paddingBottom: 8, borderBottom: "1px solid #eee" };
const rowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 };

function BiField({ label, value, onChange, area = false, hint }:{
  label: string; value: Bi | undefined; onChange: (v: Bi) => void; area?: boolean; hint?: string;
}) {
  const v = value || { en: "", es: "" };
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}{hint && <span style={{ fontWeight: 400, color: "#888", marginLeft: 6 }}>{hint}</span>}</label>
      <div style={rowStyle}>
        <div>
          <div style={{ fontSize: 10, color: "#999", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 }}>English</div>
          {area
            ? <textarea style={taStyle} value={v.en} onChange={(e) => onChange({ ...v, en: e.target.value })} />
            : <input style={inputStyle} value={v.en} onChange={(e) => onChange({ ...v, en: e.target.value })} />}
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#999", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 }}>Español</div>
          {area
            ? <textarea style={taStyle} value={v.es} onChange={(e) => onChange({ ...v, es: e.target.value })} />
            : <input style={inputStyle} value={v.es} onChange={(e) => onChange({ ...v, es: e.target.value })} />}
        </div>
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, hint }:{ label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle}>{label}{hint && <span style={{ fontWeight: 400, color: "#888", marginLeft: 6 }}>{hint}</span>}</label>
      <input style={inputStyle} value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function GetHelpAdmin() {
  const [content, setContent] = useState<Content | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("page_content").select("content").eq("page", "get-help").maybeSingle()
      .then(({ data, error }) => {
        if (error) { setMsg("Load error: " + error.message); return; }
        setContent(data?.content || {});
      });
  }, []);

  function update(path: string[], value: any) {
    setContent((prev: any) => {
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
    setSaving(true); setMsg("");
    const { error } = await supabase.from("page_content").update({ content, updated_at: new Date().toISOString() }).eq("page", "get-help");
    setSaving(false);
    setMsg(error ? "Save failed: " + error.message : "Saved ✓");
    setTimeout(() => setMsg(""), 3000);
  }

  if (!content) return <div>Loading…</div>;

  const cards: CardField[] = content.cards || [];
  const safetyItems: SafetyItem[] = content.safety?.items || [];

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, position: "sticky", top: 0, background: "#fafafa", padding: "12px 0", zIndex: 10 }}>
        <div>
          <h1 style={{ fontSize: 24, margin: "0 0 4px" }}>Get Help Page</h1>
          <p style={{ margin: 0, color: "#666", fontSize: 13 }}>Edit every text element shown on /get-help (desktop + mobile). Some fields have a separate <em>mobile</em> variant — shorter copy used on phones.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {msg && <span style={{ fontSize: 13, color: msg.startsWith("Save") || msg.startsWith("Load") ? "#c62828" : "#2e7d32" }}>{msg}</span>}
          <button onClick={save} disabled={saving} style={{ padding: "10px 20px", background: "#c9a84c", color: "#000", border: 0, borderRadius: 4, fontWeight: 600, cursor: "pointer" }}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      {/* CONTACT */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Contact</h2>
        <div style={rowStyle}>
          <TextField label="Phone (display)" value={content.contact?.phone_display} onChange={(v) => update(["contact","phone_display"], v)} hint="(303) 838-1200" />
          <TextField label="Phone (dialed digits)" value={content.contact?.phone_tel} onChange={(v) => update(["contact","phone_tel"], v)} hint="3038381200" />
        </div>
      </div>

      {/* TOP BAR */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Top bar (desktop)</h2>
        <BiField label="Need-help prompt" value={content.topbar?.need_help} onChange={(v) => update(["topbar","need_help"], v)} />
      </div>

      {/* HERO */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Hero</h2>
        <BiField label="Label (small caps)" value={content.hero?.label} onChange={(v) => update(["hero","label"], v)} />
        <BiField label="Title (H1)" value={content.hero?.title} onChange={(v) => update(["hero","title"], v)} />
        <BiField label="Subtitle" value={content.hero?.subtitle} onChange={(v) => update(["hero","subtitle"], v)} area />
        <BiField label="Hours label" value={content.hero?.hours_label} onChange={(v) => update(["hero","hours_label"], v)} />
        <BiField label="Hours text" value={content.hero?.hours_text} onChange={(v) => update(["hero","hours_text"], v)} />
        <BiField label="After-hours link (desktop)" value={content.hero?.after_hours_label} onChange={(v) => update(["hero","after_hours_label"], v)} />
        <BiField label="After-hours link (mobile)" value={content.hero?.after_hours_short} onChange={(v) => update(["hero","after_hours_short"], v)} />
        <TextField label="After-hours link URL" value={content.hero?.after_hours_href} onChange={(v) => update(["hero","after_hours_href"], v)} />
      </div>

      {/* BILINGUAL STRIPS */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Bilingual prompt (mobile strip)</h2>
        <TextField label="Prompt text" value={content.bilingual?.mobile_to_es?.text} onChange={(v) => update(["bilingual","mobile_to_es","text"], v)} hint="Shown when current language is English" />
        <TextField label="Link text" value={content.bilingual?.mobile_to_es?.link} onChange={(v) => update(["bilingual","mobile_to_es","link"], v)} />
      </div>

      {/* FRAUD */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Fraud warning banner</h2>
        <BiField label="Label (bold prefix, desktop)" value={content.fraud?.label} onChange={(v) => update(["fraud","label"], v)} />
        <BiField label="Body (desktop)" value={content.fraud?.body} onChange={(v) => update(["fraud","body"], v)} area />
        <BiField label="Body (mobile)" value={content.fraud?.mobile_body} onChange={(v) => update(["fraud","mobile_body"], v)} area />
      </div>

      {/* TRIAGE */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Triage section headings</h2>
        <BiField label="Label (desktop)" value={content.triage?.label} onChange={(v) => update(["triage","label"], v)} />
        <BiField label="Label (mobile)" value={content.triage?.mobile_label} onChange={(v) => update(["triage","mobile_label"], v)} />
        <BiField label="Title (desktop)" value={content.triage?.title} onChange={(v) => update(["triage","title"], v)} />
        <BiField label="Title (mobile)" value={content.triage?.mobile_title} onChange={(v) => update(["triage","mobile_title"], v)} />
        <BiField label="Subtitle (desktop only)" value={content.triage?.subtitle} onChange={(v) => update(["triage","subtitle"], v)} area />
      </div>

      {/* CARDS */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Triage cards (in order shown on page)</h2>
        <p style={{ fontSize: 12, color: "#666", marginTop: -8, marginBottom: 16 }}>The 6th card differs between desktop (homeowner info) and mobile (other resources) — fill both variants.</p>
        {cards.map((card, i) => (
          <div key={card.id || i} style={{ border: "1px solid #eee", borderRadius: 6, padding: 14, marginBottom: 12, background: "#fcfcfc" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
              Card {i + 1} — id: {card.id || "(unset)"}
            </div>
            <BiField label="Title (desktop)" value={card.title} onChange={(v) => update(["cards", String(i), "title"], v)} />
            <BiField label="Title (mobile, shorter)" value={card.title_mobile} onChange={(v) => update(["cards", String(i), "title_mobile"], v)} />
            <BiField label="Body (desktop)" value={card.body} onChange={(v) => update(["cards", String(i), "body"], v)} area />
            {(i === 5 || card.body_mobile) && (
              <BiField label="Body (mobile, optional override)" value={card.body_mobile} onChange={(v) => update(["cards", String(i), "body_mobile"], v)} area />
            )}
            <div style={rowStyle}>
              <div>
                <BiField label="Primary button label" value={card.cta_primary_label} onChange={(v) => update(["cards", String(i), "cta_primary_label"], v)} />
              </div>
              <div>
                <TextField label="Primary button URL" value={card.cta_primary_href} onChange={(v) => update(["cards", String(i), "cta_primary_href"], v)} hint="Use tel:... for phone" />
              </div>
            </div>
            {(i === 5 || card.cta_primary_label_mobile) && (
              <BiField label="Primary button label (mobile override)" value={card.cta_primary_label_mobile} onChange={(v) => update(["cards", String(i), "cta_primary_label_mobile"], v)} />
            )}
            <div style={rowStyle}>
              <div>
                <BiField label="Alt button label (optional)" value={card.cta_alt_label} onChange={(v) => update(["cards", String(i), "cta_alt_label"], v)} />
              </div>
              <div>
                <TextField label="Alt button URL" value={card.cta_alt_href} onChange={(v) => update(["cards", String(i), "cta_alt_href"], v)} />
              </div>
            </div>
            {(i === 5 || card.cta_alt_label_mobile) && (
              <BiField label="Alt button label (mobile override)" value={card.cta_alt_label_mobile} onChange={(v) => update(["cards", String(i), "cta_alt_label_mobile"], v)} />
            )}
          </div>
        ))}
      </div>

      {/* CHAT */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Chat card</h2>
        <BiField label="Title (desktop)" value={content.chat?.title} onChange={(v) => update(["chat","title"], v)} />
        <BiField label="Title (mobile)" value={content.chat?.title_mobile} onChange={(v) => update(["chat","title_mobile"], v)} />
        <BiField label="Subtitle (desktop)" value={content.chat?.subtitle} onChange={(v) => update(["chat","subtitle"], v)} />
        <BiField label="Subtitle (mobile)" value={content.chat?.subtitle_mobile} onChange={(v) => update(["chat","subtitle_mobile"], v)} />
        <BiField label="Status (desktop)" value={content.chat?.status} onChange={(v) => update(["chat","status"], v)} />
        <BiField label="Status (mobile)" value={content.chat?.status_mobile} onChange={(v) => update(["chat","status_mobile"], v)} />
        <TextField label="Chat URL" value={content.chat?.href} onChange={(v) => update(["chat","href"], v)} />
      </div>

      {/* HOURS */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Business hours panel</h2>
        <BiField label="Open-now title" value={content.hours?.during_title} onChange={(v) => update(["hours","during_title"], v)} />
        <BiField label="Open-now body (desktop)" value={content.hours?.during_body} onChange={(v) => update(["hours","during_body"], v)} area />
        <BiField label="Open-now body (mobile)" value={content.hours?.during_body_mobile} onChange={(v) => update(["hours","during_body_mobile"], v)} area />
        <BiField label="Open-now hours line" value={content.hours?.during_hours} onChange={(v) => update(["hours","during_hours"], v)} />
        <BiField label="After-hours title" value={content.hours?.after_title} onChange={(v) => update(["hours","after_title"], v)} />
        <BiField label="After-hours body (desktop)" value={content.hours?.after_body} onChange={(v) => update(["hours","after_body"], v)} area />
        <BiField label="After-hours body (mobile)" value={content.hours?.after_body_mobile} onChange={(v) => update(["hours","after_body_mobile"], v)} area />
        <BiField label="After-hours CTA (desktop)" value={content.hours?.after_cta} onChange={(v) => update(["hours","after_cta"], v)} />
        <BiField label="After-hours CTA (mobile)" value={content.hours?.after_cta_mobile} onChange={(v) => update(["hours","after_cta_mobile"], v)} />
        <TextField label="After-hours CTA URL" value={content.hours?.after_cta_href} onChange={(v) => update(["hours","after_cta_href"], v)} />
      </div>

      {/* SAFETY */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>"CEDP will never..." safety section</h2>
        <BiField label="Label" value={content.safety?.label} onChange={(v) => update(["safety","label"], v)} />
        <BiField label="Title" value={content.safety?.title} onChange={(v) => update(["safety","title"], v)} />
        {safetyItems.map((item, i) => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: 6, padding: 12, marginTop: 10, background: "#fcfcfc" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#c9a84c", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Item {i + 1}</div>
            <BiField label="Title (desktop)" value={item.title} onChange={(v) => update(["safety","items", String(i), "title"], v)} />
            {(item.title_mobile || i === 2) && (
              <BiField label="Title (mobile, optional)" value={item.title_mobile} onChange={(v) => update(["safety","items", String(i), "title_mobile"], v)} />
            )}
            <BiField label="Body (desktop)" value={item.body} onChange={(v) => update(["safety","items", String(i), "body"], v)} area />
            <BiField label="Body (mobile, shorter)" value={item.body_mobile} onChange={(v) => update(["safety","items", String(i), "body_mobile"], v)} area />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Footer</h2>
        <BiField label="Phone caption (under big phone number on mobile)" value={content.footer?.phone_caption} onChange={(v) => update(["footer","phone_caption"], v)} />
        <BiField label="Copyright" value={content.footer?.copyright} onChange={(v) => update(["footer","copyright"], v)} />
      </div>

      {/* BOTTOM CALL BAR (mobile) */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>Mobile bottom call bar</h2>
        <BiField label="Call button label" value={content.bottom_call?.call_label} onChange={(v) => update(["bottom_call","call_label"], v)} />
        <BiField label="Chat button label" value={content.bottom_call?.chat_label} onChange={(v) => update(["bottom_call","chat_label"], v)} />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
        <button onClick={save} disabled={saving} style={{ padding: "12px 28px", background: "#c9a84c", color: "#000", border: 0, borderRadius: 4, fontWeight: 700, cursor: "pointer" }}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}