import { createTransport } from "nodemailer";

const { EMAIL_PASSWORD } = process.env;

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "tillman81@ethereal.email",
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (
  to: string | string[],
  subject: string,
  message: string
) => {
  try {
    await transporter.sendMail({
      to,
      subject,
      text: message,
      from: "sarang.kulkarni99@gmail.com",
    });

    return true;
  } catch (e) {
    throw e;
  }
};
