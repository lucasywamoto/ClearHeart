import ClearRecord from "@/models/ClearRecord"; // Adjust the import path as needed
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import path

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { userId, moodId, comment } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!moodId) {
      return new Response(JSON.stringify({ error: "Mood is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const clearRecord = new ClearRecord({
      userId,
      moodId,
      comment: comment || "",
    });

    await clearRecord.save();

    return new Response(JSON.stringify(clearRecord), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/clearRecords:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
