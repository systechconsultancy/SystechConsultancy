import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminUser from "../models/AdminUser.js";

dotenv.config();

const seedAdminUser = async () => {
  let connection;
  try {
    connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const adminEmail = "vignesh@gmail.com"; // Use a single variable for the email

    const existing = await AdminUser.findOne({ email: adminEmail });
    if (existing) {
      console.log("⚠️ Admin user already exists.");
      return; // No need to exit here, finally block will run
    }

    const user = new AdminUser({
      name: "vignesh",
      email: adminEmail,
      password: "Admin@123",
      role: "superadmin",
    });

    await user.save();
    console.log("✅ Superadmin created successfully");
    
  } catch (error) {
    console.error("❌ Failed to create admin user:", error);
    process.exit(1); // Exit with error only if something fails
  } finally {
    // Ensure the database connection is always closed
    if (connection) {
      await mongoose.disconnect();
      console.log("🔌 MongoDB Disconnected");
    }
    process.exit(0); // Exit successfully
  }
};

seedAdminUser();