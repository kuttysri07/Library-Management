import cron from "node-cron";
import sendReminderEmail from "./Mailer.js";
import { authMOdel } from "../schema/authSchema.js";

// Run every day at 9 AM
const cronjob = cron.schedule("0 9 * * *", async () => {
  try {
    console.log("Checking for due date reminders...");

    const today = new Date();
    const users = await authMOdel.find({
      "borrowedBooks.dueDate": { $exists: true },
    });

    users.forEach((user) => {
      user.borrowedBooks.forEach((book) => {
        const dueDate = new Date(book.dueDate);
        const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
       
        if (daysLeft === 2) {
          sendReminderEmail(user.email, book.title, dueDate.toDateString() , book.imageLink);
        }
      });
    });

    console.log("Reminder emails sent.");
  } catch (error) {
    console.error("Error in scheduled job:", error);
  }
});

export default cronjob;
