"use client";
import React, { useEffect, useState } from "react";
import MoodSelector from "@/components/MoodSelector";
import SendRecordForm from "@/components/SendRecordForm";
import Spinner from "./Spinner";
import SpectrumLabel from "./SpectrumLabel";
import Profile from "./Profile";
import { useSession } from "next-auth/react";
import HasSubmitted from "./HasSubmitted";

//Component to render the left panel of the dashboard
export default function LeftPanel({
  hasSubmittedToday,
  setHasSubmittedToday,
  isLoading,
  selectedMood,
  setSelectedMood,
  setTodayMood,
  setTodayMoodType,
}) {
  //get the user session to display the user profile (name and avatar)
  const { data: session } = useSession();

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
                <HasSubmitted />
              ) : selectedMood?.mood == null ? (
                <MoodSelector setSelectedMood={setSelectedMood} />
              ) : (
                <SendRecordForm
                  selectedMood={selectedMood}
                  setSelectedMood={setSelectedMood}
                  setHasSubmittedToday={setHasSubmittedToday}
                  hasSubmittedToday={hasSubmittedToday}
                  session={session}
                  setTodayMood={setTodayMood}
                  setTodayMoodType={setTodayMoodType}
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
