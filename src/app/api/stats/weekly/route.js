import { getToken } from "next-auth/jwt";
import ClearRecords from "@/models/ClearRecord";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const records = await ClearRecords.find({
      user: token.sub,
      created: { $gte: sevenDaysAgo },
    })
      .populate("mood", "mood type")
      .lean();

    const formattedRecords = records.map((record) => ({
      id: record._id.toString(),
      created: record.created,
      type: record.mood.type,
      mood: record.mood.mood,
    }));

    return NextResponse.json(formattedRecords);
  } catch (error) {
    console.error("Error in weekly API:", error);
    return NextResponse.json(
      { error: "Failed to fetch weekly moods" },
      { status: 500 }
    );
  }
}
