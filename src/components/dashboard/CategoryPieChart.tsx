import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getCategoryColor } from '../../lib/utils';
interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}
interface CategoryPieChartProps {
  data: CategoryData[];
}
export const CategoryPieChart = ({
  data
}: CategoryPieChartProps) => {
  const COLORS = data.map(item => getCategoryColor(item.category).replace('bg-', 'text-'));
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
        {`${(percent * 100).toFixed(0)}%`}
      </text>;
  };
  return <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="amount">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={`hsl(var(--${COLORS[index % COLORS.length].replace('text-', '')}))` || 'hsl(var(--primary))'} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>;
};