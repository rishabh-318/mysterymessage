import { Resend } from "resend";
if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in env (server-only).");
}
export const resend = new Resend(process.env.RESEND_API_KEY!);
