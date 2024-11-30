import { useState } from "react";
import { getColor } from "@/utils/helpers";

export default function SendRecordForm({
  session,
  selectedMood,
  setSelectedMood,
  hasSubmittedToday,
  setHasSubmittedToday,
  setTodayMood,
  setTodayMoodType,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || hasSubmittedToday || !session?.user?.id) return;

    const comment = e.target.comment.value;
    const mood = selectedMood?._id;
    const user = session.user.id;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/clearRecords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          mood,
          comment: comment || "",
          timezone,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit record");
      }

      setSelectedMood(null);
      setHasSubmittedToday(true);
      setTodayMood(selectedMood.mood);
      e.target.comment.value = "";

      const todayResponse = await fetch("/api/clearRecords/today");
      const todayData = await todayResponse.json();
      if (todayData.todayUserMoodType) {
        setTodayMoodType(todayData.todayUserMoodType);
      }
    } catch (error) {
      console.error("Error submitting record:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="initial-view">
      <div id="selected-mood-view">
        <div id="selected-mood-container"></div>
        <h4 id="selected-mood-text" className="mb-0 fw-light">
          You are
        </h4>
        <h2
          style={{
            fontSize: "38px",
            fontWeight: "bold",
            margin: 0,
            color: getColor(selectedMood?.type),
          }}
        >
          {selectedMood.mood}
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mt-4"
            name="comment"
            id="comment"
            placeholder="Add comment"
            rows="8"
            style={{ resize: "none" }}
            disabled={isSubmitting}
          ></textarea>
          <button
            type="button"
            id="back-button"
            className="btn btn-outline-secondary mt-4"
            onClick={() => setSelectedMood(null)}
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            id="submit-button"
            className="btn mt-4 ms-2"
            disabled={isSubmitting}
            style={{
              background: getColor(selectedMood?.type),
              color: "white",
              fontWeight: "bold",
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            {isSubmitting ? "Submitting..." : "Clear 🤍 Heart"}
          </button>
        </form>
      </div>
    </div>
  );
}
