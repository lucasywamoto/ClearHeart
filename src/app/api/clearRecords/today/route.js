import ClearRecords from "@/models/ClearRecord";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const todayRecord = await ClearRecords.findOne({
      user: userId,
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
          todayStr,
        ],
      },
    }).lean();

    return Response.json({
      hasSubmitted: !!todayRecord,
      recordId: todayRecord?._id?.toString(),
    });
  } catch (error) {
    console.error("Error checking today's record:", error);
    return Response.json(
      { error: "Failed to check today's record", details: error.message },
      { status: 500 }
    );
  }
}
