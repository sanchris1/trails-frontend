"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.href}
      className={`  ${pathname.includes(item.href) ? "bg-secondary/30" : "bg-secondary/10"}    text-[12px]  border border-border hover:bg-secondary/20 text-foreground px-2 py-1.5 mx-3 rounded-lg`}
    >
      {item.title}
    </Link>
  );
};

export default SidebarLink;
