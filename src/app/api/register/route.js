import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import { connectDB } from "@/utils/db";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { name, email, password } = await request.json();
    console.log("Received data:", { name, email, password });

    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      avatar: `https://avatar.iran.liara.run/public/${
        Math.floor(Math.random() * 100) + 1
      }`,
    };

    console.log("Attempting to create user with data:", newUser);

    const createdUser = await createUser(newUser);
    console.log("Created user:", createdUser);

    return NextResponse.json(
      { message: "User has been registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Error creating user" },
      { status: 500 }
    );
  }
};
