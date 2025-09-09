import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Render React email template into HTML
    const emailHtml = render(
      <VerificationEmail username={username} otp={verifyCode} />
    );

    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev", // sandbox sender
      to: email, // e.g., delivered@resend.dev
      subject: "Mystery message | Verification code",
      html: await emailHtml, // ✅ send as HTML instead of react
    });

    console.log("Resend response:", emailResponse);

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError: any) {
    console.error("Error sending verification email:", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
