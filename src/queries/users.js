import User from "@/models/User";

export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    console.error("Error in createUser query:", error);
    throw error;
  }
};
