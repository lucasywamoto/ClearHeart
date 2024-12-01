"use client";
import { useMemo } from "react";
import { getColor } from "@/utils/helpers";

export default function SpectrumPercentages({ stats }) {
  const percentages = useMemo(() => {
    if (!stats?.length) return { positive: 0, neutral: 0, negative: 0 };

    const counts = stats.reduce((acc, stat) => {
      acc[stat.type.toLowerCase()] =
        (acc[stat.type.toLowerCase()] || 0) + stat.count;
      return acc;
    }, {});

    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return {
      positive: Math.round(((counts.positive || 0) / total) * 100),
      neutral: Math.round(((counts.neutral || 0) / total) * 100),
      negative: Math.round(((counts.negative || 0) / total) * 100),
    };
  }, [stats]);

  return (
    <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
      <h5 className="text-center">Daily statistics</h5>
      <div className="d-flex flex-row align-items-center justify-content-center gap-5 w-100">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <span
            className="mb-0 fw-bold"
            style={{ fontSize: 42, color: getColor("positive") }}
          >
            {percentages?.positive || "0"}%
          </span>
          <p>Positive</p>
        </div>
        <div
          style={{
            width: 1,
            height: "70%",
            background: "white",
            marginTop: "8px",
          }}
          className="mb-2"
        ></div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <span
            className="mb-0 fw-bold"
            style={{ fontSize: 42, color: getColor("neutral") }}
          >
            {percentages.neutral || "0"}%
          </span>
          <p>Neutral</p>
        </div>
        <div
          style={{
            width: 1,
            height: "70%",
            background: "white",
            marginTop: "8px",
          }}
          className="mb-2"
        ></div>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <span
            className="mb-0 fw-bold"
            style={{ fontSize: 42, color: getColor("negative") }}
          >
            {percentages.negative || "0"}%
          </span>
          <p>Negative</p>
        </div>
      </div>
    </div>
  );
}
