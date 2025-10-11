"use client";

import Nav from "./Nav";
import { User } from "@auth0/nextjs-auth0/types";

const Dashboard = ({ user }: { user: User }) => {
  return (
    <>
      <Nav name={user.name || "Unknown"} picture={user.picture || ""} />
    </>
  );
};

export default Dashboard;
