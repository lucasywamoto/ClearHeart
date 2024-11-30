"use client";
import React, { useEffect, useState } from "react";
import MostFrequentMood from "@/components/MostFrequentMood";
import UserMoodChart from "@/components/UserMoodChart";
import SharedMood from "@/components/SharedMood";
import Feed from "@/components/Feed";
import Image from "next/image";
import LogoutBtn from "@/components/LogoutBtn";
import Spinner from "./Spinner";
import SpectrumPercentages from "./SpectrumPercentages";

export default function RightPanel({
  todayMood,
  todayMoodType,
  hasSubmittedToday,
}) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const statsResponse = await fetch("/api/stats", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch stats");
        }
        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hasSubmittedToday]);

  if (isLoading) {
    return (
      <div className="container r-panel p-4 px-10 rounded-3 m-0 d-flex justify-content-center align-items-center">
        <Spinner color={"light"} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container r-panel p-4 px-10 rounded-3 m-0 d-flex justify-content-center align-items-center">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container r-panel p-4 pb-1 px-10 rounded-3 m-0">
      <div className="panel-grid">
        <MostFrequentMood stats={stats} />
        <UserMoodChart />
        <Feed />
        <SharedMood
          todayMood={todayMood}
          todayMoodType={todayMoodType}
          stats={stats}
        />
        <SpectrumPercentages stats={stats} />
      </div>
      <div className="d-flex w-100 gap-3 justify-content-center align-items-center mt-2">
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
