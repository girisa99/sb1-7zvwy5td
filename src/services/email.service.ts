import { supabase } from '../lib/supabase';

export interface EmailTemplate {
  subject: string;
  content: string;
  variables: Record<string, string>;
}

class EmailService {
  private templates = {
    welcome: {
      subject: 'Welcome to MediGen AI Assistant',
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to MediGen AI Assistant!</h1>
          <p>Hello {{firstName}},</p>
          <p>Thank you for registering with our AI medical assistant. We're excited to help you explore the latest in personalized medicine and advanced therapeutics.</p>
          
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h2 style="color: #1d4ed8; margin-top: 0;">What You Can Do:</h2>
            <ul style="color: #64748b;">
              <li>Ask questions about cell and gene therapies</li>
              <li>Explore treatment options and clinical trials</li>
              <li>Access medical research and FDA data</li>
              <li>Stay updated on industry developments</li>
            </ul>
          </div>

          <div style="background-color: #fff3cd; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="color: #856404; margin: 0;">
              <strong>Important:</strong> This is a demonstration platform. Information provided should not be considered medical advice. Always consult qualified healthcare professionals for medical decisions.
            </p>
          </div>

          <p>If you have any questions, feel free to contact us at geniecellgene@gmail.com</p>
          
          <p>Best regards,<br>The MediGen Team</p>
        </div>
      `
    },
    newsletter: {
      subject: 'Welcome to MediGen Newsletter',
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to MediGen Newsletter!</h1>
          
          <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
          
          <ul style="color: #374151;">
            <li>Latest developments in cell and gene therapy</li>
            <li>Industry insights and research findings</li>
            <li>Educational content and resources</li>
            <li>Platform updates and new features</li>
          </ul>

          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="color: #64748b;">
              <strong>Frequency:</strong> We send newsletters twice a month to keep you informed without overwhelming your inbox.
            </p>
          </div>

          <p>You can manage your subscription preferences or unsubscribe at any time by clicking the links in our emails.</p>

          <p>Best regards,<br>The MediGen Team</p>
          
          <div style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 20px;">
            <p style="color: #64748b; font-size: 12px;">
              MediGen AI - Advancing Personalized Medicine<br>
              Contact: geniecellgene@gmail.com
            </p>
          </div>
        </div>
      `
    }
  };

  async sendWelcomeEmail(email: string, variables: Record<string, string>) {
    try {
      const template = this.templates.welcome;
      const content = this.replaceVariables(template.content, variables);
      
      await supabase.functions.invoke('send-welcome-email', {
        body: { email, content, subject: template.subject }
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  async sendNewsletterWelcome(email: string) {
    try {
      const template = this.templates.newsletter;
      
      await supabase.functions.invoke('send-welcome-email', {
        body: { email, content: template.content, subject: template.subject }
      });
    } catch (error) {
      console.error('Error sending newsletter welcome:', error);
      throw error;
    }
  }

  private replaceVariables(template: string, variables: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, variable) => variables[variable] || match);
  }
}

export const emailService = new EmailService();