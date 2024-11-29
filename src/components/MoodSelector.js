import { useState } from "react";
import { getColor } from "@/utils/helpers";

export default function MoodSelector({
  moods,
  setSelectedMood,
  hasSubmittedToday,
}) {
  const [search, setSearch] = useState("");

  const filteredMoods = moods.filter((mood) =>
    mood.mood.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (e) => {
    if (hasSubmittedToday) return;
    const mood = JSON.parse(e.target.dataset.mood);
    setSelectedMood(mood);
    setSearch("");
  };

  return (
    <div id="initial-view">
      <h4 className="fw-light mb-3">
        How are you
        <br />
        feeling today?
      </h4>
      <input
        type="search"
        className="form-control mb-2"
        id="search-input"
        placeholder="Search..."
        aria-label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div id="mood-buttons">
        {filteredMoods.map((mood) => {
          const color = getColor(mood.type);
          return (
            <a
              key={mood._id}
              className="badge rounded-pill py-1 px-2 mb-1 me-1 mood-button fw-regular"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={mood.mood}
              data-mood={JSON.stringify(mood)}
              onClick={handleClick}
              style={{
                backgroundColor: color,
                textDecoration: "none",
              }}
            >
              {mood.mood}
            </a>
          );
        })}
      </div>
    </div>
  );
}
