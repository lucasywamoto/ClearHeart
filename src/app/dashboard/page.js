import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoutBtn from "@/components/LogoutBtn";
import LeftPanel from "@/components/LeftPanel";

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div className="index-container">
      <LeftPanel moods={moods} />
      <div className="container r-panel p-5 px-10 rounded-3 m-0">
        {/* Add your content here */}
      </div>
      <LogoutBtn />
    </div>
  );
};

export default Dashboard;
