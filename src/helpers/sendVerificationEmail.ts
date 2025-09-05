import { resend } from "@/lib/resend";

import VerificaitonEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificaitonEmail(
  email: string,
  username: string,
  verifiyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystery message | Verificaiton code",
      react: VerificaitonEmail({ username, otp: verifiyCode }),
    });

    return { success: true, message: "Verificaiton email send successfully" };
  } catch (emailError) {
    console.log("Error sending verificaiton email", emailError);
    return { success: false, message: "Failed to send verificaiton email" };
  }
}
