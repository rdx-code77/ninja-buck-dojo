import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NinjaUser } from "@/types/ninja";
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Radar as RadarIcon, Activity, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface NinjaAnalyticsProps {
  users: NinjaUser[];
  onClose: () => void;
}

const COLORS = ['hsl(var(--ninja-gold))', 'hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--muted))'];

export const NinjaAnalytics = ({ users, onClose }: NinjaAnalyticsProps) => {
  const [activeChart, setActiveChart] = useState<'bar' | 'pie' | 'line' | 'radar' | 'area'>('bar');
  const { theme, setTheme } = useTheme();

  // Prepare data for charts
  const chartData = users.map((user, index) => ({
    name: user.name,
    ninjaBucks: user.ninjaBucks,
    rank: user.rank || 'Ninja',
    fill: COLORS[index % COLORS.length]
  })).sort((a, b) => b.ninjaBucks - a.ninjaBucks);

  // Top performers for radar chart
  const topPerformers = chartData.slice(0, 5);

  const chartOptions = [
    { type: 'bar' as const, icon: BarChart3, label: 'Bar Chart', description: 'Compare ninja bucks by student' },
    { type: 'pie' as const, icon: PieChartIcon, label: 'Pie Chart', description: 'Distribution of ninja bucks' },
    { type: 'line' as const, icon: TrendingUp, label: 'Line Chart', description: 'Performance trend' },
    { type: 'radar' as const, icon: RadarIcon, label: 'Radar Chart', description: 'Top 5 ninjas comparison' },
    { type: 'area' as const, icon: Activity, label: 'Area Chart', description: 'Cumulative performance' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ninjaBucks" fill="hsl(var(--ninja-gold))" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="ninjaBucks"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ninjaBucks" stroke="hsl(var(--ninja-gold))" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={topPerformers}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, Math.max(...topPerformers.map(p => p.ninjaBucks))]} />
              <Radar name="Ninja Bucks" dataKey="ninjaBucks" stroke="hsl(var(--ninja-gold))" fill="hsl(var(--ninja-gold))" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="ninjaBucks" stroke="hsl(var(--ninja-gold))" fill="hsl(var(--ninja-gold))" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const totalBucks = chartData.reduce((sum, user) => sum + user.ninjaBucks, 0);
  const averageBucks = Math.round(totalBucks / chartData.length);
  const topNinja = chartData[0];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-ninja bg-clip-text text-transparent">
                Ninja Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">Track and analyze ninja performance</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-accent hover:text-accent-foreground"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Close Dashboard
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Ninjas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{chartData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Ninja Bucks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBucks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Average Bucks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageBucks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Top Ninja</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{topNinja?.name}</div>
                <Badge variant="secondary" className="mt-1">
                  {topNinja?.ninjaBucks} bucks
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Chart Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {chartOptions.map((option) => (
              <Button
                key={option.type}
                variant={activeChart === option.type ? "ninja" : "outline"}
                onClick={() => setActiveChart(option.type)}
                className="flex items-center gap-2"
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </Button>
            ))}
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const activeOption = chartOptions.find(opt => opt.type === activeChart);
                  const IconComponent = activeOption?.icon;
                  return (
                    <>
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      {activeOption?.label}
                    </>
                  );
                })()}
              </CardTitle>
              <CardDescription>
                {chartOptions.find(opt => opt.type === activeChart)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart()}
            </CardContent>
          </Card>

          {/* Top Performers Table */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Leading ninjas by earned bucks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chartData.slice(0, 10).map((user, index) => (
                  <div key={user.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Badge variant={index < 3 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.rank}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-ninja-gold text-ninja-dark">
                      {user.ninjaBucks} bucks
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};