const nodemailer = require('nodemailer');
require("dotenv").config();

async function sendEmail(to, title, body) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER, 
      to: to,
      subject: title,
      text: body
    };

    const info = await transporter.sendMail(mailOptions);

    return info.response;

  } catch (error) {
    console.error('Error sending email:', error);
    return error;
  }
}

module.exports = sendEmail;