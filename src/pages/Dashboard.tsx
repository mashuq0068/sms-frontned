import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shell } from '@/components/layout/Shell';
import { Users, ClipboardCheck, DollarSign, FileText } from 'lucide-react';
import { AttendanceChart } from '@/components/charts/AttendanceChart';
import { FeesChart } from '@/components/charts/FeesChart';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const stats = [
  {
    title: 'Total Students',
    value: '1,234',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    trend: '+12% from last month',
  },
  {
    title: 'Attendance Rate',
    value: '94.2%',
    icon: ClipboardCheck,
    color: 'text-success',
    bgColor: 'bg-success/10',
    trend: '+2.5% from last week',
  },
  {
    title: 'Fees Pending',
    value: '$12,450',
    icon: DollarSign,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    trend: '-8% from last month',
  },
  {
    title: 'Upcoming Exams',
    value: '8',
    icon: FileText,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    trend: 'Next exam in 5 days',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-medium">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-medium">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <AttendanceChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fee Collection</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <FeesChart />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-4">
            <Button onClick={() => navigate('/students')} variant="outline" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              View Students
            </Button>
            <Button onClick={() => navigate('/attendance')} variant="outline" className="justify-start">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
            <Button onClick={() => navigate('/exams')} variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              View Exams
            </Button>
            <Button onClick={() => navigate('/fees')} variant="outline" className="justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Manage Fees
            </Button>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Dashboard;
