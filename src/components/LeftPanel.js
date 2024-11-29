"use client";
import React, { useEffect, useState } from "react";
import MoodSelector from "@/components/MoodSelector";
import SendRecordForm from "@/components/SendRecordForm";
import Spinner from "./Spinner";
import SpectrumLabel from "./SpectrumLabel";
import Profile from "./Profile";

export default function LeftPanel({ session }) {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkTodaySubmission = async () => {
      setIsLoading(true);
      if (!session?.user?.id) return;

      try {
        const response = await fetch(
          `/api/clearRecords/today?userId=${session.user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to check today's submission");
        }
        const data = await response.json();
        console.log("Today's submission check:", data);
        setHasSubmittedToday(data.hasSubmitted);
        if (data.hasSubmitted) {
          setSelectedMood(null);
        }
      } catch (error) {
        console.error("Error checking today's submission:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTodaySubmission();
  }, [session?.user?.id]);

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

  return (
    <div className="container panel l-panel w-25 p-4 px-10 rounded-3 m-0">
      <div className="d-flex align-items-center justify-content-between flex-column h-100">
        <Profile session={session} />
        {isLoading ? (
          <Spinner color={"dark"} />
        ) : (
          <div id="mood-form-container">
            <div className="subdiv">
              {hasSubmittedToday ? (
                <div id="already-submitted">
                  <h4 className="fw-light mb-3">
                    You&apos;ve already shared
                    <br />
                    your mood today!
                  </h4>
                  <p className="text-muted">
                    Come back tomorrow
                    <br />
                    to share again.
                  </p>
                </div>
              ) : selectedMood?.mood == null ? (
                <MoodSelector moods={moods} setSelectedMood={setSelectedMood} />
              ) : (
                <SendRecordForm
                  selectedMood={selectedMood}
                  setSelectedMood={setSelectedMood}
                  setHasSubmittedToday={setHasSubmittedToday}
                  hasSubmittedToday={hasSubmittedToday}
                  session={session}
                />
              )}
            </div>
          </div>
        )}
        <SpectrumLabel />
      </div>
    </div>
  );
}
