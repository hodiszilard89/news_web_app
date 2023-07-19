import { FC } from "react";
import MyNavbar from "./navbar";
import { useAuthUser } from "react-auth-kit";

export const NavbarProvider: FC = () => {
  return (
    <>
      <MyNavbar />
    </>
  );
};
