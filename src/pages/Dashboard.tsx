
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  PieChart,
  Plus,
  FileText,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Landmark
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quickExpense, setQuickExpense] = useState('');
  const [quickExpenseAmount, setQuickExpenseAmount] = useState('');
  
  // Sample data for spending chart
  const spendingData = [
    { name: 'Jan', amount: 1800 },
    { name: 'Feb', amount: 2200 },
    { name: 'Mar', amount: 1900 },
    { name: 'Apr', amount: 2318 },
    { name: 'May', amount: 0 },
    { name: 'Jun', amount: 0 },
  ];
  
  const handleQuickExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickExpense || !quickExpenseAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Expense Added",
      description: `$${quickExpenseAmount} for ${quickExpense} has been recorded.`
    });
    
    setQuickExpense('');
    setQuickExpenseAmount('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <Card className="border-accent/10 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                Welcome back, <span className="text-accent">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</span>
              </CardTitle>
              <CardDescription>Here's a summary of your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 bg-muted/60 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                    <DollarSign className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mt-1">$12,540.50</h3>
                  <p className="text-xs flex items-center text-green-500 mt-2">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +5.3% from last month
                  </p>
                </div>
                <div className="border rounded-lg p-4 bg-muted/60 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Monthly Spending</p>
                    <CreditCard className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mt-1">$2,318.25</h3>
                  <p className="text-xs flex items-center text-red-500 mt-2">
                    <ArrowDownRight className="h-3 w-3 mr-1" /> +12.7% from last month
                  </p>
                </div>
                <div className="border rounded-lg p-4 bg-muted/60 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Savings Goal</p>
                    <Landmark className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mt-1">68% <span className="text-sm font-normal">of $10,000</span></h3>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-accent h-1.5 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Spending Overview</CardTitle>
                  <div className="text-sm text-muted-foreground">Last 6 months</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Recent Transactions</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate('/transactions')}>
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
                        <p className="text-xs text-muted-foreground">Apr 6, 2025</p>
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
                        <p className="text-xs text-muted-foreground">Apr 1, 2025</p>
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
                        <p className="text-xs text-muted-foreground">Apr 3, 2025</p>
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
                        <p className="text-xs text-muted-foreground">Apr 2, 2025</p>
                      </div>
                    </div>
                    <p className="font-medium text-sm text-red-500">-$86.23</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full text-sm" onClick={() => navigate('/transactions')}>Load More</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Expense</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            
            <Card className="border-accent/20 bg-gradient-to-br from-white to-muted/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
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
            
            <Card className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <span className="w-1.5 h-6 bg-accent rounded mr-2"></span>
                  Budget Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Housing</span>
                  <span>$1,200 / $1,200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Food</span>
                  <span>$450 / $600</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Entertainment</span>
                  <span>$175 / $200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/budget')}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Budget
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
