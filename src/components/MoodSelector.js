import { useState, useEffect, useRef } from "react";
import { getColor } from "@/utils/helpers";

export default function MoodSelector({ setSelectedMood, hasSubmittedToday }) {
  const [moods, setMoods] = useState([]);
  const [search, setSearch] = useState("");
  const tooltipInitialized = useRef(false);

  //fetch moods from the API when the component mounts
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch("/api/moods");
        if (!response.ok) throw new Error("Failed to fetch moods");
        const moodsData = await response.json();
        setMoods(moodsData);
      } catch (error) {
        console.error("Error fetching moods:", error.message);
      }
    };

    fetchMoods();
  }, []);

  useEffect(() => {
    // initialize bootstrap tooltips after moods are loaded
    if (
      !tooltipInitialized.current &&
      moods.length > 0 &&
      typeof bootstrap !== "undefined"
    ) {
      const tooltipElements = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );
      tooltipElements.forEach((element) => new bootstrap.Tooltip(element));
      tooltipInitialized.current = true;
    }
  }, [moods]);

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
            <span
              key={mood._id}
              className="badge rounded-pill py-1 px-2 mb-1 me-1 mood-button fw-regular"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title={mood.tooltip}
              title={mood.mood}
              data-mood={JSON.stringify(mood)}
              onClick={handleClick}
              style={{
                backgroundColor: color,
                textDecoration: "none",
                cursor: hasSubmittedToday ? "not-allowed" : "pointer",
                opacity: hasSubmittedToday ? 0.6 : 1,
              }}
            >
              {mood.mood}
            </span>
          );
        })}
      </div>
    </div>
  );
}
