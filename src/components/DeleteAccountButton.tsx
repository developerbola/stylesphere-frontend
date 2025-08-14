import toast from "react-hot-toast";
import { api } from "../api/api";
import { handleLogOut } from "./LogOutButton";
import { useUser } from "../context/UserProvider";

const DeleteAccountButton = () => {
  const { user } = useUser();
  const handleDeleteAcc = async () => {
    if (
      user?.email === "admin@icloud.com" ||
      user?.email === "user@icloud.com"
    ) {
      toast.error("Sorry you can't delete example user!");
      return;
    }
    await api.deleteUser(user?._id || "");
    handleLogOut();
  };
  return (
    <button
      onClick={handleDeleteAcc}
      className="border border-red-500 py-[7px] px-4 text-red-500 rounded-lg flex items-center gap-2 cursor-pointer"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
