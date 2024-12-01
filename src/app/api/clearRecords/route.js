import ClearRecords from "@/models/ClearRecord";
import Stats from "@/models/Stats";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, mood, comment, timezone = "UTC" } = body;

    if (!user || !mood) {
      return Response.json(
        { error: "User ID and mood are required" },
        { status: 400 }
      );
    }

    const today = new Date();

    const dateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const currentTime = new Date();

    const clearRecord = new ClearRecords({
      user,
      mood,
      comment: comment || "",
      created: currentTime, //for feed
      dateCreated: dateOnly, // for last 7 days and stats
      timezone,
    });

    await clearRecord.save();

    await User.findByIdAndUpdate(
      user,
      { $push: { clearRecords: clearRecord._id } },
      { new: true }
    );

    await Stats.findOneAndUpdate(
      {
        day: dateOnly,
        mood: mood,
      },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    return Response.json(clearRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating record:", error);
    return Response.json({ error: "Failed to create record" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const today = new Date();
    const dateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const todayRecord = await ClearRecords.findOne({
      user: userId,
      dateCreated: dateOnly,
    });

    if (!todayRecord) {
      return Response.json({ error: "Record not found" }, { status: 404 });
    }

    await ClearRecords.findByIdAndDelete(todayRecord._id);

    await User.findByIdAndUpdate(userId, {
      $pull: { clearRecords: todayRecord._id },
    });

    await Stats.findOneAndUpdate(
      {
        day: dateOnly,
        mood: todayRecord.mood,
      },
      { $inc: { count: -1 } }
    );

    return Response.json(
      { message: "Record deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting record:", error);
    return Response.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
