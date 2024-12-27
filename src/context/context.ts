import { createContext } from "react";

export const Context = createContext<{ user: User | null | Promise<void> }>({
  user: null,
});
