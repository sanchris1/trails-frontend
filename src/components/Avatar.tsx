import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
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

const AvatarUser = () => {
  return (
    <div className="flex items-center gap-3 bg-secondary/5 hover:bg-secondary/10 pr-1 cursor-pointer rounded-full">
      <Avatar>
        <AvatarImage src={"/me.jpg"} alt="user_avatar" className=" grayscale" />
      </Avatar>
      <span className="text-primary">sam chris</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant={"ghost"}>
              <ChevronDown />
            </Button>
          }
        />
        <DropdownMenuContent className="w-48 items-start space-y-1">
          {adminProfileMenu.map((men) => (
            <DropdownMenuGroup key={men.id}>
              <DropdownMenuLabel>{men.title}</DropdownMenuLabel>
              {men.items.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  {item.title}{" "}
                  <DropdownMenuShortcut className="">
                    <item.icon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarUser;
