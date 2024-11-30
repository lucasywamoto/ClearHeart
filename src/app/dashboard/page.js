"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [todayMood, setTodayMood] = useState(null);
  const [todayMoodType, setTodayMoodType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkTodaySubmission = async () => {
      if (status !== "authenticated") return;

      setIsLoading(true);
      try {
        const response = await fetch("/api/clearRecords/today", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to check today's submission");
        }

        const data = await response.json();
        setHasSubmittedToday(data.hasSubmitted);
        setTodayMood(data.todayUserMood);
        setTodayMoodType(data.todayUserMoodType);

        if (data.hasSubmitted) {
          setSelectedMood(null);
        }
      } catch (error) {
        console.error("Error checking today's submission:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkTodaySubmission();
  }, [status]);

  if (status === "loading" || isLoading) {
    return <Spinner color="light" />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="index-container">
      <LeftPanel
        session={session}
        hasSubmittedToday={hasSubmittedToday}
        setHasSubmittedToday={setHasSubmittedToday}
        isLoading={isLoading}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
      />
      <RightPanel
        todayMood={todayMood}
        todayMoodType={todayMoodType}
        hasSubmittedToday={hasSubmittedToday}
      />
    </div>
  );
}
