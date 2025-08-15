import toast from "react-hot-toast";
import { api } from "../api/api";
import { handleLogOut } from "./LogOutButton";
import { useUser } from "../context/UserProvider";
import { useState } from "react";
import clsx from "clsx";
import Loader from "./Loader";

const DeleteAccountButton = () => {
  const { user } = useUser();
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (
      user?.email === "admin@icloud.com" ||
      user?.email === "user@icloud.com"
    ) {
      toast.error("Sorry you can't delete example user!");
      return;
    }
    setLoading(true);
    await api.deleteUser(user?._id || "");
    setLoading(false);
    handleLogOut();
  };

  return (
    <>
      <button
        onClick={() => setPopup((prev) => !prev)}
        className="border border-red-500 py-[7px] px-4 text-red-500 rounded-lg flex items-center gap-2 cursor-pointer"
      >
        Delete Account
      </button>
      <div
        className={clsx(
          "absolute top-0 left-0 h-screen w-screen bg-[#00000050] z-[999] transition-colors",
          popup ? "grid place-items-center opacity-100" : "opacity-0"
        )}
        style={{
          visibility: popup ? "visible" : "hidden",
        }}
      >
        <div className="p-5 w-3/4 max-w-[400px] h-auto bg-black text-white rounded-sm flex flex-col gap-3">
          <h1 className="text-2xl">Are you really?</h1>
          <p className="">If you delete your account you lost all your data</p>
          <div className="flex gap-5">
            <button
              className="cursor-pointer"
              onClick={() => setPopup((prev) => !prev)}
            >
              Cancel
            </button>
            <button
              className="cursor-pointer bg-red-500 p-1 px-3 rounded-lg flex items-center gap-2"
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              {loading ? (
                <>
                  Deleting <Loader fill="white" size={20} />
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountButton;
