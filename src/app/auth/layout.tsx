import { getSession } from "@/hooks/getSession";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const session = await getSession();

  if (session) {
    redirect("/expeditions");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
