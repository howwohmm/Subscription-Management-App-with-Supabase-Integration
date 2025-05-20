import React, { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { Card, CardContent } from '../ui/card';
import { formatCurrency } from '../../lib/utils';
// Sample subscription data
const subscriptions = [{
  id: 1,
  name: 'Netflix',
  amount: 15.99,
  renewalDay: 22,
  category: 'Entertainment',
  logo: 'N'
}, {
  id: 2,
  name: 'Spotify',
  amount: 9.99,
  renewalDay: 24,
  category: 'Entertainment',
  logo: 'S'
}, {
  id: 3,
  name: 'Adobe Creative Cloud',
  amount: 52.99,
  renewalDay: 28,
  category: 'Productivity',
  logo: 'A'
}, {
  id: 4,
  name: 'Disney+',
  amount: 7.99,
  renewalDay: 15,
  category: 'Entertainment',
  logo: 'D'
}];
export const SubscriptionCalendarView = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  // Get subscriptions for the selected day
  const subscriptionsForDay = selectedDay ? subscriptions.filter(sub => sub.renewalDay === selectedDay) : [];
  // Function to determine which days have subscriptions
  const getDaysWithSubscriptions = (day: Date) => {
    const dayOfMonth = day.getDate();
    return subscriptions.some(sub => sub.renewalDay === dayOfMonth);
  };
  const handleDayClick = (day: Date) => {
    setSelectedDay(day.getDate());
  };
  return <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Calendar mode="single" selected={date} onSelect={newDate => {
        if (newDate) {
          setDate(newDate);
          handleDayClick(newDate);
        }
      }} className="rounded-md border" modifiers={{
        hasSubscription: day => getDaysWithSubscriptions(day)
      }} modifiersClassNames={{
        hasSubscription: 'bg-primary/20 font-bold'
      }} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-4">
          {selectedDay ? `Subscriptions on ${selectedDay}` : 'Select a day to see subscriptions'}
        </h3>
        {subscriptionsForDay.length > 0 ? <div className="space-y-4">
            {subscriptionsForDay.map(subscription => <Card key={subscription.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {subscription.logo}
                    </div>
                    <div>
                      <p className="font-medium">{subscription.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.category}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatCurrency(subscription.amount)}
                  </p>
                </CardContent>
              </Card>)}
          </div> : selectedDay ? <p className="text-muted-foreground">No subscriptions on this day</p> : null}
      </div>
    </div>;
};