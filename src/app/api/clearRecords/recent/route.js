import { getToken } from "next-auth/jwt";
import ClearRecords from "@/models/ClearRecord";

export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token?.sub) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const records = await ClearRecords.find({})
      .sort({ created: -1 })
      .limit(10)
      .populate("mood", "mood type")
      .populate("user", "name")
      .lean();

    const formattedRecords = records.map((record) => ({
      _id: record._id.toString(),
      created: record.created,
      comment: record.comment,
      type: record.mood.type,
      mood: record.mood.mood,
      userName: record.user?.name?.split(" ")[0],
    }));

    return Response.json(formattedRecords);
  } catch (error) {
    console.error("Error fetching recent records:", error);
    return Response.json(
      { error: "Failed to fetch recent records", details: error.message },
      { status: 500 }
    );
  }
}
