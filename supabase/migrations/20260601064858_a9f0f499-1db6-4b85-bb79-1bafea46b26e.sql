CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_content public read" ON public.page_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "page_content public insert" ON public.page_content FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "page_content public update" ON public.page_content FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "page_content public delete" ON public.page_content FOR DELETE TO anon, authenticated USING (true);

INSERT INTO public.page_content (page, content) VALUES ('get-help', '{
  "contact": {"phone_display":"(303) 838-1200","phone_tel":"3038381200"},
  "hero": {
    "label": {"en":"Get Help Now","es":"Obtenga Ayuda Ahora"},
    "title": {"en":"You don''t have to face this alone","es":"No tiene que enfrentar esto solo"},
    "subtitle": {"en":"Free legal aid, financial assistance, and resource navigation for eviction, foreclosure, towing, debt, and economic crisis.","es":"Ayuda legal gratuita, asistencia financiera y orientación de recursos para desalojo, ejecución hipotecaria, remolque, deudas y crisis económica."},
    "hours_label": {"en":"CARE Center","es":"Centro CARE"},
    "hours_text": {"en":"Mon–Fri, 8:30 AM – 5:30 PM MT","es":"Lun–Vie, 8:30 AM – 5:30 PM MT"},
    "after_hours_label": {"en":"After hours? Submit intake online →","es":"¿Fuera de horario? Envíe la solicitud en línea →"},
    "after_hours_href": "#",
    "after_hours_short": {"en":"After hours →","es":"Fuera de horario →"}
  },
  "bilingual": {
    "to_es_prompt": {"text":"¿Necesita ayuda en español?","link":"Cambie a Español","suffix":" — Todos nuestros servicios están disponibles en español."},
    "to_en_prompt": {"text":"Need help in English?","link":"Switch to English","suffix":" — All our services are available in English."},
    "mobile_to_es": {"text":"¿Necesita ayuda?","link":"Toque aquí para español"},
    "mobile_to_en": {"text":"Need help?","link":"Tap here for English"}
  },
  "fraud": {
    "label": {"en":"Important:","es":"Importante:"},
    "body": {"en":"CEDP does not charge fees for assistance. All official communications come from @cedproject.org or @cedlaw.org. We do not use WhatsApp or personal email.","es":"CEDP no cobra tarifas por asistencia. Todas las comunicaciones oficiales provienen de @cedproject.org o @cedlaw.org. No usamos WhatsApp ni correo personal."},
    "mobile_body": {"en":"CEDP never charges fees. Official emails come from @cedproject.org only. We don''t use WhatsApp.","es":"CEDP nunca cobra tarifas. Los correos oficiales provienen solo de @cedproject.org. No usamos WhatsApp."},
    "mobile_strong": {"en":"CEDP never charges fees.","es":"CEDP nunca cobra tarifas."}
  },
  "triage": {
    "label": {"en":"What are you facing?","es":"¿Qué está enfrentando?"},
    "title": {"en":"Tell us what''s happening","es":"Cuéntenos qué está pasando"},
    "subtitle": {"en":"Select your situation below. We''ll show you exactly how we can help and the fastest way to reach us.","es":"Seleccione su situación a continuación. Le mostraremos exactamente cómo podemos ayudar y la forma más rápida de contactarnos."},
    "mobile_label": {"en":"What''s happening?","es":"¿Qué está pasando?"},
    "mobile_title": {"en":"Select your situation","es":"Seleccione su situación"}
  },
  "cards": [
    {"id":"eviction","title":{"en":"I''m facing eviction or at risk of being evicted","es":"Enfrento un desalojo o riesgo de ser desalojado"},"title_mobile":{"en":"I''m facing eviction","es":"Enfrento un desalojo"},"body":{"en":"If you''ve received an eviction notice or are behind on rent, call us immediately. Our housing lawyers provide free legal representation and our team can connect you with emergency rental assistance.","es":"Si recibió un aviso de desalojo o está atrasado en el alquiler, llámenos de inmediato. Nuestros abogados de vivienda brindan representación legal gratuita y podemos conectarle con asistencia de alquiler de emergencia."},"cta_primary_label":{"en":"Call CARE Center","es":"Llamar al Centro CARE"},"cta_primary_href":"tel:3038381200","cta_alt_label":{"en":"Online intake form","es":"Formulario de admisión en línea"},"cta_alt_href":"#"},
    {"id":"foreclosure","title":{"en":"I''m facing foreclosure or at risk of losing my home","es":"Enfrento ejecución hipotecaria o riesgo de perder mi casa"},"title_mobile":{"en":"I''m facing foreclosure","es":"Enfrento ejecución hipotecaria"},"body":{"en":"We provide financial assistance for households at risk of or in the midst of a foreclosure. Our team can help you understand your options and connect you with legal support.","es":"Brindamos asistencia financiera a hogares en riesgo o en proceso de ejecución hipotecaria. Nuestro equipo puede ayudarle a entender sus opciones y conectarle con apoyo legal."},"cta_primary_label":{"en":"I need help with a foreclosure","es":"Necesito ayuda con una ejecución hipotecaria"},"cta_primary_href":"#","cta_alt_label":{"en":"","es":""},"cta_alt_href":""},
    {"id":"towing","title":{"en":"My car was towed or I''m dealing with a towing issue","es":"Mi auto fue remolcado o tengo un problema de remolque"},"title_mobile":{"en":"My car was towed","es":"Mi auto fue remolcado"},"body":{"en":"Predatory towing can push families into eviction. CEDP helped pass Colorado''s Towing Bill of Rights and can help you recover your vehicle, challenge unfair towing charges, and know your rights.","es":"El remolque depredador puede llevar a familias al desalojo. CEDP ayudó a aprobar la Carta de Derechos de Remolque de Colorado y puede ayudarle a recuperar su vehículo, impugnar cargos injustos y conocer sus derechos."},"cta_primary_label":{"en":"Call for towing help","es":"Llamar por ayuda con remolque"},"cta_primary_href":"tel:3038381200","cta_alt_label":{"en":"","es":""},"cta_alt_href":""},
    {"id":"utility","title":{"en":"I need help with utility bills","es":"Necesito ayuda con las facturas de servicios"},"title_mobile":{"en":"I need help with utility bills","es":"Necesito ayuda con las facturas"},"body":{"en":"We partner with Energy Outreach Colorado to help eligible households with utility payments — electricity, natural gas, propane, oil, kerosene, coal, firewood, and pellets. Currently processing applications for Xcel Energy, Atmos Energy, Colorado Natural Gas, and Black Hills Energy.","es":"Nos asociamos con Energy Outreach Colorado para ayudar a hogares elegibles con pagos de servicios públicos — electricidad, gas natural, propano, aceite, queroseno, carbón, leña y pellets. Actualmente procesamos solicitudes para Xcel Energy, Atmos Energy, Colorado Natural Gas y Black Hills Energy."},"cta_primary_label":{"en":"I need help paying my utility bills","es":"Necesito ayuda para pagar mis facturas de servicios"},"cta_primary_href":"#","cta_alt_label":{"en":"","es":""},"cta_alt_href":""},
    {"id":"debt","title":{"en":"I''m dealing with debt collection or financial hardship","es":"Estoy lidiando con cobro de deudas o dificultades financieras"},"title_mobile":{"en":"I''m dealing with debt collection","es":"Estoy lidiando con cobro de deudas"},"body":{"en":"Our debt defense team can help you understand your rights, challenge unfair collection practices, and find a path to financial stability. Free legal guidance and financial navigation.","es":"Nuestro equipo de defensa de deudas puede ayudarle a entender sus derechos, impugnar prácticas de cobro injustas y encontrar un camino a la estabilidad financiera. Orientación legal y financiera gratuita."},"cta_primary_label":{"en":"Call for debt help","es":"Llamar por ayuda con deudas"},"cta_primary_href":"tel:3038381200","cta_alt_label":{"en":"","es":""},"cta_alt_href":""},
    {"id":"homeowner","title":{"en":"I''m a homeowner or mobile homeowner seeking legal info","es":"Soy propietario o dueño de casa móvil buscando información legal"},"title_mobile":{"en":"I need other help or resources","es":"Necesito otra ayuda o recursos"},"body":{"en":"We offer free virtual legal information sessions covering property rights, mobile home evictions, the foreclosure process, and HOA issues. Learn about your rights as a homeowner.","es":"Ofrecemos sesiones virtuales gratuitas de información legal sobre derechos de propiedad, desalojos de casas móviles, el proceso de ejecución hipotecaria y problemas de HOA. Conozca sus derechos como propietario."},"body_mobile":{"en":"Looking for community resources? Need help finding a job, medical services, childcare, food, or bus passes? We can connect you with local services.","es":"¿Busca recursos comunitarios? ¿Necesita ayuda para encontrar trabajo, servicios médicos, cuidado infantil, comida o pases de autobús? Podemos conectarle con servicios locales."},"cta_primary_label":{"en":"Learn about my rights","es":"Conozca mis derechos"},"cta_primary_label_mobile":{"en":"Find resources near me","es":"Buscar recursos cerca"},"cta_primary_href":"#","cta_alt_label":{"en":"","es":""},"cta_alt_label_mobile":{"en":"Contact us","es":"Contáctenos"},"cta_alt_href":"#"}
  ],
  "chat": {
    "title": {"en":"Chat with us now","es":"Chatee con nosotros ahora"},
    "title_mobile": {"en":"Chat with us","es":"Chatee con nosotros"},
    "subtitle": {"en":"Connect with the CARE Center team instantly. Available during business hours.","es":"Conéctese con el equipo del Centro CARE al instante. Disponible en horario laboral."},
    "subtitle_mobile": {"en":"Connect with CARE Center instantly","es":"Conéctese con el Centro CARE al instante"},
    "status": {"en":"Live now","es":"En vivo"},
    "status_mobile": {"en":"Live","es":"En vivo"},
    "href": "#"
  },
  "hours": {
    "during_title": {"en":"During business hours","es":"Durante el horario laboral"},
    "during_body": {"en":"Call the CARE Center directly. A navigator will assess your situation and connect you with the right support — legal, financial, or both.","es":"Llame directamente al Centro CARE. Un navegador evaluará su situación y le conectará con el apoyo adecuado — legal, financiero o ambos."},
    "during_body_mobile": {"en":"Call the CARE Center. A navigator will connect you with the right support.","es":"Llame al Centro CARE. Un navegador le conectará con el apoyo adecuado."},
    "during_hours": {"en":"Mon–Fri, 8:30 AM – 5:30 PM MT","es":"Lun–Vie, 8:30 AM – 5:30 PM MT"},
    "after_title": {"en":"After hours or weekends","es":"Fuera de horario o fines de semana"},
    "after_body": {"en":"Submit an online intake form and a team member will contact you on the next business day. For emergencies, dial 911.","es":"Envíe un formulario de admisión en línea y un miembro del equipo le contactará el siguiente día hábil. Para emergencias, marque 911."},
    "after_body_mobile": {"en":"Submit an online intake form. A team member will contact you on the next business day.","es":"Envíe un formulario de admisión en línea. Un miembro del equipo le contactará el siguiente día hábil."},
    "after_cta": {"en":"Submit online intake form →","es":"Enviar formulario de admisión en línea →"},
    "after_cta_mobile": {"en":"Submit intake form →","es":"Enviar formulario →"},
    "after_cta_href": "#"
  },
  "safety": {
    "label": {"en":"Protecting you","es":"Protegiéndole"},
    "title": {"en":"CEDP will never...","es":"CEDP nunca..."},
    "items": [
      {"title":{"en":"Charge you fees","es":"Le cobrará tarifas"},"body":{"en":"All CEDP services — legal representation, financial assistance, navigation — are completely free. We will never ask for payment.","es":"Todos los servicios de CEDP — representación legal, asistencia financiera, orientación — son completamente gratuitos. Nunca pediremos pago."},"body_mobile":{"en":"All services are 100% free — legal aid, financial assistance, everything.","es":"Todos los servicios son 100% gratuitos — ayuda legal, asistencia financiera, todo."}},
      {"title":{"en":"Contact you via WhatsApp","es":"Le contactará por WhatsApp"},"body":{"en":"Official communications come from @cedproject.org or @cedlaw.org email addresses only. Never personal email or messaging apps.","es":"Las comunicaciones oficiales provienen solo de correos @cedproject.org o @cedlaw.org. Nunca correo personal ni aplicaciones de mensajería."},"body_mobile":{"en":"Official emails come from @cedproject.org or @cedlaw.org only.","es":"Los correos oficiales provienen solo de @cedproject.org o @cedlaw.org."}},
      {"title":{"en":"Ask for sensitive info by email","es":"Le pedirá información sensible por correo"},"title_mobile":{"en":"Ask for bank details by email","es":"Pedir datos bancarios por correo"},"body":{"en":"We will never request Social Security numbers, bank details, or payment information via email or text message.","es":"Nunca solicitaremos números de Seguro Social, datos bancarios ni información de pago por correo o mensaje de texto."},"body_mobile":{"en":"We never request SSN, bank info, or payments via email or text.","es":"Nunca solicitamos SSN, información bancaria ni pagos por correo o mensaje."}}
    ]
  },
  "footer": {
    "phone_caption": {"en":"CARE Center · Mon–Fri 8:30am–5:30pm MT","es":"Centro CARE · Lun–Vie 8:30am–5:30pm MT"},
    "copyright": {"en":"© 2026 Community Economic Defense Project","es":"© 2026 Community Economic Defense Project"}
  },
  "bottom_call": {
    "call_label": {"en":"Call Now","es":"Llamar ahora"},
    "chat_label": {"en":"Chat","es":"Chatear"}
  },
  "topbar": {
    "need_help": {"en":"Need help now?","es":"¿Necesita ayuda ahora?"}
  }
}'::jsonb);