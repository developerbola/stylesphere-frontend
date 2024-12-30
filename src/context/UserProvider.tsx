import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
import { api } from "../api/api";

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await api.fetchUser();
      setUser(userData);
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
