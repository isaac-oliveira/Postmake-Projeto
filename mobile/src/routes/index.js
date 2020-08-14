import React from "react";

import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";

import useAuth from "../hooks/useAuth";

const Routes = () => {
  const { logged } = useAuth();

  if (logged) return <AppRouter />;

  return <AuthRouter />;
};

export default Routes;
