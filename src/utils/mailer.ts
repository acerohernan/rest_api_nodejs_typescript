import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "./logger";

//Function to check smtp credentials

/* async function createTestCreds() {
  const creds = await nodemailer.createTestAccount();
  console.log({ creds });
}

createTestCreds(); */

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const tranporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendEmail(payload: SendMailOptions) {
  tranporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, "Error sending email");
      return;
    }

    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
