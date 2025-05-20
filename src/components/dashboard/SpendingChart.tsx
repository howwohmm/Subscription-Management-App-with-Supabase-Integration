import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../lib/utils';
// Sample data for the chart
const data = [{
  month: 'Jan',
  amount: 79.99
}, {
  month: 'Feb',
  amount: 79.99
}, {
  month: 'Mar',
  amount: 79.99
}, {
  month: 'Apr',
  amount: 84.99
}, {
  month: 'May',
  amount: 84.99
}, {
  month: 'Jun',
  amount: 89.97
}, {
  month: 'Jul',
  amount: 89.97
}, {
  month: 'Aug',
  amount: 89.97
}, {
  month: 'Sep',
  amount: 89.97
}, {
  month: 'Oct',
  amount: 89.97
}, {
  month: 'Nov',
  amount: 89.97
}, {
  month: 'Dec',
  amount: 89.97
}];
const CustomTooltip = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return <div className="bg-popover border border-border rounded-md shadow-md p-3">
        <p className="font-medium">{label}</p>
        <p className="text-primary">{formatCurrency(payload[0].value)}</p>
      </div>;
  }
  return null;
};
export const SpendingChart = () => {
  return <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 5
    }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
        <XAxis dataKey="month" tick={{
        fontSize: 12
      }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={value => `$${value}`} tick={{
        fontSize: 12
      }} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>;
};