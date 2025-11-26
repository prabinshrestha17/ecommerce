import { Package, FolderTree, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "0",
      icon: Package,
      color: "text-console-blue",
    },
    {
      title: "Categories",
      value: "0",
      icon: FolderTree,
      color: "text-console-blue",
    },
    {
      title: "Orders",
      value: "0",
      icon: ShoppingCart,
      color: "text-console-blue",
    },
    {
      title: "Revenue",
      value: "$0",
      icon: DollarSign,
      color: "text-console-blue",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-console-blue flex items-center gap-2">
          <span>&gt;</span>
          <span>Dashboard</span>
        </h2>
        <p className="text-muted-foreground mt-2 font-mono text-sm">
          System overview and statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="bg-card/50 backdrop-glass border-console-blue/20 console-glow hover:border-console-blue/40 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`${stat.color}`} size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-console-blue">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  Last updated: Now
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-card/50 backdrop-glass border-console-blue/20">
        <CardHeader>
          <CardTitle className="text-console-blue flex items-center gap-2">
            <span>&gt;</span>
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-console-blue/20 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer">
            <p className="text-sm font-medium text-foreground">
              Start by creating a category
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Navigate to Categories → Add New
            </p>
          </div>
          <div className="p-4 border border-console-blue/20 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer opacity-50">
            <p className="text-sm font-medium text-foreground">
              Add your first product
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Requires at least one category
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
