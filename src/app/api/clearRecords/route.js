import ClearRecords from "@/models/ClearRecord";
import Stats from "@/models/Stats";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, mood, comment } = body;

    if (!user || !mood) {
      return Response.json(
        { error: "User ID and mood are required" },
        { status: 400 }
      );
    }

    // Create the clear record
    const clearRecord = new ClearRecords({
      user,
      mood,
      comment: comment || "",
    });
    await clearRecord.save();

    // Update user's clearRecords array
    await User.findByIdAndUpdate(
      user,
      {
        $push: { clearRecords: clearRecord._id },
      },
      { new: true }
    );

    // Update stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Stats.findOneAndUpdate(
      {
        day: today,
        mood: mood,
      },
      {
        $inc: { count: 1 },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return Response.json(clearRecord, { status: 201 });
  } catch (error) {
    console.error("Error creating record:", error);
    return Response.json({ error: "Failed to create record" }, { status: 500 });
  }
}
