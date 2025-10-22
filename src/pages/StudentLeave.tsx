import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

const StudentLeave = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium">Student Leave</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage student leave applications</p>
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
              <p className="text-2xl font-medium">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-medium text-success">45</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-medium text-destructive">8</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-medium">65</p>
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
                { student: 'John Doe', class: '10-A', date: '2024-01-15', reason: 'Medical', status: 'pending' },
                { student: 'Jane Smith', class: '10-B', date: '2024-01-14', reason: 'Family Function', status: 'approved' },
                { student: 'Mike Johnson', class: '9-A', date: '2024-01-13', reason: 'Personal', status: 'rejected' },
              ].map((leave, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
                  <div className="space-y-1">
                    <p className="font-medium">{leave.student}</p>
                    <p className="text-sm text-muted-foreground">{leave.class} • {leave.date}</p>
                    <p className="text-sm">{leave.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      leave.status === 'approved' ? 'default' : 
                      leave.status === 'pending' ? 'secondary' : 
                      'destructive'
                    }>
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

export default StudentLeave;
