import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import ClearRecords from "@/models/ClearRecord";

//route to check if user has already submitted today's mood
export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecord = await ClearRecords.findOne({
      user: token.sub,
      created: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    }).populate("mood", "mood type");

    return NextResponse.json({
      hasSubmitted: !!todayRecord,
      todayUserMood: todayRecord?.mood?.mood || null,
      todayUserMoodType: todayRecord?.mood?.type || null,
    });
  } catch (error) {
    console.error("Error checking today's submission:", error);
    return NextResponse.json(
      { error: "Failed to check today's submission" },
      { status: 500 }
    );
  }
}
