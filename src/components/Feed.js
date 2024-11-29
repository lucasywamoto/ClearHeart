import React, { useState, useEffect } from "react";
import { getColor } from "@/utils/helpers";

export default function Feed() {
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoading && recent.length === 0) {
    return <div>No recent records found.</div>;
  }

  return (
    <div style={{ gridRowStart: 1, gridRowEnd: 5, gridColumnStart: 3 }}>
      {recent.map((record) => (
        <div
          key={record._id}
          className="rounded bubble"
          style={{
            backgroundColor: getColor(record.type),
          }}
        >
          <p className="mb-2">
            {record.userName} is {record.mood}
          </p>
          <div
            style={{ width: "100%", height: 1, background: "white" }}
            className="mb-2"
          ></div>
          <h4>{record.comment}</h4>
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
