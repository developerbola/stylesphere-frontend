import { match } from "path-to-regexp";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const layoutPaths = [
  "/",
  "/about",
  "/products",
  "/products/:id",
  "/customer-service",
  "/profile",
  "/dashboard",
];

export const doesPathMatch = (routes?: string[]): boolean => {
  const location = useLocation();
  const [path, setPath] = useState<string>(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (routes ? routes : layoutPaths).some((route) => {
    const matcher = match(route, { decode: decodeURIComponent });
    return matcher(path);
  });
};
