// Email Service using Resend
import { Resend } from 'resend';

interface EnrollmentEmailData {
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  courseTitle: string;
  coursePrice: number;
  courseId: string;
  experience?: string;
  message?: string;
}

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  cartItems: any[];
  totalPrice: number;
  totalItems: number;
  notes?: string;
}

class EmailService {
  private resend: Resend | null = null;
  private isConfigured: boolean = false;
  private fromEmail: string;
  private adminEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    this.adminEmail = process.env.ADMIN_EMAIL || 'info@thebostondroneschool.org';

    // Use onboarding@resend.dev for testing until domain is verified
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (apiKey) {
      try {
        this.resend = new Resend(apiKey);
        this.isConfigured = true;
        console.log('Email service configured (Resend)');
        console.log(`Sending from: ${this.fromEmail}`);
        console.log(`Admin notifications to: ${this.adminEmail}`);
      } catch (error) {
        console.warn('Email service initialization failed:', error);
      }
    } else {
      console.warn('Email service not configured (missing RESEND_API_KEY)');
    }
  }

  /**
   * Send enrollment confirmation to student and notification to admin
   */
  async sendEnrollmentConfirmation(data: EnrollmentEmailData): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured || !this.resend) {
      console.warn('Email service not configured, skipping enrollment emails');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      // Email to student
      const studentEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f9f9f9; }
            .button { display: inline-block; padding: 12px 30px; background: #000; color: #fff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .info-box { background: #fff; border-left: 4px solid #000; padding: 15px; margin: 20px 0; }
            ul { padding-left: 20px; }
            li { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Enrollment Request Received!</h1>
            </div>
            <div class="content">
              <p>Hi ${data.studentName},</p>

              <p>Your enrollment request for <strong>${data.courseTitle}</strong> has been received and is being processed.</p>

              <div class="info-box">
                <h3>What Happens Next:</h3>
                <ol>
                  <li><strong>Review:</strong> Our admissions team will review your enrollment request</li>
                  <li><strong>Contact:</strong> We will reach out within 24 hours via email or phone</li>
                  <li><strong>Payment:</strong> Complete enrollment via secure payment link (Stripe, PayPal, or other options)</li>
                  <li><strong>Access:</strong> Instant access to course materials will be provided after payment confirmation</li>
                </ol>
              </div>

              <div class="info-box">
                <h3>Course Details:</h3>
                <p><strong>Course:</strong> ${data.courseTitle}<br>
                <strong>Price:</strong> $${data.coursePrice}<br>
                <strong>Your Contact:</strong> ${data.studentEmail}${data.studentPhone ? `<br><strong>Phone:</strong> ${data.studentPhone}` : ''}</p>
              </div>

              <p><strong>Questions?</strong> Reply to this email or contact us at ${this.adminEmail}</p>

              <p>Best regards,<br>
              <strong>The Boston Drone School</strong></p>
            </div>
            <div class="footer">
              <p>The Boston Drone School | Professional FAA Part 107 Training<br>
              <a href="https://thebostondroneschool.org">thebostondroneschool.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Email to admin
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 20px; }
            .content { padding: 20px; background: #f9f9f9; }
            .info-box { background: #fff; border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 8px; border-bottom: 1px solid #eee; }
            td:first-child { font-weight: bold; width: 40%; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Course Enrollment Request</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <h3>Student Information:</h3>
                <table>
                  <tr><td>Name:</td><td>${data.studentName}</td></tr>
                  <tr><td>Email:</td><td>${data.studentEmail}</td></tr>
                  ${data.studentPhone ? `<tr><td>Phone:</td><td>${data.studentPhone}</td></tr>` : ''}
                  ${data.experience ? `<tr><td>Experience:</td><td>${data.experience}</td></tr>` : ''}
                </table>
              </div>

              <div class="info-box">
                <h3>Course Details:</h3>
                <table>
                  <tr><td>Course:</td><td>${data.courseTitle}</td></tr>
                  <tr><td>Course ID:</td><td>${data.courseId}</td></tr>
                  <tr><td>Price:</td><td>$${data.coursePrice}</td></tr>
                </table>
              </div>

              ${data.message ? `
              <div class="info-box">
                <h3>Student's Message:</h3>
                <p>${data.message}</p>
              </div>
              ` : ''}

              <p><strong>Action Required:</strong> Contact the student within 24 hours to complete enrollment.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send both emails
      await Promise.all([
        // Student confirmation
        this.resend.emails.send({
          from: this.fromEmail,
          to: data.studentEmail,
          subject: `Enrollment Request Received - ${data.courseTitle}`,
          html: studentEmailHtml,
        }),
        // Admin notification
        this.resend.emails.send({
          from: this.fromEmail,
          to: this.adminEmail,
          subject: `New Enrollment: ${data.studentName} - ${data.courseTitle}`,
          html: adminEmailHtml,
        }),
      ]);

      console.log(`Enrollment emails sent for ${data.courseTitle} to ${data.studentEmail}`);
      return { success: true };
    } catch (error) {
      console.error('Failed to send enrollment emails:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send emails',
      };
    }
  }

  /**
   * Send order confirmation to customer and notification to admin
   */
  async sendOrderConfirmation(data: OrderEmailData): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured || !this.resend) {
      console.warn('Email service not configured, skipping order emails');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      const itemsList = data.cartItems
        .map(
          (item) =>
            `<li>${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</li>`
        )
        .join('');

      // Email to customer
      const customerEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f9f9f9; }
            .info-box { background: #fff; border-left: 4px solid #000; padding: 15px; margin: 20px 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
            ul { padding-left: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Received!</h1>
            </div>
            <div class="content">
              <p>Hi ${data.customerName},</p>

              <p>Your order has been received and is being processed.</p>

              <div class="info-box">
                <h3>What Happens Next:</h3>
                <ol>
                  <li>We will contact you within 24 hours to arrange payment</li>
                  <li>Complete payment via PayPal, Venmo, Zelle, or other methods</li>
                  <li>Your order ships within 1-5 business days after payment confirmation</li>
                  <li>Tracking information will be sent via email</li>
                </ol>
              </div>

              <div class="info-box">
                <h3>Order Summary:</h3>
                <ul>${itemsList}</ul>
                <p><strong>Total: $${data.totalPrice.toFixed(2)}</strong> (${data.totalItems} items)</p>
              </div>

              <div class="info-box">
                <h3>Shipping Address:</h3>
                <p>${data.shippingAddress.replace(/\n/g, '<br>')}</p>
              </div>

              <p><strong>Questions?</strong> Reply to this email or contact us at ${this.adminEmail}</p>

              <p>Best regards,<br>
              <strong>The Boston Drone School</strong></p>
            </div>
            <div class="footer">
              <p>The Boston Drone School<br>
              <a href="https://thebostondroneschool.org">thebostondroneschool.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Email to admin
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 20px; }
            .content { padding: 20px; background: #f9f9f9; }
            .info-box { background: #fff; border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
            ul { padding-left: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Product Order</h2>
            </div>
            <div class="content">
              <div class="info-box">
                <h3>Customer Information:</h3>
                <p><strong>Name:</strong> ${data.customerName}<br>
                <strong>Email:</strong> ${data.customerEmail}<br>
                ${data.customerPhone ? `<strong>Phone:</strong> ${data.customerPhone}<br>` : ''}
                <strong>Shipping:</strong><br>${data.shippingAddress.replace(/\n/g, '<br>')}</p>
              </div>

              <div class="info-box">
                <h3>Order Items:</h3>
                <ul>${itemsList}</ul>
                <p><strong>Total: $${data.totalPrice.toFixed(2)}</strong> (${data.totalItems} items)</p>
              </div>

              ${data.notes ? `
              <div class="info-box">
                <h3>Customer Notes:</h3>
                <p>${data.notes}</p>
              </div>
              ` : ''}

              <p><strong>Action Required:</strong> Contact the customer within 24 hours to arrange payment and fulfillment.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send both emails
      await Promise.all([
        // Customer confirmation
        this.resend.emails.send({
          from: this.fromEmail,
          to: data.customerEmail,
          subject: 'Order Received - The Boston Drone School',
          html: customerEmailHtml,
        }),
        // Admin notification
        this.resend.emails.send({
          from: this.fromEmail,
          to: this.adminEmail,
          subject: `New Order: ${data.customerName} - $${data.totalPrice.toFixed(2)}`,
          html: adminEmailHtml,
        }),
      ]);

      console.log(`Order emails sent to ${data.customerEmail}`);
      return { success: true };
    } catch (error) {
      console.error('Failed to send order emails:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send emails',
      };
    }
  }
}

export const emailService = new EmailService();
export default emailService;
