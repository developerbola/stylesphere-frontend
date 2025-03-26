import { useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/UserProvider";
import { DashboardSidebar } from "../components/components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();

  // Redirect non-admin users
  useEffect(() => {
    if (user?._id !== import.meta.env.VITE_ADMIN_ID) {
      toast.error("You are not admin bro");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [user]);

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div
        className="pt-6 flex justify-center w-full"
        style={{
          minWidth: "calc(100dvw - 224px)",
        }}
      >
        <Outlet />
      </div>
     
    </div>
  );
};

export default Dashboard;
