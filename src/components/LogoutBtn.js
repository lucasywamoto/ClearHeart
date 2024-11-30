import { doLogout } from "@/app/action";

export default function LogoutBtn() {
  return (
    <form action={doLogout}>
      <button type="submit" className="btn btn-outline-light">
        Logout
      </button>
    </form>
  );
}
