import React, { useState, useEffect } from "react";
import { getColor } from "@/utils/helpers";

//Feed component to display recent records of everyone's mood with comments
export default function Feed() {
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const recentResponse = await fetch("/api/clearRecords/recent");
        if (!recentResponse.ok) {
          throw new Error("Failed to fetch recent records");
        }
        const recentData = await recentResponse.json();
        setRecent(recentData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ gridRowStart: 1, gridRowEnd: 5, gridColumnStart: 3 }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div
      style={{ gridRowStart: 1, gridRowEnd: 4, gridColumnStart: 3 }}
      className="feed"
    >
      {recent.map((record) => (
        <div
          key={record._id}
          className="rounded bubble mb-3"
          style={{
            backgroundColor: getColor(record.type),
          }}
        >
          <p className="mb-2">
            {record.userName} is {record.mood.toLowerCase()}
          </p>
          <div
            style={{ width: "100%", height: 1, background: "white" }}
            className="mb-2"
          ></div>
          <h5>{record.comment}</h5>
          <p style={{ fontSize: 10, marginBottom: 0 + " !important" }}>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(new Date(record.created))}
          </p>{" "}
        </div>
      ))}
    </div>
  );
}
