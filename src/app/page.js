import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { auth } from "@/auth";

export default async function Home() {
  const session = await getServerSession(auth);

  if (!session) {
    redirect("/login");
  }

  redirect("/dashboard");
}
