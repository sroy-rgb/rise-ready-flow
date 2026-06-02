export type Lang = "en" | "es";

export type Bilingual = { en: string; es: string };

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "bool"
  | "chips"
  | "radios"
  | "toggle";

export type FieldOption = Bilingual & { value: string };

export type Field = {
  id: string;
  type: FieldType;
  label: Bilingual;
  placeholder?: Bilingual;
  hint?: Bilingual;
  required?: boolean;
  half?: boolean;
  options?: FieldOption[];
};

export type Step = {
  id: string;
  title: Bilingual;
  note?: boolean;
  fields: Field[];
};

const yesNoPNA: FieldOption[] = [
  { value: "yes", en: "Yes", es: "Sí" },
  { value: "no", en: "No", es: "No" },
  { value: "pna", en: "Prefer not to answer", es: "Prefiero no responder" },
];

export const steps: Step[] = [
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
        { value: "text", en: "Text message", es: "Mensaje de texto" },
      ]},
    ],
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
        { value: "pna", en: "Prefer not to answer", es: "Prefiero no responder" },
      ]},
    ],
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
        { value: "other", en: "Other", es: "Otro" },
      ]},
      { id: "story", type: "textarea", label: { en: "Tell us more (optional)", es: "Cuéntenos más (opcional)" } },
      { id: "urgent", type: "toggle", label: { en: "Is this urgent?", es: "¿Es urgente?" }, options: yesNoPNA },
    ],
  },
  {
    id: "consent",
    title: { en: "Consent", es: "Consentimiento" },
    note: true,
    fields: [
      { id: "consentContact", type: "bool", required: true, label: { en: "I agree to be contacted by CEDP about my request.", es: "Acepto ser contactado por CEDP sobre mi solicitud." } },
      { id: "consentShare", type: "bool", label: { en: "CEDP may share my info with partner organizations to find help faster.", es: "CEDP puede compartir mi información con organizaciones aliadas para encontrar ayuda más rápido." } },
    ],
  },
];

export const ui: Record<Lang, Record<string, string>> = {
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
    helpPhone: "(303) 996-9100",
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
    helpPhone: "(303) 996-9100",
  },
};