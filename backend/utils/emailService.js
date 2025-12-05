import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// existing welcome mail
export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to RealShop!",
      text: `Hi ${name},\n\nThank you for signing up with RealShop! You can now browse products, place orders, and enjoy smooth shopping.\n\nBest regards,\nRealShop Team`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

// NEW: send order completed email
export const sendOrderCompletedEmail = async (email, name, order) => {
  try {
    const itemLines = order.items
      .map(
        (it) =>
          `• ${it.productId?.name || "Product"} — Qty: ${it.quantity}`
      )
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your order ${order._id} is completed`,
      text: `Hi ${name || "Customer"},\n\nGood news — your order (${order._id}) has been marked as COMPLETE.\n\nItems:\n${itemLines}\n\nIf you have any questions, reply to this email.\n\nThank you for shopping with RealShop!\n\nBest,\nRealShop Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order completed email sent to ${email} for order ${order._id}`);
  } catch (error) {
    console.error("Order completed email failed:", error.message);
  }
};
