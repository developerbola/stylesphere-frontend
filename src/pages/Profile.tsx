import Cookies from "js-cookie";

const Profile = () => {
  const handleLogOut = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Profile</h1>
      <button onClick={handleLogOut} className="bg-red-500 p-2 px-4 text-white rounded-lg">Log Out</button>
    </div>
  );
};

export default Profile;
