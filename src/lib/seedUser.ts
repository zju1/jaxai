import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models";

const MONGODB_URI =
  "mongodb+srv://azamat:6CatKLjkZScRLdon@cluster0.5lnp8gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const seedAdminUser = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    const hashedPassword = await bcrypt.hash("12345", 10); // Hash the password

    const adminUser = new User({
      fullName: "Ilalov Xudayar",
      phoneNumber: "+998913021067",
      password: hashedPassword,
      address: "Nukus, Karakalpakstan",
      accountNumber: Math.floor(Math.random() * 1000000),
      role: "user",
    });

    await adminUser.save();
    console.log("Basic user created successfully.");
  } catch (error) {
    console.error("Error seeding basic user:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdminUser();
