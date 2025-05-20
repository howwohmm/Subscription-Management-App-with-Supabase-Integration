import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../lib/utils';
// Sample data
const subscriptions = [{
  name: 'Netflix',
  monthlyPrice: 15.99,
  annualPrice: 15.99 * 12,
  annualDiscount: 0
}, {
  name: 'Spotify',
  monthlyPrice: 9.99,
  annualPrice: 99,
  annualDiscount: 20.88
}, {
  name: 'Adobe CC',
  monthlyPrice: 52.99,
  annualPrice: 599.88,
  annualDiscount: 36
}, {
  name: 'Amazon Prime',
  monthlyPrice: 14.99,
  annualPrice: 139,
  annualDiscount: 40.88
}];
const data = subscriptions.map(sub => ({
  name: sub.name,
  Monthly: sub.monthlyPrice * 12,
  Annual: sub.annualPrice,
  Savings: sub.annualDiscount
}));
const CustomTooltip = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return <div className="bg-popover border border-border rounded-md shadow-md p-3">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => <p key={`item-${index}`} style={{
        color: entry.color
      }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>)}
        {payload[0].payload.Savings > 0 && <p className="text-green-500 font-medium mt-2">
            Save {formatCurrency(payload[0].payload.Savings)} with annual
            billing
          </p>}
      </div>;
  }
  return null;
};
export const MonthlyVsAnnualComparison = () => {
  // Calculate total savings
  const totalSavings = subscriptions.reduce((sum, sub) => sum + sub.annualDiscount, 0);
  return <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Potential annual savings
          </p>
          <p className="text-2xl font-bold text-green-500">
            {formatCurrency(totalSavings)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Subscriptions analyzed
          </p>
          <p className="text-2xl font-bold">{subscriptions.length}</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={value => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Monthly" name="Monthly (Annual Cost)" fill="hsl(var(--primary))" />
            <Bar dataKey="Annual" name="Annual Plan" fill="hsl(var(--accent))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subscriptions.map((sub, index) => <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <p className="font-medium">{sub.name}</p>
              <div className="flex text-sm text-muted-foreground">
                <p>Monthly: {formatCurrency(sub.monthlyPrice)}</p>
                <span className="mx-1">•</span>
                <p>Annual: {formatCurrency(sub.annualPrice / 12)}/mo</p>
              </div>
            </div>
            {sub.annualDiscount > 0 ? <div className="text-right">
                <p className="text-sm text-green-500 font-medium">
                  Save {formatCurrency(sub.annualDiscount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(sub.annualDiscount / (sub.monthlyPrice * 12) * 100)}
                  % discount
                </p>
              </div> : <p className="text-sm text-muted-foreground">
                No annual discount
              </p>}
          </div>)}
      </div>
    </div>;
};