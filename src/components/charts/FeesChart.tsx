import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', collected: 45000, pending: 5000 },
  { month: 'Feb', collected: 48000, pending: 2000 },
  { month: 'Mar', collected: 46000, pending: 4000 },
  { month: 'Apr', collected: 50000, pending: 0 },
  { month: 'May', collected: 47000, pending: 3000 },
  { month: 'Jun', collected: 49000, pending: 1000 },
];

export const FeesChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="collected" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
        <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
