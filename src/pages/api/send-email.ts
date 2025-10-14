// src/pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

interface ContactFormBody {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Data = {
  success: boolean;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message }: ContactFormBody = req.body;

    // Configure AWS SES
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const ses = new AWS.SES();

    const verifiedSender = process.env.SES_SOURCE_EMAIL!; // e.g., 'noreply@yourdomain.com'
    const yourInbox = process.env.EMAIL_TO!; // your email
    const logoUrl = process.env.EMAIL_LOGO_URL || 'https://www.btakestay.com/BTAKELOGO.jpg'; // your logo

    // HTML template for admin email
    const adminEmailHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Logo" width="120" style="margin-bottom: 20px;" />
          <h2 style="color: #1D4ED8;">New Contact Form Submission</h2>
        </div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 12px; color: #555;">This email was generated from your website contact form.</p>
      </div>
    `;

    // HTML template for user confirmation
    const userEmailHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Logo" width="120" style="margin-bottom: 20px;" />
          <h2 style="color: #1D4ED8;">Thank you for contacting us!</h2>
        </div>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Your Query:</strong></p>
        <p>${message}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 12px; color: #555;">You can reply to this email and it will reach us directly.</p>
      </div>
    `;

    // Email params
    const paramsToYou: AWS.SES.SendEmailRequest = {
      Source: verifiedSender,
      Destination: { ToAddresses: [yourInbox] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `New Contact Form Message from ${name}` },
        Body: { Html: { Data: adminEmailHTML } },
      },
    };

    const paramsToUser: AWS.SES.SendEmailRequest = {
      Source: verifiedSender,
      Destination: { ToAddresses: [email] },
      ReplyToAddresses: [yourInbox],
      Message: {
        Subject: { Data: `Thank you for contacting us, ${name}` },
        Body: { Html: { Data: userEmailHTML } },
      },
    };

    // Send both emails
    await Promise.all([ses.sendEmail(paramsToYou).promise(), ses.sendEmail(paramsToUser).promise()]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({ success: false, error: 'Failed to send emails' });
  }
}
