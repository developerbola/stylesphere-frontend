import { useEffect, useState } from "react";
import { LogOutButton } from "../components/components";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { useUser } from "../context/UserProvider";
interface FormUser {
  name: string;
  email: string;
  password: string;
}
const Profile = () => {
  const [formData, setFormData] = useState<FormUser>({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name,
        email: user?.email,
        password: user?.password,
      });
    }
  }, []);

  const handleChange = (e: any) => {
    if (
      formData.email === "admin@icloud.com" ||
      formData.email === "user@icloud.com"
    ) {
      toast.error("Sorry you can't edit example user!");
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast.promise(
      async () => {
        await api.updateUser(user?._id || "", formData);
      },
      {
        loading: "Infos saving...",
        success: "Saved successfully!",
        error: "Something went wrong",
      }
    );
  };

  const isSubmitDisable =
    user?.email === formData.email &&
    user?.name === formData.name &&
    user?.password === formData.password;

  return (
    <div className="flex flex-col min-h-screen pt-[100px] px-16">
      <h1 className="text-3xl font-semibold">Profile Information</h1>
      <div className="my-5 w-full max-w-md flex flex-col flex-grow">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute top-[36px] right-0 pr-3 flex items-center text-gray-600"
          >
            {showPass ? "hide" : "show"}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 bg-gray-950 text-white p-2 rounded-lg disabled:opacity-50 cursor-not-allowed"
            disabled={isSubmitDisable}
          >
            Save Changes
          </button>
        </div>
        <div className="flex-grow flex items-end gap-2">
          <LogOutButton />
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;
