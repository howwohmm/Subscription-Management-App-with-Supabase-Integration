import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
}
export const subscriptionCategories = [{
  name: 'Entertainment',
  color: 'bg-blue-500'
}, {
  name: 'Productivity',
  color: 'bg-green-500'
}, {
  name: 'Utilities',
  color: 'bg-yellow-500'
}, {
  name: 'Shopping',
  color: 'bg-purple-500'
}, {
  name: 'Health',
  color: 'bg-red-500'
}, {
  name: 'Other',
  color: 'bg-gray-500'
}];
export function getCategoryColor(category: string): string {
  const foundCategory = subscriptionCategories.find(c => c.name.toLowerCase() === category.toLowerCase());
  return foundCategory?.color || 'bg-gray-500';
}