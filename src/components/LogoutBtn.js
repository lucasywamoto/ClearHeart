import { doLogout } from "@/app/action";

export default function LogoutBtn() {
  return (
    <form action={doLogout}>
      <button type="submit">Logout</button>
    </form>
  );
}
