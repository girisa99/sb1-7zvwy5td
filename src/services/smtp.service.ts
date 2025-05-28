// This service should be moved to a backend API
// For now, we'll create a simple frontend interface that calls an API endpoint

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class SMTPService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = '/api/email'; // This should point to your actual API endpoint
  }

  async sendEmail(options: EmailOptions) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    await this.sendEmail({
      to: email,
      subject: 'Verify your email address',
      html: `
        <h1>Email Verification</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${window.location.origin}/verify-email?token=${token}">Verify Email</a>
      `
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    await this.sendEmail({
      to: email,
      subject: 'Reset your password',
      html: `
        <h1>Password Reset</h1>
        <p>Please click the link below to reset your password:</p>
        <a href="${window.location.origin}/reset-password?token=${token}">Reset Password</a>
      `
    });
  }
}

export const smtpService = new SMTPService();