import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  PieChart, 
  User, 
  Settings, 
  Calendar, 
  Plus,
  FileText,
  ChevronRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [quickExpense, setQuickExpense] = useState('');
  const [quickExpenseAmount, setQuickExpenseAmount] = useState('');
  
  const userInitials = user?.user_metadata?.full_name 
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || 'FV';
  
  const handleQuickExpense = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Expense added:', quickExpense, quickExpenseAmount);
    setQuickExpense('');
    setQuickExpenseAmount('');
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary mr-2">
              Fin<span className="gold-text">vv</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="flex items-center hover:bg-muted p-2 rounded-full transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt={user?.user_metadata?.full_name || user?.email || 'User'} />
                    <AvatarFallback className="bg-accent text-accent-foreground">{userInitials}</AvatarFallback>
                  </Avatar>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-56" align="end">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt="Profile" />
                      <AvatarFallback className="bg-accent text-accent-foreground">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.user_metadata.full_name || user?.email}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-left" onClick={() => setActiveTab('profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-left" onClick={() => setActiveTab('settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-left" onClick={signOut}>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 space-y-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <p className="text-sm font-medium text-gray-500">Main Menu</p>
            </div>
            <div className="p-2">
              <Button 
                variant={activeTab === 'overview' ? 'secondary' : 'ghost'} 
                className="w-full justify-start text-left mb-1"
                onClick={() => setActiveTab('overview')}
              >
                <PieChart className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button 
                variant={activeTab === 'wallet' ? 'secondary' : 'ghost'} 
                className="w-full justify-start text-left mb-1"
                onClick={() => setActiveTab('wallet')}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Wallet
              </Button>
              <Button 
                variant={activeTab === 'transactions' ? 'secondary' : 'ghost'} 
                className="w-full justify-start text-left mb-1"
                onClick={() => setActiveTab('transactions')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Transactions
              </Button>
              <Button 
                variant={activeTab === 'investments' ? 'secondary' : 'ghost'} 
                className="w-full justify-start text-left mb-1"
                onClick={() => setActiveTab('investments')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Investments
              </Button>
              <Button 
                variant={activeTab === 'budget' ? 'secondary' : 'ghost'} 
                className="w-full justify-start text-left mb-1"
                onClick={() => setActiveTab('budget')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Budget
              </Button>
              <Button 
                variant={activeTab === 'calendar' ? 'secondary' : 'ghost'} 
                className="w-full justify-start text-left"
                onClick={() => setActiveTab('calendar')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-500">Quick Expense</p>
            </div>
            <form onSubmit={handleQuickExpense} className="space-y-3">
              <div>
                <Label htmlFor="expense">Description</Label>
                <Input 
                  id="expense" 
                  placeholder="Coffee, Lunch, etc." 
                  value={quickExpense} 
                  onChange={(e) => setQuickExpense(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  placeholder="$0.00" 
                  value={quickExpenseAmount} 
                  onChange={(e) => setQuickExpenseAmount(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </form>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-accent/10 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    Welcome back, <span className="text-accent">{user?.user_metadata.full_name || user?.email?.split('@')[0] || 'User'}</span>
                  </CardTitle>
                  <CardDescription>Here's a summary of your financial health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 bg-muted/60">
                      <p className="text-sm text-muted-foreground">Total Balance</p>
                      <h3 className="text-2xl font-bold mt-1">$12,540.50</h3>
                      <p className="text-xs flex items-center text-green-500 mt-2">
                        <TrendingUp className="h-3 w-3 mr-1" /> +5.3% from last month
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 bg-muted/60">
                      <p className="text-sm text-muted-foreground">Monthly Spending</p>
                      <h3 className="text-2xl font-bold mt-1">$2,318.25</h3>
                      <p className="text-xs flex items-center text-red-500 mt-2">
                        <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> +12.7% from last month
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 bg-muted/60">
                      <p className="text-sm text-muted-foreground">Savings Goal</p>
                      <h3 className="text-2xl font-bold mt-1">68% <span className="text-sm font-normal">of $10,000</span></h3>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div className="bg-accent h-1.5 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab('transactions')}>
                      View All <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded-md transition-colors">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Amazon Purchase</p>
                          <p className="text-xs text-muted-foreground">May 22, 2025</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm text-red-500">-$24.99</p>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded-md transition-colors">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Wallet className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Salary Deposit</p>
                          <p className="text-xs text-muted-foreground">May 15, 2025</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm text-green-500">+$3,250.00</p>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded-md transition-colors">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Starbucks Coffee</p>
                          <p className="text-xs text-muted-foreground">May 13, 2025</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm text-red-500">-$5.75</p>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded-md transition-colors">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Grocery Shopping</p>
                          <p className="text-xs text-muted-foreground">May 10, 2025</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm text-red-500">-$86.23</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full text-sm">Load More</Button>
                </CardFooter>
              </Card>

              <Card className="border-accent/20 bg-gradient-to-br from-white to-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-1.5 h-6 bg-accent rounded mr-2"></span>
                    Financial Tip of the Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>The 50/30/20 Rule:</strong> Allocate 50% of your income to needs, 30% to wants, 
                    and 20% to savings and debt repayment. This simple budgeting approach can help you maintain 
                    financial balance and build wealth over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt="Profile" />
                      <AvatarFallback className="bg-accent text-accent-foreground text-xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{user?.user_metadata?.full_name || 'Update your profile'}</h3>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue={user?.user_metadata?.full_name || ''} placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={user?.email || ''} disabled />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input id="timezone" placeholder="Select your timezone" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {(activeTab !== 'overview' && activeTab !== 'profile') && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</CardTitle>
                <CardDescription>This feature is coming soon!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-10">
                  <p className="text-muted-foreground text-center">
                    We're working on bringing you the best {activeTab} experience.
                    <br />
                    Check back soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
