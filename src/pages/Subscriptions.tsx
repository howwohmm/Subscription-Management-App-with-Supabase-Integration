import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Share2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { formatCurrency, getCategoryColor } from '../lib/utils';
import { AddSubscriptionDialog } from '../components/subscriptions/AddSubscriptionDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
const Subscriptions = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('price-high');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  // Placeholder data
  const subscriptions = [{
    id: 1,
    name: 'Netflix',
    amount: 15.99,
    billingCycle: 'monthly',
    category: 'Entertainment',
    renewalDate: '2023-05-22',
    logo: 'https://logo.clearbit.com/netflix.com'
  }, {
    id: 2,
    name: 'Spotify',
    amount: 9.99,
    billingCycle: 'monthly',
    category: 'Entertainment',
    renewalDate: '2023-05-24',
    logo: 'https://logo.clearbit.com/spotify.com'
  }, {
    id: 3,
    name: 'Adobe Creative Cloud',
    amount: 52.99,
    billingCycle: 'monthly',
    category: 'Productivity',
    renewalDate: '2023-05-28',
    logo: 'https://logo.clearbit.com/adobe.com'
  }, {
    id: 4,
    name: 'Amazon Prime',
    amount: 139,
    billingCycle: 'annual',
    category: 'Shopping',
    renewalDate: '2023-09-15',
    logo: 'https://logo.clearbit.com/amazon.com'
  }, {
    id: 5,
    name: 'Disney+',
    amount: 7.99,
    billingCycle: 'monthly',
    category: 'Entertainment',
    renewalDate: '2023-05-30',
    logo: 'https://logo.clearbit.com/disneyplus.com'
  }, {
    id: 6,
    name: 'Microsoft 365',
    amount: 99.99,
    billingCycle: 'annual',
    category: 'Productivity',
    renewalDate: '2023-08-15',
    logo: 'https://logo.clearbit.com/microsoft.com'
  }];
  // Filter and sort subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()) && (categoryFilter === 'all' || sub.category === categoryFilter)).sort((a, b) => {
    if (sortOrder === 'price-high') return b.amount - a.amount;
    if (sortOrder === 'price-low') return a.amount - b.amount;
    if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOrder === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });
  const handleDeleteClick = subscription => {
    setSubscriptionToDelete(subscription);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    // Here you would delete the subscription
    setDeleteDialogOpen(false);
  };
  return <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage and track your recurring payments
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Subscription
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search subscriptions..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Productivity">Productivity</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="name-asc">Name (A to Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z to A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredSubscriptions.length === 0 ? <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No subscriptions found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubscriptions.map(subscription => <Card key={subscription.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="h-12 w-12 rounded-full bg-background border border-border overflow-hidden flex items-center justify-center">
                  {subscription.logo ? <img src={subscription.logo} alt={subscription.name} className="h-full w-full object-cover" /> : <span className="font-medium text-lg">
                      {subscription.name.charAt(0)}
                    </span>}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <CardTitle>{subscription.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={() => handleDeleteClick(subscription)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>
                    <div className="flex items-center">
                      <span>
                        {subscription.billingCycle === 'monthly' ? 'Monthly' : subscription.billingCycle === 'annual' ? 'Annual' : 'Custom'}
                      </span>
                      <span className="mx-1.5">•</span>
                      <span className={`w-2 h-2 rounded-full ${getCategoryColor(subscription.category)} mr-1`}></span>
                      {subscription.category}
                    </div>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(subscription.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {subscription.billingCycle === 'monthly' ? `${formatCurrency(subscription.amount * 12)} / year` : `${formatCurrency(subscription.amount / 12)} / month`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Renews</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(subscription.renewalDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>}
      <AddSubscriptionDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the subscription
              {subscriptionToDelete && <strong> {subscriptionToDelete.name}</strong>}
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};
export default Subscriptions;