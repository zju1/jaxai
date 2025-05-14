import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models";

const MONGODB_URI =
  "mongodb+srv://azamat:6CatKLjkZScRLdon@cluster0.5lnp8gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const seedAdminUser = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("12345", 10); // Hash the password

    const adminUser = new User({
      fullName: "Azamat Jumabaev",
      phoneNumber: "+998990359354",
      password: hashedPassword,
      address: "Nukus, Karakalpakstan",
      accountNumber: Math.floor(Math.random() * 1000000),
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdminUser();
