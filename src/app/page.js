import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { auth } from "@/auth";

export default async function Home() {
  //get the server session
  const session = await getServerSession(auth);

  //redirect to login if the user is not authenticated
  if (!session) {
    redirect("/login");
  }

  //otherwise redirect to the dashboard
  redirect("/dashboard");
}
