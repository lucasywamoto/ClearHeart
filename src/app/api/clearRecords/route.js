import ClearRecords from "@/models/ClearRecord";

export async function POST(req) {
  try {
    const { user, mood, comment } = req.body;
    console.log(user);
    console.log(mood);
    console.log(comment);

    const clearRecord = new ClearRecords({ user, mood, comment });

    await clearRecord.save();

    return new Response(JSON.stringify(clearRecord), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating clear record:", err.message);
    return new Response(
      JSON.stringify({ error: "Failed to create clear record" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
