import type { Lang } from "./intakeConfig";

export async function submitIntake(
  values: Record<string, unknown>,
  lang: Lang,
): Promise<{ ok: boolean; error?: string }> {
  try {
    // Stub: log the submission. Wire to backend when available.
    if (typeof console !== "undefined") {
      console.log("[intake] submission", { lang, values });
    }
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}