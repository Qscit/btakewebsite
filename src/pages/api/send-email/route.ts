import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

// Define request body type
interface ContactFormBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {

    const body: ContactFormBody = await req.json();

    const { name, email, message } = body;

    // Configure AWS SES
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const ses = new AWS.SES();

    const params: AWS.SES.SendEmailRequest = {
      Source: process.env.EMAIL_TO!,
      Destination: {
        ToAddresses: [process.env.EMAIL_TO!],
      },
      Message: {
        Subject: { Data: `New message from ${name}` },
        Body: {
          Html: {
            Data: `
              <h3>Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong> ${message}</p>
            `,
          },
        },
      },
    };

    await ses.sendEmail(params).promise();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
