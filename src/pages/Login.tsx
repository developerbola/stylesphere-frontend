import React, { useState, useCallback, memo } from "react";
import { api } from "../api/api";
import Loader from "../components/Loader";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      await api.loginUser(user);
      window.location.href = "/";
    } catch (error: any) {
      setError(
        error?.response?.data?.message ?? "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Memoize event handlers to prevent unnecessary re-renders
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleAdminLogin = useCallback(() => {
    setEmail("admin@icloud.com");
    setPassword("adminpassword");
  }, []);

  const handleUserLogin = useCallback(() => {
    setEmail("user@icloud.com");
    setPassword("userpassword");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <a
        href="/"
        className="flex items-center text-2xl font-semibold text-gray-900"
      >
        <img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" />
        StyleSphere
      </a>
      <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 sm:p-8 flex flex-col gap-2">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-2">
            Sign in to your account
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="youremail@icloud.com"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onChange={handlePasswordChange}
                value={password}
                required
              />
            </div>
            <button className="w-full bg-gray-900 text-white bg-primary-600 hover:bg-primary-700 active:scale-95 transition-transform font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {loading ? (
                <p className="flex items-center justify-center gap-2 opacity-80">
                  Signing in <Loader fill="white" size={20} />
                </p>
              ) : (
                "Sign In"
              )}
            </button>
            <div
              className={`${
                error ? "flex" : "hidden"
              } bg-red-500 p-3 rounded-lg`}
            >
              <p className="text-white">{error}</p>
            </div>
            <p className="text-sm font-light text-gray-900">
              Don't have an account yet?{" "}
              <a
                href="/signup"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
        <div className="flex gap-2 justify-center px-4">
          <button
            className="p-2 w-[45%] text-md text-center bg-gray-900 text-white rounded-md"
            onClick={handleAdminLogin}
          >
            Login as Admin
          </button>
          <button
            className="p-2 w-[45%] text-md text-center bg-gray-900 text-white rounded-md"
            onClick={handleUserLogin}
          >
            Login as User
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);