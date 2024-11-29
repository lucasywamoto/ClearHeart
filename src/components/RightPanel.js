"use client";
import React, { useEffect, useState } from "react";
import MostFrequentMood from "@/components/MostFrequentMood";
import UserMoodChart from "@/components/UserMoodChart";
import SharedMood from "@/components/SharedMood";
import Feed from "@/components/Feed";

const RightPanel = () => {
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
  }, []);

  const getDayMood = (daysAgo) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);

    const mood = userMoods.find((mood) => {
      const moodDate = new Date(mood.created);
      return moodDate.toDateString() === targetDate.toDateString();
    });

    return mood;
  };

  return (
    <div className="container r-panel p-4 px-10 rounded-3 m-0">
      <MostFrequentMood stats={stats} />
      <UserMoodChart getDayMood={getDayMood} />
      <Feed />
      <SharedMood />
    </div>
  );
};

export default RightPanel;
