import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/intake-form")({
  head: () => ({
    meta: [
      { title: "Online Intake Form — Community Economic Defense Project" },
      { name: "description", content: "Submit your online intake form to request help from CEDP." },
    ],
  }),
  component: IntakeForm,
});

function IntakeForm() {
  return (
    <iframe
      src="/cedp-intake-form.html"
      title="Online Intake Form"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}