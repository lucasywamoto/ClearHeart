import Stats from "@/models/Stats";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get("date");

    const queryDate = dateParam ? new Date(dateParam) : new Date();
    // Set to start of day
    queryDate.setHours(0, 0, 0, 0);

    const stats = await Stats.aggregate([
      {
        $match: {
          day: queryDate,
        },
      },
      {
        $group: {
          _id: "$mood",
          totalCount: { $sum: "$count" },
        },
      },
      {
        $lookup: {
          from: "moods",
          localField: "_id",
          foreignField: "_id",
          as: "moodInfo",
        },
      },
      {
        $unwind: "$moodInfo",
      },
      {
        $project: {
          mood: "$moodInfo.mood",
          type: "$moodInfo.type",
          count: "$totalCount",
        },
      },
    ]);

    return Response.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
