import { User } from "@/models/User";

export async function createUser(user) {
  try {
    await User.create(user);
  } catch (error) {
    throw new Error(error);
  }
}
