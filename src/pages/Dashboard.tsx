
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  
  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">FriendlyFinance Dashboard</h1>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>
        
        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.user_metadata.full_name || user?.email}!</h2>
          <p className="text-gray-600">This is your personal dashboard. Here you can manage your finances and track your spending.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-lg mb-2">Quick Stats</h3>
            <p className="text-sm text-gray-600">Your financial information will appear here once you start tracking your expenses.</p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-lg mb-2">Recent Transactions</h3>
            <p className="text-sm text-gray-600">Your recent transactions will appear here once you start adding them.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
