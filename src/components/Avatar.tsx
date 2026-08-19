"use client";

import { Avatar, AvatarImage } from "./ui/avatar";
import { ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { adminProfileMenu } from "@/common";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const AvatarUser = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function logoutUser() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("User signed out successfully");
          router.push("/");
          router.refresh();
        },
        onError: (err) => {
          toast.error("Error signing out");
          console.log(err);
        },
      },
    });
  }

  return (
    <div className="flex items-center gap-3 bg-secondary/5 hover:bg-secondary/10 px-2 cursor-pointer rounded-full">
      {session?.user.image && (
        <Avatar>
          <AvatarImage
            src={session?.user.image}
            alt="user_avatar"
            className=" grayscale"
          />
        </Avatar>
      )}
      <span className="text-primary">{session?.user.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <span>
              <ChevronDown />
            </span>
          }
        />
        <DropdownMenuContent className="w-48 items-start space-y-2">
          {adminProfileMenu.map((men) => (
            <DropdownMenuGroup key={men.id}>
              <DropdownMenuLabel>{men.title}</DropdownMenuLabel>
              {men.items.map((item) => (
                <Link href={item.href} key={item.id}>
                  {" "}
                  <DropdownMenuItem className="flex items-center justify-between ">
                    {item.title}{" "}
                    <DropdownMenuShortcut className="">
                      <item.icon />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
          ))}
          <DropdownMenuItem
            onClick={logoutUser}
            variant="destructive"
            className="w-full"
          >
            Logout
            <DropdownMenuShortcut>
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarUser;
