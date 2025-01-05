import { useUser } from "../context/UserProvider";

const Dashboard = () => {
  const { user } = useUser();
  if (user?._id !== import.meta.env.VITE_ADMIN_ID)
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-xl">ACCESS DENIED</h1>
      </div>
    );
  return <div>Dashboard</div>;
};

export default Dashboard;
