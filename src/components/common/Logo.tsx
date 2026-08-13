import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="text-[16px] font-semibold text-primary  flex items-center justify-center"
    >
      <Image
        src={"/favicon.svg"}
        alt="trails and memoirs logo"
        width={100}
        height={64}
        className="rounded-full"
      />
    </Link>
  );
};

export default Logo;
