"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function HasSubmitted() {
  const { data: session } = useSession();

  async function handleClick(event) {
    event.preventDefault();
    try {
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const deleteResponse = await fetch("/api/clearRecords", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      });

      if (deleteResponse.ok) {
        window.location.reload();
      } else {
        throw new Error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div
      id="already-submitted"
      className="d-flex flex-column align-items-center justify-content-center h-100"
    >
      <h4 className="fw-light text-center mb-3">
        You&apos;ve already shared
        <br />
        your mood today!
      </h4>
      <Image src="/love.gif" width={100} height={100} alt="heart" unoptimized />
      <p className="text-muted text-center">
        Come back tomorrow
        <br />
        to share again.
      </p>
      <button className="btn btn-outline-secondary mt-5" onClick={handleClick}>
        Reset today&apos;s mood
      </button>
    </div>
  );
}
