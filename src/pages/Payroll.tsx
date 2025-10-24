import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Download, Users, TrendingUp } from 'lucide-react';

export default function Payroll() {
  const payrollData = [
    { id: 1, name: 'John Smith', role: 'Mathematics Teacher', salary: 45000, status: 'Paid' },
    { id: 2, name: 'Sarah Johnson', role: 'English Teacher', salary: 42000, status: 'Paid' },
    { id: 3, name: 'Mike Wilson', role: 'Science Teacher', salary: 48000, status: 'Pending' },
    { id: 4, name: 'Emily Brown', role: 'History Teacher', salary: 40000, status: 'Paid' },
    { id: 5, name: 'David Lee', role: 'Physical Education', salary: 38000, status: 'Pending' },
  ];

  const stats = [
    { label: 'Total Staff', value: '42', icon: Users, color: 'text-primary' },
    { label: 'Monthly Payroll', value: '₹18.5L', icon: DollarSign, color: 'text-success' },
    { label: 'Paid This Month', value: '35', icon: TrendingUp, color: 'text-secondary' },
  ];
    const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-success/30 text-foreground/70';
      case 'Pending':
        return 'bg-warning/30 text-foreground/70';
      case 'Overdue':
        return 'bg-destructive/30 text-foreground/70';
      default:
        return 'bg-muted/30 text-foreground/70';
    }
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium text-foreground">Payroll Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage staff salaries and payroll
            </p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Payroll
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-medium mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Payroll</CardTitle>
            <CardDescription>Current month salary details</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>₹{staff.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
