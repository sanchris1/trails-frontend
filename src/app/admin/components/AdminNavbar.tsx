import { Bell, Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import AvatarUser from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between border  p-2">
      <div className="w-1/2 flex items-center justify-start gap-6">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align={"inline-end"}>5 results</InputGroupAddon>
        </InputGroup>
      </div>
      <div className="w-1/2 flex items-center justify-end gap-6">
        <ModeToggle />
        <Button variant={"ghost"} className="relative">
          <span className="absolute top-0 right-0 bg-red-500 rounded-full size-2" />
          <Bell className="" />
        </Button>
        |<AvatarUser />
      </div>
    </div>
  );
};

export default AdminNavbar;
