import { useState } from "react";
import { api } from "../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleRegister = async () => {
    const user = {
      name,
      email,
      password,
      cart: [],
    };
    try {
      setLoading(true);
      await api.registerUser(user);
      const { token } = await api.loginUser({ email, password });
      console.log(token);

      Cookies.set("token", token, { expires: 7 });
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <a
        onClick={() => navigate("/")}
        className="flex items-center text-2xl font-semibold text-gray-900"
      >
        <img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" />
        StyleSphere
      </a>
      <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 sm:p-8 flex flex-col gap-2">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-2">
            Sign Up and Discover
          </h1>
          <form className="space-y-2 md:space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Full Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Email
              </label>
              <input
                type="email"
                className={`${
                  error
                    ? "bg-red-50 border border-red-300"
                    : "bg-gray-50 border border-gray-300"
                } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                placeholder="youremail@icloud.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                value={email}
                autoComplete="email"
                required
              />
              <p className={`${error ? "text-red-500" : "hidden"}`}>{error}</p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <button
              className="w-full bg-gray-900 text-white bg-primary-600 hover:bg-primary-700 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <p className="flex items-center justify-center gap-2 opacity-80">
                  Signing up <Loader fill="white" size={20} />
                </p>
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="text-sm font-light text-gray-900">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="font-medium text-primary-600 hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
