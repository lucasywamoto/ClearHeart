import Image from "next/image";

export default function Profile({ session }) {
  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center w-100">
        <div>
          <h4 className="fw-light mb-0">Hello,</h4>
          <h2>{session?.user?.name?.split(" ")[0]}!</h2>
        </div>
        <Image
          src={
            session?.user?.image || "https://avatar.iran.liara.run/public/43"
          }
          onError={(e) => {
            e.target.src = "https://avatar.iran.liara.run/public/43";
          }}
          className="rounded-circle avatar"
          alt="Avatar"
          width="60"
          height="60"
        />
      </div>
      <hr className="my-4 w-100" />
    </>
  );
}
