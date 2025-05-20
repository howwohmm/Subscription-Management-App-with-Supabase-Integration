import React from 'react';
import { Progress } from '../ui/progress';
interface SubscriptionHealthScoreProps {
  score: number;
}
export const SubscriptionHealthScore = ({
  score
}: SubscriptionHealthScoreProps) => {
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  const getScoreText = () => {
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };
  const getScoreDescription = () => {
    if (score >= 80) return 'Your subscriptions are well-managed';
    if (score >= 60) return 'Some subscriptions need attention';
    return 'Review your subscriptions soon';
  };
  const getProgressColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return <div>
      <div className="flex items-baseline">
        <span className={`text-2xl font-bold ${getScoreColor()}`}>
          {getScoreText()}
        </span>
        <span className="ml-2 text-sm text-muted-foreground">
          ({score}/100)
        </span>
      </div>
      <div className="mt-2">
        <Progress value={score} className="h-2">
          <div className={`h-full ${getProgressColor()}`} style={{
          width: `${score}%`
        }} />
        </Progress>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {getScoreDescription()}
      </p>
    </div>;
};