import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Administrator";

  if (!email || !password) {
    console.log("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    { name, email, password: hashed, role: "Admin" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Admin ready: ${email}`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
