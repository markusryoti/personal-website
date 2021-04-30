import nodemailer from 'nodemailer';
import { google } from 'googleapis';

import dotenv from 'dotenv';
import Mail from 'nodemailer/lib/mailer';
dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
  EMAIL_ADDRESS,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export async function sendMail(from: string, subject: string, text: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_ADDRESS as string,
        clientId: GOOGLE_CLIENT_ID as string,
        clientSecret: GOOGLE_CLIENT_SECRET as string,
        refreshToken: GOOGLE_REFRESH_TOKEN as string,
        accessToken: accessToken as string,
      },
    });

    const mailOptions: Mail.Options = {
      from: from,
      to: EMAIL_ADDRESS,
      replyTo: from,
      subject: subject,
      text: text,
      html: textToHtml(from, subject, text),
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw error;
  }
}

function textToHtml(sender: string, subject: string, body: string) {
  return `
    <h2>${subject}</h2>
    <h4>From: ${sender}</h4>
    ${body
      .split('\n')
      .map(paragraph => (paragraph ? `<p>${paragraph}</p>` : '<p></p>'))
      .join('\n')}
  `;
}
