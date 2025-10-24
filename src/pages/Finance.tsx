import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Download } from 'lucide-react';

export default function Finance() {
  const transactions = [
    { id: 1, date: '2025-03-15', description: 'Student Fee Collection', amount: 125000, type: 'Income' },
    { id: 2, date: '2025-03-14', description: 'Staff Salaries', amount: -185000, type: 'Expense' },
    { id: 3, date: '2025-03-13', description: 'Infrastructure Maintenance', amount: -45000, type: 'Expense' },
    { id: 4, date: '2025-03-12', description: 'Library Books Purchase', amount: -28000, type: 'Expense' },
    { id: 5, date: '2025-03-10', description: 'Admission Fees', amount: 95000, type: 'Income' },
  ];

  const summary = [
    { label: 'Total Income', value: '₹52.5L', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { label: 'Total Expenses', value: '₹38.2L', change: '+5.2%', trend: 'down', icon: TrendingDown },
    { label: 'Net Balance', value: '₹14.3L', change: '+18.3%', trend: 'up', icon: DollarSign },
    { label: 'Budget Utilization', value: '73%', change: '-2.1%', trend: 'neutral', icon: PieChart },
  ];

    const getStatusColor = (status: string) => {
    switch (status) {
      case 'Income':
        return 'bg-success/30 text-foreground/70';
      case 'Expense':
        return 'bg-warning/30 text-foreground/70';
      
      default:
        return 'bg-muted/30 text-foreground/70';
    }
  };
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium text-foreground">Finance Overview</h1>
            <p className="text-muted-foreground mt-1">
              Track income, expenses, and financial health
            </p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download Statement
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {summary.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <item.icon className={`w-4 h-4 ${
                    item.trend === 'up' ? 'text-success' : 
                    item.trend === 'down' ? 'text-destructive' : 
                    'text-muted-foreground'
                  }`} />
                </div>
                <p className="text-2xl font-medium">{item.value}</p>
                <p className={`text-xs mt-1 ${
                  item.trend === 'up' ? 'text-success' : 
                  item.trend === 'down' ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  {item.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.amount > 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
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
