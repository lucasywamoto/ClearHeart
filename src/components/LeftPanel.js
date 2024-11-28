"use client";
import React, { useState } from "react";
import { getColor } from "@/utils/helpers";
import Image from "next/image";

export default function LeftPanel({ moods }) {
  const [search, setSearch] = useState("");

  const filteredMoods = moods.filter((mood) =>
    mood.mood.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container l-panel w-25 p-4 px-10 rounded-3 m-0">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h4 className="fw-light mb-0">Hello,</h4>
          {/* <h2>{{user.name}}!</h2> */}
        </div>
        <Image
          src="https://via.placeholder.com/150"
          className="rounded-circle avatar"
          alt="Avatar"
          width="60"
          height="60"
        />
      </div>
      <hr className="my-4" />
      <div id="mood-form-container">
        <div id="initial-view">
          <div>
            <h4 className="fw-light mb-3">
              How are you<br></br>feeling today?
            </h4>
            <input
              type="search"
              className="form-control mb-3"
              id="search-input"
              placeholder="Search..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div id="mood-buttons">
              {filteredMoods.length > 0
                ? filteredMoods.map((mood, index) => {
                    const color = getColor(mood.type);
                    return (
                      <a
                        className="badge rounded-pill py-1 px-2 mb-1 me-1 mood-button fw-regular"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={mood.mood}
                        data-mood={mood.mood}
                        key={index}
                        style={{
                          backgroundColor: color,
                          textDecoration: "none",
                        }}
                      >
                        {mood.mood}
                      </a>
                    );
                  })
                : ""}
            </div>
          </div>
          <div id="spectrum-label">
            <hr />
            <div>
              <p className="mb-2">Positive</p>
              <p className="mb-2">Neutral</p>
              <p className="mb-2">Negative</p>
            </div>
            <div id="spectrum-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
