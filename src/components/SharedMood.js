"use client";
import { getColor } from "@/utils/helpers";
import { useEffect, useState } from "react";

//component to display the shared mood of the user
export default function SharedMood({
  todayMood,
  todayMoodType,
  stats,
  isLoading,
}) {
  const [sameMoodCount, setSameMoodCount] = useState(0);

  //update the sameMoodCount state when the stats data is fetched
  useEffect(() => {
    if (!stats || isLoading) return;

    const updateStats = () => {
      const sameMoodStat = stats?.find((stat) => stat.mood === todayMood);
      setSameMoodCount(sameMoodStat ? sameMoodStat.count : 0);
    };

    updateStats();
  }, [todayMood, stats, isLoading]);

  if (todayMood) {
    return (
      <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
        <h4>You are {todayMood?.toLowerCase()}.</h4>
        {sameMoodCount < 2 ? (
          <>
            <h4
              style={{
                color: getColor(todayMoodType),
              }}
            >
              You&apos;re the first to share this mood today.
            </h4>
            <h5 className="fw-light">
              Comeback later to see how many others feel the same way.
            </h5>
          </>
        ) : (
          <>
            <h3
              style={{
                color: getColor(todayMoodType),
              }}
            >
              You are not alone :)
            </h3>
            <h4 className="fw-light">
              {sameMoodCount} people are feeling the same way you do.
            </h4>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
      <h3>
        Share your feelings today to
        <br />
        synchronize with others.
      </h3>
    </div>
  );
}
