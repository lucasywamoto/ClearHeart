"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { getSession } from "next-auth/react";
import Spinner from "@/components/Spinner";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [todayMood, setTodayMood] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [error, setError] = useState("");

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
        setHasSubmittedToday(data.hasSubmitted);
        setTodayMood([data["todayUserMood"], data["todayUserMoodType"]]);
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
    const init = async () => {
      try {
        const sessionData = await getSession();

        if (!sessionData) {
          redirect("/login");
        } else {
          setSession(sessionData);
        }
      } catch (err) {
        console.error("Error in Dashboard:", err);
        setError(err.message || "An unexpected error occurred.");
      }
    };

    init();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!session) {
    return <Spinner color={"light"} />;
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
      <RightPanel todayMood={todayMood} hasSubmittedToday={hasSubmittedToday} />
    </div>
  );
};

export default Dashboard;
