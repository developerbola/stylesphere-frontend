import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./context";
import { api } from "../api/api";

export const UserProvider = ({ children }: { children: any }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.fetchUser();
        if (userData?._id == import.meta.env.VITE_ADMIN_ID) {
          setIsAdmin(true);
        }
        setUserData(userData);
      } catch (error: any) {
        setError(error.code);
      }
    };
    fetchUser();
  }, []);

  let user = useMemo(() => userData, [userData]);


  return (
    <UserContext.Provider value={{ user, setUserData, isAdmin, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
