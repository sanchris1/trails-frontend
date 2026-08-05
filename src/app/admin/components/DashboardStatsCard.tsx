/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

const DashboardStatsCard = ({ stat }: any) => {
  return (
    <Card className="w-full ">
      <CardHeader className="flex items-center justify-between">
        <stat.icon className="size-7 text-accent p-1 bg-secondary/30 border border-border rounded-full" />{" "}
        {stat.trend && (
          <span className="flex items-center gap-2 text-xs bg-secondary/10 px-2 rounded-full text-primary">
            {stat.trend === "up" ? (
              <TrendingUp className="size-5" />
            ) : (
              <TrendingDown className="size-5" />
            )}
            {stat.change && <span className="">{stat.change}</span>}%
          </span>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium text-primary">{stat.title}</p>
        <p className="text-foreground font-semibold text-2xl">{stat.value}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;
