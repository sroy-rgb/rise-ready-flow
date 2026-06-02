import { createFileRoute } from "@tanstack/react-router";
import IntakeForm from "@/components/IntakeForm";

export const Route = createFileRoute("/intake-form")({
  head: () => ({
    meta: [
      { title: "Online Intake Form — Community Economic Defense Project" },
      { name: "description", content: "Submit your online intake form to request help from CEDP." },
    ],
  }),
  component: IntakeForm,
});