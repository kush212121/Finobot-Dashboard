import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendMail = async (sender, receiver, orgId) => {
  await transporter.sendMail({
    from: sender,
    to: receiver,
    subject: "Welcome to Finnobot!",
    html: `
    <h2>Greetings From Fintract</h2>
    
    <h3>Click on the link below to set your password</h3>
    
    <a href="${
      process.env.FINNOBOARD_URL || "https://finnoboard.londonscg.co.uk"
    }/set-pass/${orgId}">
    ${
      process.env.FINNOBOARD_URL || "https://finnoboard.londonscg.co.uk"
    }/set-pass/${orgId}
    </a>
    
    `,
  });

  console.log("Mail sent!!");
};

export default sendMail;
