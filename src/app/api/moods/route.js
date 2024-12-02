import Mood from "@/models/Mood";

//route to fetch all moods to populate the mood selector component
export async function GET(req) {
  try {
    const moods = await Mood.find().lean();
    return new Response(JSON.stringify(moods), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching moods:", err.message);
    return new Response(JSON.stringify({ error: "Failed to fetch moods" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
