"use client";
import React, { useEffect, useState } from "react";
import MoodSelector from "@/components/MoodSelector";
import SendRecordForm from "@/components/SendRecordForm";
import Spinner from "./Spinner";
import SpectrumLabel from "./SpectrumLabel";
import Profile from "./Profile";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LeftPanel({
  hasSubmittedToday,
  setHasSubmittedToday,
  isLoading,
  selectedMood,
  setSelectedMood,
}) {
  const { data: session } = useSession();
  const [moods, setMoods] = useState([]);

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
                <div
                  id="already-submitted"
                  className="d-flex flex-column align-items-center justify-content-center h-100"
                >
                  <h4 className="fw-light text-center mb-3">
                    You&apos;ve already shared
                    <br />
                    your mood today!
                  </h4>
                  <Image
                    src="/love.gif"
                    width={100}
                    height={100}
                    alt="heart"
                    unoptimized
                  />
                  <p className="text-muted text-center">
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
