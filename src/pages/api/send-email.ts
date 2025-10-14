// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface ContactFormBody {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Data = { success: boolean; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message }: ContactFormBody = req.body;

    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    // HTML email template with phone
    const htmlTemplate = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <img src="https://www.btakestay.com/BTAKELOGO.jpg" alt="Logo" width="120" style="display:block;"/>
            </td>
          </tr>
          <tr>
            <td>
              <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
                <tr>
                  <td>
                    <h2 style="color:#333;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                    <hr style="margin:20px 0;"/>
                    <p style="color:#555; font-size:12px;">Thank you for reaching out. We'll get back to you soon.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; font-size:12px; color:#999;">
              &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    const command = new SendEmailCommand({
      Source: process.env.SES_SOURCE_EMAIL!,
      Destination: {
        ToAddresses: [
          process.env.EMAIL_TO!, // your inbox
          email,                 // send a copy to user
        ],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `New message from ${name}` },
        Body: {
          Html: { Data: htmlTemplate },
        },
      },
    });

    await sesClient.send(command);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
