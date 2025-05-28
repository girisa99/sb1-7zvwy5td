import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as nodemailer from "npm:nodemailer@6.9.9";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    // Create reusable transporter object using Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'geniecellgene@gmail.com',
        pass: Deno.env.get('SMTP_PASSWORD'),
      },
    });

    // Verify SMTP connection before sending
    await transporter.verify();

    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'geniecellgene@gmail.com',
      to: email,
      subject: 'Welcome to MediGen - Important Information About Our Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #2563eb;">Welcome to MediGen!</h1>
          
          <p>Thank you for subscribing to our newsletter. We're excited to have you join our community focused on the future of personalized medicine and advanced therapeutics.</p>
          
          <h2 style="color: #1d4ed8; margin-top: 24px;">About Our Platform</h2>
          <p>MediGen is an educational and informational platform designed to demonstrate the transformative potential of:</p>
          <ul>
            <li>Cell Therapy</li>
            <li>Gene Therapy</li>
            <li>Advanced Therapeutics</li>
            <li>Low-code/No-code Development</li>
            <li>AI and LLM Applications in Healthcare</li>
          </ul>

          <h2 style="color: #1d4ed8; margin-top: 24px;">Important Disclaimer</h2>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="font-weight: bold; color: #64748b;">Please Read Carefully:</p>
            <ul style="color: #64748b;">
              <li>This platform is for demonstration and educational purposes only.</li>
              <li>Much of our content is generated using artificial intelligence and should not be considered medical advice.</li>
              <li>We do not guarantee the accuracy, completeness, or timeliness of any information presented.</li>
              <li>Always consult qualified healthcare providers, treatment centers, or manufacturers for specific medical advice.</li>
              <li>The platform demonstrates the potential of AI and low-code tools in healthcare information systems.</li>
            </ul>
          </div>

          <h2 style="color: #1d4ed8; margin-top: 24px;">Legal Notice</h2>
          <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
            By using MediGen, you acknowledge that: (1) the information provided is for educational purposes only; (2) no doctor-patient relationship is established; (3) we are not liable for any decisions made based on this information; (4) you waive any right to legal action regarding the content or its use; and (5) you should always seek professional medical advice for specific conditions.
          </p>

          <h2 style="color: #1d4ed8; margin-top: 24px;">What to Expect</h2>
          <p>You'll receive updates about:</p>
          <ul>
            <li>Developments in personalized medicine</li>
            <li>Educational content about advanced therapeutics</li>
            <li>Industry insights and trends</li>
            <li>Technology applications in healthcare</li>
          </ul>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 12px; color: #64748b;">
              This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager.
            </p>
          </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Enhanced error handling with more specific error messages
    let errorMessage = error.message;
    let errorCode = 'INTERNAL_ERROR';
    
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Failed to connect to SMTP server. Please check SMTP configuration.';
      errorCode = 'SMTP_CONNECTION_ERROR';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed. Please check credentials.';
      errorCode = 'SMTP_AUTH_ERROR';
    }

    return new Response(
      JSON.stringify({
        error: {
          message: errorMessage,
          code: errorCode
        }
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});