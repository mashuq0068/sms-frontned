import { useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import feesData from '@/mock/fees.json';
import { Search, DollarSign, Download } from 'lucide-react';
import { toast } from 'sonner';

const Fees = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFees = feesData.filter((fee) =>
    fee.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fee.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-success text-success-foreground';
      case 'Pending':
        return 'bg-warning text-warning-foreground';
      case 'Overdue':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const totalCollected = feesData.reduce((sum, fee) => sum + fee.paid, 0);
  const totalPending = feesData.reduce((sum, fee) => sum + fee.pending, 0);
  const totalAmount = feesData.reduce((sum, fee) => sum + fee.amount, 0);

  const handlePayment = (invoiceId: string) => {
    toast.success('Payment processed successfully');
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium">Fees & Invoices</h1>
            <p className="text-muted-foreground">Track and manage student fee payments</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                  <p className="text-2xl font-medium">${totalAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Collected</p>
                  <p className="text-2xl font-medium text-success">${totalCollected.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-success/10">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-medium text-warning">${totalPending.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-warning/10">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fees Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name or invoice number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice No.</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.invoiceNumber}</TableCell>
                    <TableCell>{fee.studentName}</TableCell>
                    <TableCell>{fee.class}</TableCell>
                    <TableCell>${fee.amount}</TableCell>
                    <TableCell className="text-success">${fee.paid}</TableCell>
                    <TableCell className="text-warning">${fee.pending}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(fee.status)}>{fee.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {fee.pending > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePayment(fee.id)}
                        >
                          Pay
                        </Button>
                      )}
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
};

export default Fees;
