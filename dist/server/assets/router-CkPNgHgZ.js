import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const appCss = "/assets/styles-C_6zwUZQ.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$j = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "CEDP Compass is a website that informs users about the Community Economic Defense Project's mission and services." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "CEDP Compass is a website that informs users about the Community Economic Defense Project's mission and services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "CEDP Compass is a website that informs users about the Community Economic Defense Project's mission and services." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ce3bc566-e7a7-4127-a42f-5ad401637125/id-preview-8c60e920--7fd88387-d13e-4d42-bc6f-6b10e7387ed6.lovable.app-1780052108475.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ce3bc566-e7a7-4127-a42f-5ad401637125/id-preview-8c60e920--7fd88387-d13e-4d42-bc6f-6b10e7387ed6.lovable.app-1780052108475.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$j.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter$i = () => import("./team-eA9WGMzk.js");
const Route$i = createFileRoute("/team")({
  head: () => ({
    meta: [{
      title: "Our Team — Community Economic Defense Project"
    }, {
      name: "description",
      content: "200 people. 4 offices. 1 mission. Meet the team defending Coloradans from economic abuse."
    }, {
      property: "og:title",
      content: "Our Team — CEDP"
    }, {
      property: "og:description",
      content: "Meet the team defending Coloradans from economic abuse."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./research-DSWBstsN.js");
const Route$h = createFileRoute("/research")({
  head: () => ({
    meta: [{
      title: "Research — Community Economic Defense Project"
    }, {
      name: "description",
      content: "CEDP research on housing instability, economic abuse, and the link between medical debt and eviction."
    }, {
      property: "og:title",
      content: "Research — CEDP"
    }, {
      property: "og:description",
      content: "Data-driven defense — research that becomes law."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./our-work-DxS9fBfI.js");
const Route$g = createFileRoute("/our-work")({
  head: () => ({
    meta: [{
      title: "Our Work — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Eviction defense, foreclosure, towing, debt collection, disaster relief, and resource navigation across Colorado."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./news-B6eEPud0.js");
const Route$f = createFileRoute("/news")({
  head: () => ({
    meta: [{
      title: "News — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Press, media coverage, events, and the latest from the Community Economic Defense Project."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./legislative-wins-CjXFmrKo.js");
const Route$e = createFileRoute("/legislative-wins")({
  head: () => ({
    meta: [{
      title: "Legislative Wins — Community Economic Defense Project"
    }, {
      name: "description",
      content: "From case to cause: how individual CEDP cases became Colorado law — towing reform, renters' rights, and the right to a jury trial."
    }, {
      property: "og:title",
      content: "Legislative Wins — CEDP"
    }, {
      property: "og:description",
      content: "Every law on this page started with one person's story."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./intake-form-F9bRQvgV.js");
const Route$d = createFileRoute("/intake-form")({
  head: () => ({
    meta: [{
      title: "Online Intake Form — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Submit your online intake form to request help from CEDP."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./impact-BysiMpiI.js");
const Route$c = createFileRoute("/impact")({
  head: () => ({
    meta: [{
      title: "Impact — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Legislative wins, research, and the measurable outcomes of CEDP's work across 59 Colorado counties."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./get-help-ANJbC0ul.js");
const Route$b = createFileRoute("/get-help")({
  head: () => ({
    meta: [{
      title: "Get Help — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Free legal defense and financial assistance for Colorado families facing eviction, foreclosure, towing, debt, or disaster."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./events-D9vX4u3E.js");
const Route$a = createFileRoute("/events")({
  head: () => ({
    meta: [{
      title: "Events — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Upcoming and past events from the Community Economic Defense Project, including office closures and community gatherings."
    }, {
      property: "og:title",
      content: "Events — CEDP"
    }, {
      property: "og:description",
      content: "Upcoming events, calendar, and past events from CEDP."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./ced-law-K49tjzQD.js");
const Route$9 = createFileRoute("/ced-law")({
  head: () => ({
    meta: [{
      title: "CED Law — Free Legal Defense for Coloradans"
    }, {
      name: "description",
      content: "CED Law is CEDP's nonprofit law firm providing free legal representation for eviction, foreclosure, towing, and debt collection."
    }, {
      property: "og:title",
      content: "CED Law — Free Legal Defense for Coloradans"
    }, {
      property: "og:description",
      content: "Free legal representation for Coloradans facing economic abuse."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./careers-jd_eMEKz.js");
const Route$8 = createFileRoute("/careers")({
  head: () => ({
    meta: [{
      title: "Careers — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Join a team of 200+ defending Colorado families through housing law, advocacy, policy, data, and community organizing."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin-CK0NOK06.js");
const Route$7 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./about-CO2RhY17.js");
const Route$6 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Community Economic Defense Project"
    }, {
      name: "description",
      content: "Born from a Facebook post in April 2020, CEDP has grown into a team of 200 serving 68,000 Coloradans across 59 counties."
    }, {
      property: "og:title",
      content: "About CEDP — Born from a Facebook post"
    }, {
      property: "og:description",
      content: "Co-founders Zach Neumann and Sam Gilman built a financial emergency room for Colorado families in crisis."
    }, {
      property: "og:image",
      content: "https://i0.wp.com/cedproject.org/wp-content/uploads/2022/12/cedp_bill_signing-scaled.jpeg?resize=1080%2C810&quality=100&ssl=1"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-DMSdKTAp.js");
const Route$5 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Community Economic Defense Project — Defending Colorado families"
    }, {
      name: "description",
      content: "CEDP partners with low-income and working people to confront economic abuse with legal, financial, and advocacy tools. 68,000+ Coloradans served."
    }, {
      property: "og:title",
      content: "Community Economic Defense Project"
    }, {
      property: "og:description",
      content: "A financial emergency room — eviction defense, foreclosure, towing, debt, and disaster relief for Colorado families."
    }, {
      property: "og:image",
      content: "https://i0.wp.com/cedproject.org/wp-content/uploads/2022/12/cedp_bill_signing-scaled.jpeg?resize=1080%2C810&quality=100&ssl=1"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.index-D4-ASisp.js");
const Route$4 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.team-ZCyTQ-0F.js");
const Route$3 = createFileRoute("/admin/team")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.legislation-Blhj6jlt.js");
const Route$2 = createFileRoute("/admin/legislation")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.jobs-nzQZFxkW.js");
const Route$1 = createFileRoute("/admin/jobs")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.get-help-CAvV25lS.js");
const Route = createFileRoute("/admin/get-help")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TeamRoute = Route$i.update({
  id: "/team",
  path: "/team",
  getParentRoute: () => Route$j
});
const ResearchRoute = Route$h.update({
  id: "/research",
  path: "/research",
  getParentRoute: () => Route$j
});
const OurWorkRoute = Route$g.update({
  id: "/our-work",
  path: "/our-work",
  getParentRoute: () => Route$j
});
const NewsRoute = Route$f.update({
  id: "/news",
  path: "/news",
  getParentRoute: () => Route$j
});
const LegislativeWinsRoute = Route$e.update({
  id: "/legislative-wins",
  path: "/legislative-wins",
  getParentRoute: () => Route$j
});
const IntakeFormRoute = Route$d.update({
  id: "/intake-form",
  path: "/intake-form",
  getParentRoute: () => Route$j
});
const ImpactRoute = Route$c.update({
  id: "/impact",
  path: "/impact",
  getParentRoute: () => Route$j
});
const GetHelpRoute = Route$b.update({
  id: "/get-help",
  path: "/get-help",
  getParentRoute: () => Route$j
});
const EventsRoute = Route$a.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$j
});
const CedLawRoute = Route$9.update({
  id: "/ced-law",
  path: "/ced-law",
  getParentRoute: () => Route$j
});
const CareersRoute = Route$8.update({
  id: "/careers",
  path: "/careers",
  getParentRoute: () => Route$j
});
const AdminRoute = Route$7.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$j
});
const AboutRoute = Route$6.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$j
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$j
});
const AdminIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminTeamRoute = Route$3.update({
  id: "/team",
  path: "/team",
  getParentRoute: () => AdminRoute
});
const AdminLegislationRoute = Route$2.update({
  id: "/legislation",
  path: "/legislation",
  getParentRoute: () => AdminRoute
});
const AdminJobsRoute = Route$1.update({
  id: "/jobs",
  path: "/jobs",
  getParentRoute: () => AdminRoute
});
const AdminGetHelpRoute = Route.update({
  id: "/get-help",
  path: "/get-help",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminGetHelpRoute,
  AdminJobsRoute,
  AdminLegislationRoute,
  AdminTeamRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  CareersRoute,
  CedLawRoute,
  EventsRoute,
  GetHelpRoute,
  ImpactRoute,
  IntakeFormRoute,
  LegislativeWinsRoute,
  NewsRoute,
  OurWorkRoute,
  ResearchRoute,
  TeamRoute
};
const routeTree = Route$j._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
