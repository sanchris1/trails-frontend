import { dashboardStats } from "@/common";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DashboardStatsCard from "./components/DashboardStatsCard";
import { getSession } from "@/hooks/getSession";

const AdminPages = async () => {
  const session = await getSession();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-4xl font-bold text-foreground">
            Hello, <span className="text-accent">{session?.user.name}</span>
          </h3>
          <p className="text-sm text-secondary">
            Welcome to the overview of the <Logo /> for the time
          </p>
        </div>
        <Button>
          {" "}
          <Plus />
          New Expedition
        </Button>
      </div>

      <div className="my-8">
        <div className="grid grid-cols-3 gap-8">
          {dashboardStats.map((stat) => (
            <DashboardStatsCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>

      {/* upcoming expedition */}
      <div className=""></div>
    </div>
  );
};

export default AdminPages;
