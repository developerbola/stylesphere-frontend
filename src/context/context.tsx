import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
}
const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},
};
export const UserContext = createContext(initialUserContext);
