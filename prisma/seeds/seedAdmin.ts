require('dotenv').config();
import { prisma } from "@/database/client";

const bcrypt = require('bcrypt');

const seedAdmin = async () => {
    const adminPassword = process.env.ADMIN_PASSWORD; // Replace with the desired admin password

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 10); 

  // Create the admin user with the hashed password
  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@admin.com',
      passwordHash: hashedPassword,
      role: "admin", 
    },
  });


};

seedAdmin();