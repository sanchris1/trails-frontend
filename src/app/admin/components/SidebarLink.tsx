/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";

const SidebarLink = ({ item }: any) => {
  return <Link href={item.href}>{item.title}</Link>;
};

export default SidebarLink;
