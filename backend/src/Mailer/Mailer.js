import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

const sendReminderEmail = async (email, bookTitle, dueDate, bookImage) => {
  console.log(email, bookTitle, dueDate, bookImage);

  try {
    await transporter.sendMail({
      from: `"Library Management System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Reminder: Return "${bookTitle}" by ${dueDate}`,
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 10px;">
        
        <div style="background-color: #003366; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0;">📚 Library Due Date Reminder</h2>
        </div>
        
        <div style="padding: 20px; background-color: white;">
          <p style="font-size: 16px; color: #333;">Dear Reader,</p>

          <p style="font-size: 16px; color: #555;">
            This is a reminder that your borrowed book <strong>"${bookTitle}"</strong> is due on <strong>${dueDate}</strong>. 
            Please return or renew it on time to avoid late fees.
          </p>

          <div style="text-align: center; margin-top: 15px;">
            <img src="${bookImage}" alt="Book Cover" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="https://your-library-website.com" style="text-decoration: none; padding: 12px 20px; background-color: #003366; color: white; border-radius: 5px; font-size: 16px;">
              Visit Library
            </a>
          </div>
          
          <p style="font-size: 16px; color: #555; margin-top: 20px;">
            Thank you,<br>
            <strong>Library Management Team</strong>
          </p>
        </div>

        <div style="background-color: #003366; color: white; padding: 10px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Library Management System. All Rights Reserved.</p>
        </div>

      </div>
      `,
    });
    console.log(`Reminder email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendReminderEmail;
