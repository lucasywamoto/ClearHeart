"use client";
import React, { useEffect, useState } from "react";
import { getColor } from "@/utils/helpers";
import Image from "next/image";

export default function LeftPanel({ session }) {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch("/api/moods");
        if (!response.ok) {
          throw new Error("Failed to fetch moods");
        }
        const moodsData = await response.json();
        setMoods(moodsData);
      } catch (error) {
        console.error("Error fetching moods:", error.message);
      }
    };
    fetchMoods();
  }, []);

  const filteredMoods = moods.filter((mood) =>
    mood.mood.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const comment = e.target.comment.value;
    const mood = selectedMood?._id;
    const user = session?.user?.id;
    console.log({ mood, user, comment });

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/clearRecord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          mood,
          comment: comment || "",
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseData.details || responseData.error || "Failed to submit mood";
        throw new Error(errorMessage);
      }

      setSelectedMood(null);
      e.target.comment.value = "";
    } catch (error) {
      console.error("Error submitting mood:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = (e) => {
    const mood = JSON.parse(e.target.dataset.mood);
    setSelectedMood(mood);
    setSearch(""); // Clear search when a mood is selected
  };

  return (
    <div className="container panel l-panel w-25 p-4 px-10 rounded-3 m-0">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h4 className="fw-light mb-0">Hello,</h4>
          <h2>{session?.user?.name?.split(" ")[0]}!</h2>
        </div>
        <Image
          src={
            session?.user?.image || "https://avatar.iran.liara.run/public/43"
          }
          className="rounded-circle avatar"
          alt="Avatar"
          width="60"
          height="60"
        />
      </div>
      <hr className="my-4" />
      <div id="mood-form-container">
        <div className="subdiv">
          {selectedMood?.mood == null ? (
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
                {filteredMoods.length > 0
                  ? filteredMoods.map((mood) => {
                      const color = getColor(mood.type);
                      return (
                        <a
                          key={mood._id}
                          className="badge rounded-pill py-1 px-2 mb-1 me-1 mood-button fw-regular"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={mood.mood}
                          data-mood={JSON.stringify(mood)} // Store the entire mood object
                          onClick={handleClick}
                          style={{
                            backgroundColor: color,
                            textDecoration: "none",
                          }}
                        >
                          {mood.mood}
                        </a>
                      );
                    })
                  : ""}
              </div>
            </div>
          ) : (
            <div id="initial-view">
              <div id="selected-mood-view">
                <div id="selected-mood-container"></div>
                <h4 id="selected-mood-text" className="mb-0 fw-light">
                  You are
                </h4>
                <h2
                  style={{
                    fontSize: "42px",
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
          )}
          <div id="spectrum-label">
            <hr />
            <div>
              <p className="mb-2">Positive</p>
              <p className="mb-2">Neutral</p>
              <p className="mb-2">Negative</p>
            </div>
            <div id="spectrum-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
