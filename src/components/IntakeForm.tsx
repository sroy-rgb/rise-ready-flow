// CEDP Affordable Connectivity intake form.
// One component, two renderers driven by viewport:
//   - phones  -> one-step-at-a-time wizard
//   - desktop -> full sectioned page with a sticky progress rail
// Both read the same schema + strings from intakeConfig, so every field
// and both languages always match across platforms.

import { useEffect, useState } from "react";
import {
  ArrowLeft, ArrowRight, Lock, Info, Check, CheckCircle2, ChevronDown, Phone, Home,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { steps, ui, type Field, type Lang, type Step } from "@/lib/intakeConfig";
import { submitIntake } from "@/lib/submitIntake";

const NAVY = "#1B2838";
type Values = Record<string, any>;

function useIsDesktop() {
  const [d, setD] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  return (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
}

const inputCls =
  "w-full rounded-[10px] border border-[#D6DEE3] bg-[#F7F9FA] px-3 py-2.5 text-[14px] text-[#1B2838] outline-none transition focus:border-[#1B2838] focus:ring-2 focus:ring-[#1B2838]/15";

// ---- one field, all types -------------------------------------------------
function FieldView({
  field, lang, value, onChange, error,
}: {
  field: Field; lang: Lang; value: any;
  onChange: (v: any) => void; error?: string;
}) {
  const L = (o: { en: string; es: string }) => o[lang];
  const labelRow = (
    <label className="mb-1.5 block text-[13px] text-[#5B7180]">
      {L(field.label)}
      {field.required && <span className="text-[#C53030]"> *</span>}
      {field.hint && <span className="text-[#9AA8B2]"> · {L(field.hint)}</span>}
    </label>
  );

  if (field.type === "text" || field.type === "email" || field.type === "tel" || field.type === "number") {
    return (
      <div>
        {labelRow}
        <input
          type={field.type === "number" ? "number" : field.type}
          inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : undefined}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder ? L(field.placeholder) : ""}
          aria-required={field.required}
          aria-invalid={!!error}
          className={inputCls + (error ? " border-[#C53030] focus:border-[#C53030] focus:ring-[#C53030]/15" : "")}
        />
        {error && <p className="mt-1 text-[12px] text-[#C53030]">{error}</p>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {labelRow}
        <textarea rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      </div>
    );
  }

  if (field.type === "bool") {
    const on = !!value;
    return (
      <button
        type="button"
        onClick={() => onChange(!on)}
        aria-pressed={on}
        className={
          "flex w-full items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left text-[14px] transition " +
          (on ? "border-[#1B2838] bg-[#1B2838] text-white" : "border-[#D6DEE3] bg-white text-[#33485A] hover:border-[#9AA8B2]")
        }
      >
        <span className={"flex h-5 w-5 items-center justify-center rounded border " + (on ? "border-white" : "border-[#9AA8B2]")}>
          {on && <Check size={14} />}
        </span>
        {L(field.label)}
      </button>
    );
  }

  if (field.type === "chips") {
    const arr: string[] = Array.isArray(value) ? value : [];
    return (
      <div>
        {labelRow}
        <div className="flex flex-wrap gap-2" role="group" aria-label={L(field.label)}>
          {field.options!.map((o) => {
            const on = arr.includes(o.value);
            const pna = o.value === "pna";
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  const next = arr.includes(o.value) ? arr.filter((v) => v !== o.value) : [...arr, o.value];
                  onChange(next);
                }}
                className={
                  "rounded-full border px-3 py-1.5 text-[13px] transition " +
                  (on
                    ? "border-[#1B2838] bg-[#1B2838] text-white"
                    : pna
                    ? "border-dashed border-[#A7B6C0] bg-white text-[#5B7180] hover:border-[#5B7180]"
                    : "border-[#D6DEE3] bg-white text-[#33485A] hover:border-[#9AA8B2]")
                }
              >
                {on && <Check size={13} className="mr-1 inline -translate-y-px" />}
                {L(o)}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "radios") {
    return (
      <div>
        {labelRow}
        <div className="flex flex-col gap-2" role="radiogroup" aria-label={L(field.label)}>
          {field.options!.map((o) => {
            const on = value === o.value;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onChange(on ? undefined : o.value)}
                className={
                  "flex items-center gap-2.5 rounded-[10px] border px-3 py-2.5 text-left text-[13px] transition " +
                  (on ? "border-[#1B2838] bg-[#1B2838] text-white" : "border-[#D6DEE3] bg-white text-[#33485A] hover:border-[#9AA8B2]")
                }
              >
                <span className={"flex h-4 w-4 items-center justify-center rounded-full border " + (on ? "border-white" : "border-[#9AA8B2]")}>
                  {on && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                {L(o)}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // toggle (segmented Yes / No / Prefer not)
  return (
    <div>
      {labelRow}
      <div className="inline-flex overflow-hidden rounded-[10px] border border-[#D6DEE3]" role="group" aria-label={L(field.label)}>
        {field.options!.map((o, i) => {
          const on = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? undefined : o.value)}
              className={
                "px-4 py-2 text-[13px] transition " +
                (i > 0 ? "border-l border-[#D6DEE3] " : "") +
                (on ? "bg-[#1B2838] text-white" : "bg-white text-[#33485A] hover:bg-[#F2F5F7]")
              }
            >
              {L(o)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- small pieces ---------------------------------------------------------
function LangToggle({ lang, setLang, onNavy }: { lang: Lang; setLang: (l: Lang) => void; onNavy?: boolean }) {
  return (
    <div className={"flex overflow-hidden rounded-full border text-[11px] " + (onNavy ? "border-white/40" : "border-[#D6DEE3]")} role="group" aria-label="Language">
      {(["en", "es"] as Lang[]).map((l) => {
        const on = lang === l;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={on}
            onClick={() => setLang(l)}
            className={"px-2.5 py-1 transition " + (on ? "bg-white text-[#1B2838]" : onNavy ? "text-white" : "text-[#5B7180]")}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function SensitiveNote({ text }: { text: string }) {
  return (
    <div className="mb-4 flex gap-2 rounded-[12px] bg-[#EAF1F6] px-3 py-2.5">
      <Info size={18} className="mt-px shrink-0 text-[#2E6CB6]" />
      <span className="text-[12px] leading-relaxed text-[#33485A]">{text}</span>
    </div>
  );
}

// ---- confirmation ---------------------------------------------------------
function Done({ lang }: { lang: Lang }) {
  const t = (k: string) => ui[lang][k];
  return (
    <div className="mx-auto max-w-md px-5 py-16 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E1F5EE]">
        <CheckCircle2 size={34} className="text-[#0F6E56]" />
      </div>
      <h1 className="mb-2 text-[22px] font-medium text-[#1B2838]">{t("doneTitle")}</h1>
      <p className="mb-6 text-[14px] leading-relaxed text-[#5B7180]">{t("doneBody")}</p>
      <div className="mx-auto max-w-sm rounded-[12px] border border-[#E2E8EC] p-4 text-left">
        {[t("next1"), t("next2"), t("next3")].map((s, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5">
            <CheckCircle2 size={16} className="shrink-0 text-[#0F6E56]" />
            <span className="text-[13px] text-[#33485A]">{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-1.5 text-[13px] text-[#33485A]">
        <Phone size={15} /> {t("needHelp")} {t("helpPhone")}
      </div>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-[#1B2838] px-5 py-2.5 text-[14px] font-medium text-white"
      >
        <Home size={16} /> {lang === "es" ? "Inicio" : "Home"}
      </Link>
    </div>
  );
}

// ---- main -----------------------------------------------------------------
export default function IntakeForm() {
  const isDesktop = useIsDesktop();
  const [lang, setLang] = useState<Lang>(detectLang);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepIdx, setStepIdx] = useState(-1); // -1 = welcome (mobile only)
  const [howOpen, setHowOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [topError, setTopError] = useState("");

  const t = (k: string) => ui[lang][k];
  const L = (o: { en: string; es: string }) => o[lang];
  const setVal = (id: string, v: any) => setValues((s) => ({ ...s, [id]: v }));

  function validateEmail(): boolean {
    const email = (values.email || "").trim();
    if (!email) { setErrors({ email: t("emailRequired") }); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrors({ email: t("emailInvalid") }); return false; }
    setErrors({}); return true;
  }

  async function handleSubmit() {
    if (!validateEmail()) {
      setTopError(t("fixErrors"));
      if (!isDesktop) setStepIdx(0); // email lives on step 1
      return;
    }
    setTopError("");
    setSubmitting(true);
    const res = await submitIntake({ ...values }, lang);
    setSubmitting(false);
    if (res.ok) setSubmitted(true);
    else setTopError(t("saveError"));
  }

  if (submitted) return <Done lang={lang} />;

  // ---------------- MOBILE: one-step-at-a-time wizard ----------------
  if (!isDesktop) {
    if (stepIdx === -1) {
      return (
        <div className="mx-auto flex min-h-screen max-w-md flex-col">
          <header className="flex items-center justify-between bg-[#1B2838] px-4 py-3.5 text-white">
            <Link to="/" aria-label="Home" className="flex items-center gap-1.5 text-[12px] font-medium">
              <Home size={16} /> {lang === "es" ? "Inicio" : "Home"}
            </Link>
            <LangToggle lang={lang} setLang={setLang} onNavy />
          </header>
          <div className="flex flex-1 flex-col px-5 py-7">
            <h1 className="mb-2.5 text-[21px] font-medium leading-snug text-[#1B2838]">{t("welcomeTitle")}</h1>
            <p className="mb-4 text-[14px] leading-relaxed text-[#5B7180]">{t("welcomeSub")}</p>
            <div className="rounded-[14px] border border-[#E2E8EC] bg-[#F7F9FA] p-4">
              <h2 className="mb-2 text-[14px] font-semibold text-[#1B2838]">{t("howItWorks")}</h2>
              <p className="text-[13px] leading-relaxed text-[#5B7180]">{t("howItWorksBody")}</p>
            </div>
            <div className="pt-5">
              <button type="button" onClick={() => setStepIdx(0)} className="w-full rounded-[12px] bg-[#1B2838] py-3.5 text-[15px] font-medium text-white">{t("getStarted")}</button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#8497A3]"><Lock size={14} /> {t("privateSecure")}</p>
            </div>
          </div>
        </div>
      );
    }

    const step = steps[stepIdx];
    const pct = Math.round(((stepIdx + 1) / steps.length) * 100);
    const last = stepIdx === steps.length - 1;
    const goNext = () => {
      if (step.fields.some((f) => f.id === "email") && !validateEmail()) return;
      if (last) handleSubmit();
      else { setStepIdx(stepIdx + 1); window.scrollTo(0, 0); }
    };

    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <header className="flex items-center justify-between bg-[#1B2838] px-4 py-3.5 text-white">
          <button type="button" aria-label={t("back")} onClick={() => setStepIdx(stepIdx - 1)}><ArrowLeft size={18} /></button>
          <span className="text-[13px] font-medium">{L(step.title)}</span>
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Home" className="text-white"><Home size={16} /></Link>
            <LangToggle lang={lang} setLang={setLang} onNavy />
          </div>
        </header>
        <div className="px-4 pt-3.5">
          <div className="mb-1.5 text-[11px] text-[#7A8B96]">{t("step")} {stepIdx + 1} {t("of")} {steps.length}</div>
          <div className="h-1.5 rounded-full bg-[#EBEFF2]"><div className="h-1.5 rounded-full bg-[#E8B960] transition-all" style={{ width: pct + "%" }} /></div>
        </div>
        <div className="flex flex-1 flex-col gap-4 px-4 py-5">
          {step.note && <SensitiveNote text={t("sensitiveNote")} />}
          {step.fields.map((f) => (
            <FieldView key={f.id} field={f} lang={lang} value={values[f.id]} onChange={(v) => setVal(f.id, v)} error={errors[f.id]} />
          ))}
          {topError && <p className="text-[13px] text-[#C53030]">{topError}</p>}
          <div className="mt-auto pt-2">
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => (stepIdx === 0 ? setStepIdx(-1) : setStepIdx(stepIdx - 1))}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-[12px] border border-[#D6DEE3] bg-white py-3.5 text-[14px] font-medium text-[#1B2838]"
              >
                <ArrowLeft size={16} /> {t("back") || "Previous"}
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-[#1B2838] py-3.5 text-[15px] font-medium text-white disabled:opacity-60"
              >
                {last ? (submitting ? t("submitting") : t("submit")) : (<>{t("continue")} <ArrowRight size={16} /></>)}
              </button>
            </div>
            {step.note && <button type="button" onClick={() => (last ? handleSubmit() : setStepIdx(stepIdx + 1))} className="mt-3 w-full text-center text-[12px] text-[#7A8B96]">{t("skipStep")}</button>}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- DESKTOP: full sectioned page ----------------
  return (
    <div className="min-h-screen bg-[#FBFCFD]">
      <header className="flex items-center justify-between bg-[#1B2838] px-8 py-4 text-white">
        <span className="text-[13px] font-medium tracking-wide">{t("brand")}</span>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-[13px] font-medium text-white hover:opacity-80">
            <Home size={15} /> {lang === "es" ? "Inicio" : "Home"}
          </Link>
          <LangToggle lang={lang} setLang={setLang} onNavy />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-8">
        <div className="border-b border-[#E2E8EC] py-9">
          <h1 className="mb-2 max-w-2xl text-[26px] font-medium leading-snug text-[#1B2838]">{t("welcomeTitle")}</h1>
          <p className="mb-3 max-w-2xl text-[15px] leading-relaxed text-[#5B7180]">{t("welcomeSub")}</p>
          <div className="mt-3 max-w-2xl rounded-[14px] border border-[#E2E8EC] bg-[#F7F9FA] p-4">
            <h2 className="mb-1.5 text-[14px] font-semibold text-[#1B2838]">{t("howItWorks")}</h2>
            <p className="text-[13px] leading-relaxed text-[#5B7180]">{t("howItWorksBody")}</p>
          </div>
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-10 py-9">
          <nav className="sticky top-6 self-start">
            {steps.map((s, i) => (
              <a key={s.id} href={"#sec-" + s.id} className="mb-3 flex items-center gap-2.5 text-[13px] text-[#5B7180] hover:text-[#1B2838]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#C9D4DB] text-[11px]">{i + 1}</span>
                {L(s.title)}
              </a>
            ))}
          </nav>

          <div>
            {steps.map((s) => (
              <section key={s.id} id={"sec-" + s.id} className="mb-9 scroll-mt-6">
                <h2 className="mb-4 text-[18px] font-medium text-[#1B2838]">{L(s.title)}</h2>
                {s.note && <SensitiveNote text={t("sensitiveNote")} />}
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  {s.fields.map((f) => (
                    <div key={f.id} className={f.half ? "" : "col-span-2"}>
                      <FieldView field={f} lang={lang} value={values[f.id]} onChange={(v) => setVal(f.id, v)} error={errors[f.id]} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {topError && <p className="mb-3 text-[13px] text-[#C53030]">{topError}</p>}
            <button type="button" onClick={handleSubmit} disabled={submitting} className="rounded-[12px] bg-[#C53030] px-8 py-3 text-[15px] font-medium text-white disabled:opacity-60">
              {submitting ? t("submitting") : t("submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
