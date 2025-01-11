import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
import { api } from "../api/api";

export const UserProvider = ({ children }: { children: any }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null | undefined>(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const savedUser = JSON.parse(storedUser);
      if (savedUser?._id == import.meta.env.VITE_ADMIN_ID) {
        setIsAdmin(true);
      }
      return savedUser;
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.fetchUser();
        if (userData?._id == import.meta.env.VITE_ADMIN_ID) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } catch (error: any) {
        setError(error.code);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
