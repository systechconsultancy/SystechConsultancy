import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html, fromName = "Systech Consultancy" }) => {
  const mailOptions = {
    from: `"${fromName}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};