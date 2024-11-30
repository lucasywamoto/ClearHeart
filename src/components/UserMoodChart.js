import { getColor } from "@/utils/helpers";
import { useEffect, useState } from "react";

export default function UserMoodChart() {
  const [userMoods, setUserMoods] = useState([]);

  useEffect(() => {
    const fetchUserMoods = async () => {
      const moodsResponse = await fetch("/api/stats/weekly", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!moodsResponse.ok) {
        throw new Error("Failed to fetch user moods");
      }
      const moodsData = await moodsResponse.json();
      setUserMoods(moodsData);
    };
    fetchUserMoods();
  }, []);

  const getDaySequence = () => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const today = new Date().getDay();
    const sequence = [];

    for (let i = 1; i <= 7; i++) {
      const index = (today + i) % 7;
      sequence.push(days[index]);
    }
    return sequence;
  };

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
    <div className="align-items-center">
      <h5 className="fw-light text-center mb-3">How you’ve felt recently</h5>
      <div className="d-flex justify-content-around gap-4">
        {getDaySequence().map((day, index) => {
          const mood = getDayMood(6 - index);
          return (
            <div
              key={index}
              className="d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <h6 className="m-0 fw-bold">{day}</h6>
              <div
                style={{
                  height: "12px",
                  width: "12px",
                  borderRadius: "6px",
                  backgroundColor: mood ? getColor(mood.type) : "#e5e5e5",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
