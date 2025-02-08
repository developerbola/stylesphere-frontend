import { useEffect, useState } from "react";
import { LogOutButton } from "../components/components";
import DeleteAccountButton from "../components/DeleteAccountButton";
import { api } from "../api/api";
import toast from "react-hot-toast";
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
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (parsedUser) {
      setFormData({
        name: parsedUser?.name,
        email: parsedUser?.email,
        password: parsedUser?.password,
      });
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast.promise(
      async () => {
        await api.updateUser(parsedUser._id, formData);
      },
      {
        loading: "Infos saving...",
        success: "Saved successfully!",
        error: "Something went wrong",
      }
    );
  };

  return (
    <div className="min-h-screen pt-[100px] px-16">
      <h1 className="text-3xl font-semibold">Profile</h1>
      <div className="my-5 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter your name"
            readOnly={
              formData.email === "admin@icloud.com" ||
              formData.email === "user@icloud.com"
            }
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
            readOnly={
              formData.email === "admin@icloud.com" ||
              formData.email === "user@icloud.com"
            }
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
            readOnly={
              formData.email === "admin@icloud.com" ||
              formData.email === "user@icloud.com"
            }
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
            className="px-4 bg-gray-950 text-white p-2 rounded-lg"
          >
            Save Changes
          </button>
          <LogOutButton />
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;
