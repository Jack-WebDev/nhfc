import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "lucide-react";
import {IconType} from "react-icons";

type DashboardCardProps = {
  icon: IconType;
  total: number;
  title: string;
}

export default function DashboardCard({ icon: Icon, total, title }: DashboardCardProps) {
  return (
    <Card className="border border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-4 text-secondary font-bold">
          <Icon fontSize="3rem" className="text-black" />
        <h2 className="font-semibold text-black">{total}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-black">
          {title}
      </CardContent>
    </Card>
  );
}