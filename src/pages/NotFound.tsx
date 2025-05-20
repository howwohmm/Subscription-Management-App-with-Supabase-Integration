import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
const NotFound = () => {
  return <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4 mb-8">Page not found</p>
      <Button asChild>
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>;
};
export default NotFound;