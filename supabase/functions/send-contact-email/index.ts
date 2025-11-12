import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email for:", name, email);

    // Send confirmation email to the customer
    const customerEmail = await resend.emails.send({
      from: "SNLH Logistics <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a;">Thank you for contacting SNLH Logistics, ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            We have received your message and will get back to you as soon as possible.
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0;">${message}</p>
          </div>
          <p style="font-size: 14px; color: #6b7280;">
            Best regards,<br>
            The SNLH Logistics Team
          </p>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "SNLH Contact Form <onboarding@resend.dev>",
      to: ["info@snlh.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a;">New Contact Form Submission</h1>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { customerEmail, adminEmail });

    return new Response(
      JSON.stringify({ 
        success: true,
        customerEmailId: customerEmail.data?.id,
        adminEmailId: adminEmail.data?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
