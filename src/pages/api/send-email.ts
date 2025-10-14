// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface ContactFormBody {
  name: string;
  email: string;
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
    const { name, email, message }: ContactFormBody = req.body;

    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new SendEmailCommand({
      Source: process.env.SES_SOURCE_EMAIL!, // Verified sender
      Destination: {
        ToAddresses: [
          process.env.EMAIL_TO!, // Your inbox
          email, // Send a copy to the user
        ],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `New message from ${name}` },
        Body: {
          Html: {
            Data: `
              <h2>Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
          },
        },
      },
    });

    await sesClient.send(command);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to send email' });
  }
}
