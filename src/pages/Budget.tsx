import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Home, ShoppingBag, Coffee, Car, Film, Plus, Edit2, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Budget = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Housing', allocated: 1200, spent: 1200, icon: <Home className="h-4 w-4" />, color: '#ff6384' },
    { id: 2, category: 'Food', allocated: 600, spent: 450, icon: <Coffee className="h-4 w-4" />, color: '#36a2eb' },
    { id: 3, category: 'Transportation', allocated: 300, spent: 250, icon: <Car className="h-4 w-4" />, color: '#ffcd56' },
    { id: 4, category: 'Entertainment', allocated: 200, spent: 175, icon: <Film className="h-4 w-4" />, color: '#4bc0c0' },
    { id: 5, category: 'Shopping', allocated: 400, spent: 380, icon: <ShoppingBag className="h-4 w-4" />, color: '#9966ff' },
    { id: 6, category: 'Other', allocated: 300, spent: 120, icon: <CreditCard className="h-4 w-4" />, color: '#ff9f40' }
  ]);

  const totalBudget = budgets.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
  
  const [newBudget, setNewBudget] = useState({
    category: '',
    allocated: '',
  });
  
  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.allocated) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const budget = {
      id: budgets.length + 1,
      category: newBudget.category,
      allocated: parseFloat(newBudget.allocated),
      spent: 0,
      icon: <CreditCard className="h-4 w-4" />,
      color: getRandomColor()
    };
    
    setBudgets([...budgets, budget]);
    setDialogOpen(false);
    setNewBudget({
      category: '',
      allocated: '',
    });
    
    toast({
      title: "Success",
      description: "Budget category added successfully",
    });
  };
  
  const getRandomColor = () => {
    const colors = ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#15bea9', '#745af2'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const chartData = budgets.map(item => ({
    name: item.category,
    value: item.allocated,
    color: item.color
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Budget Overview</CardTitle>
                  <CardDescription>Manage your monthly budget</CardDescription>
                </div>
                
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-1 h-4 w-4" /> Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Budget Category</DialogTitle>
                      <DialogDescription>
                        Create a new budget category to track your expenses
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category Name</Label>
                        <Input 
                          id="category" 
                          value={newBudget.category} 
                          onChange={e => setNewBudget({...newBudget, category: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="allocated">Allocated Budget ($)</Label>
                        <Input 
                          id="allocated" 
                          type="number"
                          value={newBudget.allocated} 
                          onChange={e => setNewBudget({...newBudget, allocated: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddBudget}>Add Budget</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b">
                  <div>
                    <h3 className="text-lg font-medium">Monthly Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      Spent ${totalSpent.toFixed(2)} of ${totalBudget.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <div className="text-sm font-medium">
                      {((totalSpent / totalBudget) * 100).toFixed(1)}% spent
                    </div>
                    <Progress value={(totalSpent / totalBudget) * 100} className="w-[180px]" />
                  </div>
                </div>
                
                {budgets.map(budget => (
                  <div key={budget.id} className="flex justify-between items-center pb-4 last:pb-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${budget.color}30` }}>
                        {budget.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{budget.category}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          ${budget.spent.toFixed(2)} of ${budget.allocated.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="w-[120px]">
                      <div className="text-xs font-medium flex justify-between mb-1">
                        <span>{((budget.spent / budget.allocated) * 100).toFixed(1)}%</span>
                        {budget.spent > budget.allocated && (
                          <span className="text-red-500">Overspent</span>
                        )}
                      </div>
                      <Progress 
                        value={(budget.spent / budget.allocated) * 100} 
                        className={budget.spent > budget.allocated ? "bg-red-200" : ""}
                        indicatorClassName={budget.spent > budget.allocated ? "bg-red-500" : ""}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                {chartData.map((entry, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="truncate">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Savings Goals</CardTitle>
            <CardDescription>Track progress towards your financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Emergency Fund</h3>
                  <span className="text-sm bg-accent/20 text-accent-foreground px-2 py-1 rounded">Priority</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>$6,000 of $10,000</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="mb-2" />
                <p className="text-xs text-muted-foreground">Target date: December 2025</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Vacation Fund</h3>
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">In Progress</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>$2,500 of $5,000</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="mb-2" />
                <p className="text-xs text-muted-foreground">Target date: August 2025</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">New Car</h3>
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Long Term</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>$8,000 of $25,000</span>
                  <span>32%</span>
                </div>
                <Progress value={32} className="mb-2" />
                <p className="text-xs text-muted-foreground">Target date: January 2027</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Plus className="mr-1 h-4 w-4" /> Add New Goal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
