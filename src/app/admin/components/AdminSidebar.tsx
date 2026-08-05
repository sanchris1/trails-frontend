import { sidebarItems } from "@/common";
import SidebarLink from "./SidebarLink";

const AdminSidebar = () => {
  const groupedItems = Object.groupBy(sidebarItems, (item) => item.section);

  return (
    <div className="w-72 border-r bg-card">
      <div className=""></div>
      <div className="space-y-2">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="space-y-2 flex flex-col ">
            <p className="">{section}</p>
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
