"use client";
import React from "react";

//Blurred background component - modified from https://codepen.io/walpolea/pen/JjwYaxM
const BlurredBackground = ({ blur = "12vw" }) => {
  const baseShapeStyles = {
    margin: "0 auto",
    aspectRatio: "1",
    position: "relative",
    width: "100%",
    scale: "2",
    opacity: "0.66",
    top: "0",
    left: "0",
    clipPath:
      "polygon(50.9% 37.2%, 43.5% 34.7%, 33.6% 26.1%, 39.2% 10.8%, 26.2% 0.0%, 4.8% 6.4%, 0.0% 30.4%, 20.7% 37.2%, 33.4% 26.3%, 43.2% 34.9%, 45.0% 35.6%, 43.6% 46.4%, 37.8% 59.5%, 21.8% 63.2%, 11.7% 76.1%, 22.9% 91.3%, 47.4% 91.3%, 54.0% 79.0%, 38.0% 59.6%, 43.9% 46.4%, 45.2% 35.5%, 50.9% 37.6%, 56.1% 36.8%, 59.8% 47.6%, 70.3% 61.9%, 87.7% 56.0%, 96.4% 37.4%, 88.6% 15.1%, 63.7% 16.7%, 55.2% 33.6%, 55.9% 36.6%, 50.9% 37.2%)",
    mixBlendMode: "difference",
  };

  return (
    <div
      className="h-screen w-full overflow-hidden blur-container"
      style={{
        filter: `blur(${blur})`,
        display: "grid",
      }}
    >
      <style jsx>{`
        @keyframes turn {
          to {
            transform: rotate(360deg);
          }
        }
        .shape {
          animation: turn 16s linear infinite;
        }
        .shape-offset {
          animation: turn 26s linear infinite;
        }
      `}</style>

      <div
        className="shape"
        style={{
          ...baseShapeStyles,
          gridColumn: "1 / -1",
          gridRow: "1 / -1",
          background:
            "linear-gradient(#6439ff, #4f75ff, #00ccdd, #4f75ff, #6439ff)",
        }}
      />

      <div
        className="shape-offset"
        style={{
          ...baseShapeStyles,
          gridColumn: "1 / -1",
          gridRow: "1 / -1",
          transform: "rotate(180deg)",
          background:
            "linear-gradient(#6439ff, #4f75ff, #00ccdd, #4f75ff, #6439ff)",
        }}
      />
    </div>
  );
};

export default BlurredBackground;
