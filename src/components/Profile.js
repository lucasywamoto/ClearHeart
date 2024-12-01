import Image from "next/image";
import { useState } from "react";

export default function Profile({ session }) {
  const [imageError, setImageError] = useState(false);

  const avatarUrl = imageError
    ? "https://avatar.iran.liara.run/public/43"
    : session?.user?.image ||
      session?.user?.avatar ||
      "https://avatar.iran.liara.run/public/43";

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center w-100">
        <div>
          <h4 className="fw-light mb-0">Hello,</h4>
          <h2>{session?.user?.name?.split(" ")[0]}!</h2>
        </div>
        <Image
          src={avatarUrl}
          className="rounded-circle"
          alt={`${session?.user?.name}'s avatar`}
          width={60}
          height={60}
          onError={() => setImageError(true)}
          priority
        />
      </div>
      <hr className="my-4 w-100" />
    </>
  );
}
