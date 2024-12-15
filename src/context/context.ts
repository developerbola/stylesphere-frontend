import { createContext } from "react";

export const Context = createContext<{ user: User | null }>({
  user: null,
});
