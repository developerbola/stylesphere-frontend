import toast from "react-hot-toast";
import { useUser } from "../context/UserProvider";

const Dashboard = () => {
  const { user } = useUser();
  if (user?._id !== import.meta.env.VITE_ADMIN_ID) {
    toast.error("You are not admin bro");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      Dashboard
    </div>
  );
};

export default Dashboard;
