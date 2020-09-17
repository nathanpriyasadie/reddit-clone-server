import nodemailer from "nodemailer";
import { ETHEREAL_HOST, ETHEREAL_PORT } from "src/constants";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: ETHEREAL_HOST,
    port: ETHEREAL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.ETHEREAL_USERNAME, // generated ethereal user
      pass: process.env.ETHEREAL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "Change Password", // Subject line
    html,
  });
}
