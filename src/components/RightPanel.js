"use client";
import React, { useEffect, useState } from "react";
import MostFrequentMood from "@/components/MostFrequentMood";
import UserMoodChart from "@/components/UserMoodChart";
import SharedMood from "@/components/SharedMood";
import Feed from "@/components/Feed";
import Image from "next/image";
import LogoutBtn from "@/components/LogoutBtn";
import SpectrumPercentages from "./SpectrumPercentages";

//component to render the right panel of the dashboard
export default function RightPanel({
  todayMood,
  todayMoodType,
  hasSubmittedToday,
}) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(30);

  //fetch the stats data and update every 30 seconds, stats will be used in child components to display data on the dashboard
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
        setSeconds(30);

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    // interval to fetch data every 30 seconds
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          fetchData();
          return 30;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [hasSubmittedToday]);

  const sharedMoodProps = {
    todayMood,
    todayMoodType,
    stats,
    isLoading,
  };

  return (
    <div className="container r-panel p-4 pb-1 px-10 rounded-3 m-0">
      {isLoading ? (
        <div
          className="panel-grid"
          style={{ gridTemplateRows: "1fr", gridTemplateColumns: "1fr" }}
        >
          <h2 style={{ alignSelf: "center", justifySelf: "center" }}>
            Syncing
          </h2>
        </div>
      ) : (
        <div className="panel-grid" style={{ overflow: "auto" }}>
          <MostFrequentMood stats={stats} />
          <UserMoodChart />
          <Feed />
          <SharedMood {...sharedMoodProps} />
          <SpectrumPercentages stats={stats} />
        </div>
      )}
      <div className="d-flex w-100 align-items-center justify-content-between">
        {!isLoading ? (
          <p style={{ color: "white" }} className="mb-0">
            Next syncing in {seconds}
          </p>
        ) : (
          <div></div>
        )}
        <div className="d-flex gap-3 justify-content-center align-items-center mt-2">
          <Image src="/logo-white.svg" alt="Logo" width={120} height={60} />
          <div
            style={{
              width: 1,
              height: 40,
              background: "white",
              marginTop: "8px",
            }}
            className="mb-2"
          ></div>
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}
