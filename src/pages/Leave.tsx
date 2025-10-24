import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

const Leave = () => {
    const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success/30 text-foreground/70';
      case 'rejected':
        return 'bg-destructive/30 text-foreground/70';
        case 'pending':
        return 'bg-warning/30 text-foreground/70';
      default:
        return 'bg-muted/30 text-foreground/70';
    }
  };
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium">Employee Leave</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage employee leave applications</p>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            New Leave Request
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-medium">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-medium text-success">28</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-medium text-destructive">3</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-medium">36</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { employee: 'Sarah Johnson', role: 'Math Teacher', startDate: '2024-01-20', endDate: '2024-01-22', type: 'Sick Leave', status: 'pending' },
                { employee: 'Robert Smith', role: 'Science Teacher', startDate: '2024-01-18', endDate: '2024-01-19', type: 'Personal', status: 'approved' },
                { employee: 'Michael Brown', role: 'PE Teacher', startDate: '2024-01-15', endDate: '2024-01-17', type: 'Vacation', status: 'approved' },
                { employee: 'Emily Davis', role: 'Librarian', startDate: '2024-01-10', endDate: '2024-01-11', type: 'Personal', status: 'rejected' },
              ].map((leave, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
                  <div className="space-y-1">
                    <p className="font-medium">{leave.employee}</p>
                    <p className="text-sm text-muted-foreground">{leave.role}</p>
                    <p className="text-sm">{leave.startDate} to {leave.endDate} • {leave.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(leave.status)}>
                      {leave.status}
                    </Badge>
                    {leave.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">Approve</Button>
                        <Button size="sm" variant="outline">Reject</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Leave;
