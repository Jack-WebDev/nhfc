import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardCardProps = {
  total: number;
  title: string;
}

export default function DashboardCard({  total, title }: DashboardCardProps) {
  return (
    <Card className="drop-shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-4 text-secondary font-bold">
          <h2 className="font-medium text-blue-500">{title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-black">
        <span className="text-3xl font-semibold">{total}</span>
      </CardContent>
    </Card>
  );
}