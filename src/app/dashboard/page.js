"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import LogoutBtn from "@/components/LogoutBtn";
import { getSession } from "next-auth/react";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const sessionData = await getSession();

        if (!sessionData) {
          redirect("/login");
        } else {
          setSession(sessionData);
        }
      } catch (err) {
        console.error("Error in Dashboard:", err);
        setError(err.message || "An unexpected error occurred.");
      }
    };

    init();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="index-container">
      <LeftPanel session={session} />
      <RightPanel />
      <LogoutBtn />
    </div>
  );
};

export default Dashboard;
