import { doLogout } from "@/app/action";

// Button component to handle user logout
export default function LogoutBtn() {
  return (
    <form action={doLogout}>
      <button type="submit" className="btn btn-outline-light">
        Logout
      </button>
    </form>
  );
}
