import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { formatCurrency } from '../lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { CategoryPieChart } from '../components/dashboard/CategoryPieChart';
import { Calendar, Clock, TrendingUp, PieChart } from 'lucide-react';
import { SubscriptionCalendarView } from '../components/analytics/SubscriptionCalendarView';
import { MonthlyVsAnnualComparison } from '../components/analytics/MonthlyVsAnnualComparison';
const Analytics = () => {
  const [timeRange, setTimeRange] = useState('last-12-months');
  const categoryBreakdown = [{
    category: 'Entertainment',
    amount: 35.98,
    percentage: 40
  }, {
    category: 'Productivity',
    amount: 52.99,
    percentage: 59
  }, {
    category: 'Other',
    amount: 1,
    percentage: 1
  }];
  return <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze your subscription spending over time
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
            <SelectItem value="year-to-date">Year to date</SelectItem>
            <SelectItem value="all-time">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1079.64)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5.2% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Monthly
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(89.97)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on the last 12 months
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Expensive
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Adobe CC</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(52.99)} per month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Entertainment</div>
            <p className="text-xs text-muted-foreground mt-1">
              40% of total spending
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="calendar">Payment Calendar</TabsTrigger>
          <TabsTrigger value="comparison">Monthly vs Annual</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>
                Monthly subscription costs over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <SpendingChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>
                How your subscriptions are distributed by category
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex justify-center mb-6">
                <CategoryPieChart data={categoryBreakdown} />
              </div>
              <div className="space-y-4">
                {categoryBreakdown.map(category => <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{category.category}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(category.amount)}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className={`h-2 rounded-full ${category.category === 'Entertainment' ? 'bg-blue-500' : category.category === 'Productivity' ? 'bg-green-500' : 'bg-gray-500'}`} style={{
                    width: `${category.percentage}%`
                  }} />
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Calendar</CardTitle>
              <CardDescription>
                View when your subscriptions renew throughout the month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <SubscriptionCalendarView />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly vs Annual Comparison</CardTitle>
              <CardDescription>
                Compare the cost savings of monthly vs annual billing
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <MonthlyVsAnnualComparison />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Analytics;