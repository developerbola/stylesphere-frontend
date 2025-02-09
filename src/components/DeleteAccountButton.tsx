import toast from "react-hot-toast";
import { api } from "../api/api";
import { handleLogOut } from "./LogOutButton";

const DeleteAccountButton = () => {
  const handleDeleteAcc = async () => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    if (
      parsedUser.email === "admin@icloud.com" ||
      parsedUser.email === "user@icloud.com"
    ) {
      toast.error("Sorry you can't delete example user!");
      return;
    }
    await api.deleteUser(parsedUser._id);
    handleLogOut();
  };
  return (
    <button
      onClick={handleDeleteAcc}
      className="border border-red-500 py-[7px] px-4 text-red-500 rounded-lg flex items-center gap-2"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
