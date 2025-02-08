import { api } from "../api/api";
import { handleLogOut } from "./LogOutButton";

const DeleteAccountButton = () => {
  const handleDeleteAcc = async () => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    await api.deleteUser(parsedUser._id);
    handleLogOut();
  };
  return (
    <button
      onClick={handleDeleteAcc}
      className="border border-red-500 p-2 px-4 text-red-500 rounded-lg flex items-center gap-2"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
