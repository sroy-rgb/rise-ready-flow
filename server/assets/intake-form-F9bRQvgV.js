import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Home, Lock, ArrowLeft, ArrowRight, CheckCircle2, Phone, Info, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
const yesNoPNA = [
  { value: "yes", en: "Yes", es: "Sí" },
  { value: "no", en: "No", es: "No" },
  { value: "pna", en: "Prefer not to answer", es: "Prefiero no responder" }
];
const steps = [
  {
    id: "contact",
    title: { en: "Contact info", es: "Información de contacto" },
    fields: [
      { id: "firstName", type: "text", half: true, required: true, label: { en: "First name", es: "Nombre" } },
      { id: "lastName", type: "text", half: true, required: true, label: { en: "Last name", es: "Apellido" } },
      { id: "email", type: "email", required: true, label: { en: "Email", es: "Correo electrónico" }, placeholder: { en: "you@example.com", es: "tu@ejemplo.com" } },
      { id: "phone", type: "tel", half: true, label: { en: "Phone", es: "Teléfono" }, placeholder: { en: "(555) 555-5555", es: "(555) 555-5555" } },
      { id: "zip", type: "text", half: true, label: { en: "ZIP code", es: "Código postal" } },
      { id: "preferredContact", type: "radios", label: { en: "Preferred contact method", es: "Método de contacto preferido" }, options: [
        { value: "email", en: "Email", es: "Correo" },
        { value: "phone", en: "Phone call", es: "Llamada" },
        { value: "text", en: "Text message", es: "Mensaje de texto" }
      ] }
    ]
  },
  {
    id: "household",
    title: { en: "Household", es: "Hogar" },
    fields: [
      { id: "householdSize", type: "number", half: true, label: { en: "People in household", es: "Personas en el hogar" } },
      { id: "income", type: "number", half: true, label: { en: "Monthly income (USD)", es: "Ingreso mensual (USD)" }, hint: { en: "optional", es: "opcional" } },
      { id: "assistance", type: "chips", label: { en: "Assistance you receive", es: "Asistencia que recibe" }, options: [
        { value: "snap", en: "SNAP", es: "SNAP" },
        { value: "medicaid", en: "Medicaid", es: "Medicaid" },
        { value: "ssi", en: "SSI", es: "SSI" },
        { value: "wic", en: "WIC", es: "WIC" },
        { value: "veterans", en: "Veterans benefits", es: "Beneficios de veteranos" },
        { value: "pna", en: "Prefer not to answer", es: "Prefiero no responder" }
      ] }
    ]
  },
  {
    id: "needs",
    title: { en: "How can we help?", es: "¿Cómo podemos ayudar?" },
    fields: [
      { id: "topics", type: "chips", label: { en: "What do you need help with?", es: "¿Con qué necesita ayuda?" }, options: [
        { value: "internet", en: "Internet access", es: "Acceso a internet" },
        { value: "device", en: "Computer or device", es: "Computadora o dispositivo" },
        { value: "bills", en: "Utility bills", es: "Facturas de servicios" },
        { value: "housing", en: "Housing", es: "Vivienda" },
        { value: "other", en: "Other", es: "Otro" }
      ] },
      { id: "story", type: "textarea", label: { en: "Tell us more (optional)", es: "Cuéntenos más (opcional)" } },
      { id: "urgent", type: "toggle", label: { en: "Is this urgent?", es: "¿Es urgente?" }, options: yesNoPNA }
    ]
  },
  {
    id: "consent",
    title: { en: "Consent", es: "Consentimiento" },
    note: true,
    fields: [
      { id: "consentContact", type: "bool", required: true, label: { en: "I agree to be contacted by CEDP about my request.", es: "Acepto ser contactado por CEDP sobre mi solicitud." } },
      { id: "consentShare", type: "bool", label: { en: "CEDP may share my info with partner organizations to find help faster.", es: "CEDP puede compartir mi información con organizaciones aliadas para encontrar ayuda más rápido." } }
    ]
  }
];
const ui = {
  en: {
    brand: "Community Economic Defense Project",
    welcomeTitle: "Affordable Connectivity Intake",
    welcomeSub: "Tell us a little about your situation so we can connect you to the right help.",
    howItWorks: "How this works",
    howItWorksBody: "Answer a few short questions. Your info is private and only used to help you. It takes about 5 minutes.",
    getStarted: "Get started",
    privateSecure: "Private and secure",
    step: "Step",
    of: "of",
    back: "Back",
    continue: "Continue",
    submit: "Submit",
    submitting: "Submitting…",
    skipStep: "Skip this step",
    sensitiveNote: "These questions are optional. Your answers are kept confidential.",
    fixErrors: "Please fix the highlighted fields.",
    saveError: "Something went wrong. Please try again.",
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email.",
    doneTitle: "Thank you — we got your request.",
    doneBody: "A CEDP team member will reach out within 2 business days.",
    next1: "Your request was submitted",
    next2: "We'll review and follow up",
    next3: "You'll get a confirmation by email",
    needHelp: "Need help now? Call",
    helpPhone: "(303) 996-9100"
  },
  es: {
    brand: "Community Economic Defense Project",
    welcomeTitle: "Solicitud de Conectividad Asequible",
    welcomeSub: "Cuéntenos un poco sobre su situación para conectarle con la ayuda adecuada.",
    howItWorks: "Cómo funciona",
    howItWorksBody: "Responda unas preguntas breves. Su información es privada y solo se usa para ayudarle. Toma unos 5 minutos.",
    getStarted: "Comenzar",
    privateSecure: "Privado y seguro",
    step: "Paso",
    of: "de",
    back: "Atrás",
    continue: "Continuar",
    submit: "Enviar",
    submitting: "Enviando…",
    skipStep: "Omitir este paso",
    sensitiveNote: "Estas preguntas son opcionales. Sus respuestas son confidenciales.",
    fixErrors: "Por favor corrija los campos resaltados.",
    saveError: "Algo salió mal. Por favor intente de nuevo.",
    emailRequired: "El correo es obligatorio.",
    emailInvalid: "Por favor ingrese un correo válido.",
    doneTitle: "Gracias — recibimos su solicitud.",
    doneBody: "Un miembro del equipo de CEDP le contactará en un plazo de 2 días hábiles.",
    next1: "Su solicitud fue enviada",
    next2: "Revisaremos y le contactaremos",
    next3: "Recibirá una confirmación por correo",
    needHelp: "¿Necesita ayuda ahora? Llame al",
    helpPhone: "(303) 996-9100"
  }
};
async function submitIntake(values, lang) {
  try {
    if (typeof console !== "undefined") {
      console.log("[intake] submission", { lang, values });
    }
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
function useIsDesktop() {
  const [d, setD] = useState(
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}
function detectLang() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem("cedp.lang");
    if (saved === "en" || saved === "es") return saved;
  } catch {
  }
  return (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
}
const inputCls = "w-full rounded-[10px] border border-[#D6DEE3] bg-[#F7F9FA] px-3 py-2.5 text-[14px] text-[#1B2838] outline-none transition focus:border-[#1B2838] focus:ring-2 focus:ring-[#1B2838]/15";
function FieldView({
  field,
  lang,
  value,
  onChange,
  error
}) {
  const L = (o) => o[lang];
  const labelRow = /* @__PURE__ */ jsxs("label", { className: "mb-1.5 block text-[13px] text-[#5B7180]", children: [
    L(field.label),
    field.required && /* @__PURE__ */ jsx("span", { className: "text-[#C53030]", children: " *" }),
    field.hint && /* @__PURE__ */ jsxs("span", { className: "text-[#9AA8B2]", children: [
      " · ",
      L(field.hint)
    ] })
  ] });
  if (field.type === "text" || field.type === "email" || field.type === "tel" || field.type === "number") {
    return /* @__PURE__ */ jsxs("div", { children: [
      labelRow,
      /* @__PURE__ */ jsx(
        "input",
        {
          type: field.type === "number" ? "number" : field.type,
          inputMode: field.type === "tel" ? "tel" : field.type === "email" ? "email" : void 0,
          value: value || "",
          onChange: (e) => onChange(e.target.value),
          placeholder: field.placeholder ? L(field.placeholder) : "",
          "aria-required": field.required,
          "aria-invalid": !!error,
          className: inputCls + (error ? " border-[#C53030] focus:border-[#C53030] focus:ring-[#C53030]/15" : "")
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[12px] text-[#C53030]", children: error })
    ] });
  }
  if (field.type === "textarea") {
    return /* @__PURE__ */ jsxs("div", { children: [
      labelRow,
      /* @__PURE__ */ jsx("textarea", { rows: 3, value: value || "", onChange: (e) => onChange(e.target.value), className: inputCls })
    ] });
  }
  if (field.type === "bool") {
    const on = !!value;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onChange(!on),
        "aria-pressed": on,
        className: "flex w-full items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left text-[14px] transition " + (on ? "border-[#1B2838] bg-[#1B2838] text-white" : "border-[#D6DEE3] bg-white text-[#33485A] hover:border-[#9AA8B2]"),
        children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded border " + (on ? "border-white" : "border-[#9AA8B2]"), children: on && /* @__PURE__ */ jsx(Check, { size: 14 }) }),
          L(field.label)
        ]
      }
    );
  }
  if (field.type === "chips") {
    const arr = Array.isArray(value) ? value : [];
    return /* @__PURE__ */ jsxs("div", { children: [
      labelRow,
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", role: "group", "aria-label": L(field.label), children: field.options.map((o) => {
        const on = arr.includes(o.value);
        const pna = o.value === "pna";
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": on,
            onClick: () => {
              const next = arr.includes(o.value) ? arr.filter((v) => v !== o.value) : [...arr, o.value];
              onChange(next);
            },
            className: "rounded-full border px-3 py-1.5 text-[13px] transition " + (on ? "border-[#1B2838] bg-[#1B2838] text-white" : pna ? "border-dashed border-[#A7B6C0] bg-white text-[#5B7180] hover:border-[#5B7180]" : "border-[#D6DEE3] bg-white text-[#33485A] hover:border-[#9AA8B2]"),
            children: [
              on && /* @__PURE__ */ jsx(Check, { size: 13, className: "mr-1 inline -translate-y-px" }),
              L(o)
            ]
          },
          o.value
        );
      }) })
    ] });
  }
  if (field.type === "radios") {
    return /* @__PURE__ */ jsxs("div", { children: [
      labelRow,
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", role: "radiogroup", "aria-label": L(field.label), children: field.options.map((o) => {
        const on = value === o.value;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": on,
            onClick: () => onChange(on ? void 0 : o.value),
            className: "flex items-center gap-2.5 rounded-[10px] border px-3 py-2.5 text-left text-[13px] transition " + (on ? "border-[#1B2838] bg-[#1B2838] text-white" : "border-[#D6DEE3] bg-white text-[#33485A] hover:border-[#9AA8B2]"),
            children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-4 w-4 items-center justify-center rounded-full border " + (on ? "border-white" : "border-[#9AA8B2]"), children: on && /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-white" }) }),
              L(o)
            ]
          },
          o.value
        );
      }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    labelRow,
    /* @__PURE__ */ jsx("div", { className: "inline-flex overflow-hidden rounded-[10px] border border-[#D6DEE3]", role: "group", "aria-label": L(field.label), children: field.options.map((o, i) => {
      const on = value === o.value;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-pressed": on,
          onClick: () => onChange(on ? void 0 : o.value),
          className: "px-4 py-2 text-[13px] transition " + (i > 0 ? "border-l border-[#D6DEE3] " : "") + (on ? "bg-[#1B2838] text-white" : "bg-white text-[#33485A] hover:bg-[#F2F5F7]"),
          children: L(o)
        },
        o.value
      );
    }) })
  ] });
}
function LangToggle({ lang, setLang, onNavy }) {
  return /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden rounded-full border text-[11px] " + (onNavy ? "border-white/40" : "border-[#D6DEE3]"), role: "group", "aria-label": "Language", children: ["en", "es"].map((l) => {
    const on = lang === l;
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-pressed": on,
        onClick: () => setLang(l),
        className: "px-2.5 py-1 transition " + (on ? "bg-white text-[#1B2838]" : onNavy ? "text-white" : "text-[#5B7180]"),
        children: l.toUpperCase()
      },
      l
    );
  }) });
}
function SensitiveNote({ text }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-4 flex gap-2 rounded-[12px] bg-[#EAF1F6] px-3 py-2.5", children: [
    /* @__PURE__ */ jsx(Info, { size: 18, className: "mt-px shrink-0 text-[#2E6CB6]" }),
    /* @__PURE__ */ jsx("span", { className: "text-[12px] leading-relaxed text-[#33485A]", children: text })
  ] });
}
function Done({ lang }) {
  const t = (k) => ui[lang][k];
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md px-5 py-16 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E1F5EE]", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 34, className: "text-[#0F6E56]" }) }),
    /* @__PURE__ */ jsx("h1", { className: "mb-2 text-[22px] font-medium text-[#1B2838]", children: t("doneTitle") }),
    /* @__PURE__ */ jsx("p", { className: "mb-6 text-[14px] leading-relaxed text-[#5B7180]", children: t("doneBody") }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-sm rounded-[12px] border border-[#E2E8EC] p-4 text-left", children: [t("next1"), t("next2"), t("next3")].map((s, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 py-1.5", children: [
      /* @__PURE__ */ jsx(CheckCircle2, { size: 16, className: "shrink-0 text-[#0F6E56]" }),
      /* @__PURE__ */ jsx("span", { className: "text-[13px] text-[#33485A]", children: s })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center justify-center gap-1.5 text-[13px] text-[#33485A]", children: [
      /* @__PURE__ */ jsx(Phone, { size: 15 }),
      " ",
      t("needHelp"),
      " ",
      t("helpPhone")
    ] }),
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center gap-2 rounded-[12px] bg-[#1B2838] px-5 py-2.5 text-[14px] font-medium text-white",
        children: [
          /* @__PURE__ */ jsx(Home, { size: 16 }),
          " ",
          lang === "es" ? "Inicio" : "Home"
        ]
      }
    )
  ] });
}
function IntakeForm() {
  const isDesktop = useIsDesktop();
  const [lang, setLang] = useState(detectLang);
  useEffect(() => {
    try {
      window.localStorage.setItem("cedp.lang", lang);
    } catch {
    }
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [stepIdx, setStepIdx] = useState(-1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [topError, setTopError] = useState("");
  const t = (k) => ui[lang][k];
  const L = (o) => o[lang];
  const setVal = (id, v) => setValues((s) => ({ ...s, [id]: v }));
  function validateEmail() {
    const email = (values.email || "").trim();
    if (!email) {
      setErrors({ email: t("emailRequired") });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: t("emailInvalid") });
      return false;
    }
    setErrors({});
    return true;
  }
  async function handleSubmit() {
    if (!validateEmail()) {
      setTopError(t("fixErrors"));
      if (!isDesktop) setStepIdx(0);
      return;
    }
    setTopError("");
    setSubmitting(true);
    const res = await submitIntake({ ...values }, lang);
    setSubmitting(false);
    if (res.ok) setSubmitted(true);
    else setTopError(t("saveError"));
  }
  if (submitted) return /* @__PURE__ */ jsx(Done, { lang });
  if (!isDesktop) {
    if (stepIdx === -1) {
      return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-md flex-col", children: [
        /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between bg-[#1B2838] px-4 py-3.5 text-white", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", "aria-label": "Home", className: "flex items-center gap-1.5 text-[12px] font-medium", children: [
            /* @__PURE__ */ jsx(Home, { size: 16 }),
            " ",
            lang === "es" ? "Inicio" : "Home"
          ] }),
          /* @__PURE__ */ jsx(LangToggle, { lang, setLang, onNavy: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col px-5 py-7", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-2.5 text-[21px] font-medium leading-snug text-[#1B2838]", children: t("welcomeTitle") }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-[14px] leading-relaxed text-[#5B7180]", children: t("welcomeSub") }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-[14px] border border-[#E2E8EC] bg-[#F7F9FA] p-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-2 text-[14px] font-semibold text-[#1B2838]", children: t("howItWorks") }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] leading-relaxed text-[#5B7180]", children: t("howItWorksBody") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-5", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStepIdx(0), className: "w-full rounded-[12px] bg-[#1B2838] py-3.5 text-[15px] font-medium text-white", children: t("getStarted") }),
            /* @__PURE__ */ jsxs("p", { className: "mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#8497A3]", children: [
              /* @__PURE__ */ jsx(Lock, { size: 14 }),
              " ",
              t("privateSecure")
            ] })
          ] })
        ] })
      ] });
    }
    const step = steps[stepIdx];
    const pct = Math.round((stepIdx + 1) / steps.length * 100);
    const last = stepIdx === steps.length - 1;
    const goNext = () => {
      if (step.fields.some((f) => f.id === "email") && !validateEmail()) return;
      if (last) handleSubmit();
      else {
        setStepIdx(stepIdx + 1);
        window.scrollTo(0, 0);
      }
    };
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-md flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between bg-[#1B2838] px-4 py-3.5 text-white", children: [
        /* @__PURE__ */ jsx("button", { type: "button", "aria-label": t("back"), onClick: () => setStepIdx(stepIdx - 1), children: /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium", children: L(step.title) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", "aria-label": "Home", className: "text-white", children: /* @__PURE__ */ jsx(Home, { size: 16 }) }),
          /* @__PURE__ */ jsx(LangToggle, { lang, setLang, onNavy: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-4 pt-3.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-1.5 text-[11px] text-[#7A8B96]", children: [
          t("step"),
          " ",
          stepIdx + 1,
          " ",
          t("of"),
          " ",
          steps.length
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-1.5 rounded-full bg-[#EBEFF2]", children: /* @__PURE__ */ jsx("div", { className: "h-1.5 rounded-full bg-[#E8B960] transition-all", style: { width: pct + "%" } }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 px-4 py-5", children: [
        step.note && /* @__PURE__ */ jsx(SensitiveNote, { text: t("sensitiveNote") }),
        step.fields.map((f) => /* @__PURE__ */ jsx(FieldView, { field: f, lang, value: values[f.id], onChange: (v) => setVal(f.id, v), error: errors[f.id] }, f.id)),
        topError && /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#C53030]", children: topError }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => stepIdx === 0 ? setStepIdx(-1) : setStepIdx(stepIdx - 1),
                className: "flex flex-1 items-center justify-center gap-1.5 rounded-[12px] border border-[#D6DEE3] bg-white py-3.5 text-[14px] font-medium text-[#1B2838]",
                children: [
                  /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
                  " ",
                  t("back") || "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: goNext,
                disabled: submitting,
                className: "flex flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-[#1B2838] py-3.5 text-[15px] font-medium text-white disabled:opacity-60",
                children: last ? submitting ? t("submitting") : t("submit") : /* @__PURE__ */ jsxs(Fragment, { children: [
                  t("continue"),
                  " ",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
                ] })
              }
            )
          ] }),
          step.note && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => last ? handleSubmit() : setStepIdx(stepIdx + 1), className: "mt-3 w-full text-center text-[12px] text-[#7A8B96]", children: t("skipStep") })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#FBFCFD]", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between bg-[#1B2838] px-8 py-4 text-white", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium tracking-wide", children: t("brand") }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-1.5 text-[13px] font-medium text-white hover:opacity-80", children: [
          /* @__PURE__ */ jsx(Home, { size: 15 }),
          " ",
          lang === "es" ? "Inicio" : "Home"
        ] }),
        /* @__PURE__ */ jsx(LangToggle, { lang, setLang, onNavy: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b border-[#E2E8EC] py-9", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 max-w-2xl text-[26px] font-medium leading-snug text-[#1B2838]", children: t("welcomeTitle") }),
        /* @__PURE__ */ jsx("p", { className: "mb-3 max-w-2xl text-[15px] leading-relaxed text-[#5B7180]", children: t("welcomeSub") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 max-w-2xl rounded-[14px] border border-[#E2E8EC] bg-[#F7F9FA] p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-1.5 text-[14px] font-semibold text-[#1B2838]", children: t("howItWorks") }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] leading-relaxed text-[#5B7180]", children: t("howItWorksBody") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[200px_1fr] gap-10 py-9", children: [
        /* @__PURE__ */ jsx("nav", { className: "sticky top-6 self-start", children: steps.map((s, i) => /* @__PURE__ */ jsxs("a", { href: "#sec-" + s.id, className: "mb-3 flex items-center gap-2.5 text-[13px] text-[#5B7180] hover:text-[#1B2838]", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full border border-[#C9D4DB] text-[11px]", children: i + 1 }),
          L(s.title)
        ] }, s.id)) }),
        /* @__PURE__ */ jsxs("div", { children: [
          steps.map((s) => /* @__PURE__ */ jsxs("section", { id: "sec-" + s.id, className: "mb-9 scroll-mt-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-[18px] font-medium text-[#1B2838]", children: L(s.title) }),
            s.note && /* @__PURE__ */ jsx(SensitiveNote, { text: t("sensitiveNote") }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-5 gap-y-4", children: s.fields.map((f) => /* @__PURE__ */ jsx("div", { className: f.half ? "" : "col-span-2", children: /* @__PURE__ */ jsx(FieldView, { field: f, lang, value: values[f.id], onChange: (v) => setVal(f.id, v), error: errors[f.id] }) }, f.id)) })
          ] }, s.id)),
          topError && /* @__PURE__ */ jsx("p", { className: "mb-3 text-[13px] text-[#C53030]", children: topError }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleSubmit, disabled: submitting, className: "rounded-[12px] bg-[#C53030] px-8 py-3 text-[15px] font-medium text-white disabled:opacity-60", children: submitting ? t("submitting") : t("submit") })
        ] })
      ] })
    ] })
  ] });
}
const SplitComponent = IntakeForm;
export {
  SplitComponent as component
};
