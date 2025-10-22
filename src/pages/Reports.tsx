import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, Users, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Reports() {
  const reportTypes = [
    {
      icon: Users,
      title: 'Student Reports',
      description: 'Comprehensive student performance and attendance reports',
      stats: '245 Students',
    },
    {
      icon: TrendingUp,
      title: 'Academic Performance',
      description: 'Class-wise and subject-wise performance analysis',
      stats: '12 Classes',
    },
    {
      icon: Calendar,
      title: 'Attendance Reports',
      description: 'Daily, weekly, and monthly attendance summaries',
      stats: '98.5% Average',
    },
    {
      icon: FileText,
      title: 'Financial Reports',
      description: 'Fee collection, expenses, and budget reports',
      stats: '₹45.2L Collected',
    },
  ];

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-medium text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and download comprehensive reports
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reportTypes.map((report, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <report.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {report.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {report.stats}
                  </span>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Quick Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Today's Attendance
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Weekly Performance
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Fee Defaulters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
