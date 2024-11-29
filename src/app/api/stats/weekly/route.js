import { getServerSession } from "next-auth/next";
import authConfig from "@/auth";
import ClearRecords from "@/models/ClearRecord";

export async function GET(req) {
  try {
    const session = await getServerSession(authConfig);
    console.log("Full session data:", session);

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the token data which should contain the ID
    const userId = session.user.id;
    console.log("User ID from session:", userId);

    if (!userId) {
      console.log("Session user data:", session.user);
      return Response.json({ error: "No user ID in session" }, { status: 401 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const records = await ClearRecords.find({
      user: userId,
      created: { $gte: sevenDaysAgo },
    })
      .populate("mood", "mood type")
      .lean();

    const formattedRecords = records.map((record) => ({
      _id: record._id.toString(),
      created: record.created,
      type: record.mood.type,
      mood: record.mood.mood,
    }));

    return Response.json(formattedRecords);
  } catch (error) {
    console.error("Error in weekly API:", error);
    return Response.json(
      { error: "Failed to fetch weekly moods", details: error.message },
      { status: 500 }
    );
  }
}
