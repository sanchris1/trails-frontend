"use client";

import { sidebarItems } from "@/common";
import SidebarLink from "./SidebarLink";
import Logo from "@/components/common/Logo";

const AdminSidebar = () => {
  const groupedItems = Object.groupBy(sidebarItems, (item) => item.section);

  return (
    <div className="w-72 border-r bg-card  flex flex-col">
      <div className="flex items-start flex-col gap-1 p-2">
        <Logo />
        <span className="text-xs">
          The mountains are calling and i must go...
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 hide-scrollbar space-y-2">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="space-y-2 flex flex-col ">
            <p className="text-sm text-secondary">{section}</p>
            {items.map((item) => (
              <SidebarLink key={item.id} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
