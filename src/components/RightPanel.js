"use client";
import React, { useEffect, useState } from "react";
import MostFrequentMood from "@/components/MostFrequentMood";
import UserMoodChart from "@/components/UserMoodChart";
import SharedMood from "@/components/SharedMood";
import Feed from "@/components/Feed";
import Image from "next/image";
import LogoutBtn from "@/components/LogoutBtn";
import Spinner from "./Spinner";

export default function RightPanel({ todayMood, hasSubmittedToday }) {
  const [stats, setStats] = useState(null);
  const [userMoods, setUserMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const statsResponse = await fetch("/api/stats");
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch stats");
        }
        const statsData = await statsResponse.json();
        setStats(statsData);

        console.log("Received stats data:", statsData);

        const moodsResponse = await fetch("/api/stats/weekly", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!moodsResponse.ok) {
          const errorData = await moodsResponse.json();
          throw new Error(errorData.error || "Failed to fetch user moods");
        }

        const moodsData = await moodsResponse.json();
        console.log("Received moods data:", moodsData);
        setUserMoods(moodsData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hasSubmittedToday]);

  const getDayMood = (daysAgo) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);

    const mood = userMoods.find((mood) => {
      const moodDate = new Date(mood.created);
      return moodDate.toDateString() === targetDate.toDateString();
    });

    return mood;
  };

  if (isLoading) {
    return (
      <div className="container r-panel p-4 px-10 rounded-3 m-0 d-flex justify-content-center align-items-center">
        <Spinner color={"light"} />
      </div>
    );
  }

  return (
    <div className="container r-panel p-4 px-10 rounded-3 m-0">
      <div className="panel-grid">
        <MostFrequentMood stats={stats} />
        <UserMoodChart getDayMood={getDayMood} />
        <Feed />
        <SharedMood stats={stats} todayMood={todayMood} />
      </div>
      <div className="d-flex w-100 gap-3 justify-content-center align-items-center">
        <Image src="/logo-white.svg" alt="Logo" width={120} height={60} />
        <div
          style={{
            width: 1,
            height: 40,
            background: "#6c757d",
            marginTop: "8px",
          }}
          className="mb-2"
        ></div>
        <LogoutBtn />
      </div>
    </div>
  );
}
