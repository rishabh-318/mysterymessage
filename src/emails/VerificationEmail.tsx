import {
  Html,
  Head,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Here’s your verification code</Preview>
      <Section>
        <Row>
          <Heading>Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code:
          </Text>
        </Row>
        <Row>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
