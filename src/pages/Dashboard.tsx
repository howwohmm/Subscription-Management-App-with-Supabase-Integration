import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, CreditCard, TrendingUp, Calendar, PieChart, Bell, Check, ChevronRight, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, getCategoryColor } from '../lib/utils';
import { AddSubscriptionDialog } from '../components/subscriptions/AddSubscriptionDialog';
import { SubscriptionHealthScore } from '../components/dashboard/SubscriptionHealthScore';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { CategoryPieChart } from '../components/dashboard/CategoryPieChart';
const Dashboard = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // Placeholder data
  const totalMonthlySpend = 89.97;
  const totalAnnualSpend = 1079.64;
  const monthlyChange = 2.5; // percentage
  const upcomingPayments = [{
    id: 1,
    name: 'Netflix',
    amount: 15.99,
    date: '2023-05-22',
    logo: 'https://logo.clearbit.com/netflix.com',
    category: 'Entertainment'
  }, {
    id: 2,
    name: 'Spotify',
    amount: 9.99,
    date: '2023-05-24',
    logo: 'https://logo.clearbit.com/spotify.com',
    category: 'Entertainment'
  }, {
    id: 3,
    name: 'Adobe Creative Cloud',
    amount: 52.99,
    date: '2023-05-28',
    logo: 'https://logo.clearbit.com/adobe.com',
    category: 'Productivity'
  }];
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your subscription spending
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Subscription
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalMonthlySpend)}
            </div>
            <div className="flex items-center mt-1">
              {monthlyChange > 0 ? <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" /> : <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />}
              <p className={`text-xs ${monthlyChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {monthlyChange > 0 ? '+' : ''}
                {monthlyChange}% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalAnnualSpend)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Projected yearly total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 renewing this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscription Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionHealthScore score={85} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>
              Your next 30 days of subscription payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map(payment => <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-background border border-border overflow-hidden flex items-center justify-center">
                      {payment.logo ? <img src={payment.logo} alt={payment.name} className="h-full w-full object-cover" /> : <span className="font-medium text-lg">
                          {payment.name.charAt(0)}
                        </span>}
                    </div>
                    <div>
                      <p className="font-medium">{payment.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(payment.date).toLocaleDateString()}
                        <span className="mx-1.5">•</span>
                        <span className={`w-2 h-2 rounded-full ${getCategoryColor(payment.category)}`}></span>
                        <span className="ml-1">{payment.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>
                </div>)}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="ghost" className="w-full justify-between">
              View All Upcoming Payments
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>
              How your subscriptions are distributed
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex justify-center mb-6">
              <CategoryPieChart data={categoryBreakdown} />
            </div>
            <div className="space-y-4">
              {categoryBreakdown.map(category => <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full ${getCategoryColor(category.category)} mr-2`}></span>
                      <p className="text-sm font-medium">{category.category}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatCurrency(category.amount)}
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className={`h-2 rounded-full ${getCategoryColor(category.category)}`} style={{
                  width: `${category.percentage}%`
                }} />
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Trend</CardTitle>
          <CardDescription>
            Track how your subscription costs change over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <SpendingChart />
        </CardContent>
      </Card>
      <AddSubscriptionDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>;
};
export default Dashboard;