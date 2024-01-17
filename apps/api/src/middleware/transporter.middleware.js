import nodmailer from 'nodemailer';

const transporter = nodmailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: { rejectUnauthorized: false },
});
export { transporter };
