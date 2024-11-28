import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import { connectDB } from "@/utils/db";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  console.log({ name, email, password });

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    await createUser(newUser);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return new NextResponse("User has been registered", { status: 201 });
};
