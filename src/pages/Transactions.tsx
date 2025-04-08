import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Filter, Plus, Download, Calendar, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';

const Transactions = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Amazon Purchase', date: '2025-04-05', amount: -24.99, category: 'Shopping', status: 'Completed' },
    { id: 2, description: 'Salary Deposit', date: '2025-04-01', amount: 3250.00, category: 'Income', status: 'Completed' },
    { id: 3, description: 'Starbucks Coffee', date: '2025-04-03', amount: -5.75, category: 'Food & Drinks', status: 'Completed' },
    { id: 4, description: 'Grocery Shopping', date: '2025-04-02', amount: -86.23, category: 'Groceries', status: 'Completed' },
    { id: 5, description: 'Monthly Rent', date: '2025-04-01', amount: -1200.00, category: 'Housing', status: 'Completed' },
    { id: 6, description: 'Netflix Subscription', date: '2025-04-05', amount: -14.99, category: 'Entertainment', status: 'Pending' },
    { id: 7, description: 'Gas Station', date: '2025-04-04', amount: -45.30, category: 'Transport', status: 'Completed' }
  ]);
  
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: 'Other',
    date: new Date().toISOString().split('T')[0]
  });
  
  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const amount = parseFloat(newTransaction.amount);
    
    const transaction = {
      id: transactions.length + 1,
      description: newTransaction.description,
      date: newTransaction.date,
      amount: amount,
      category: newTransaction.category,
      status: 'Completed'
    };
    
    setTransactions([transaction, ...transactions]);
    setDialogOpen(false);
    setNewTransaction({
      description: '',
      amount: '',
      category: 'Other',
      date: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
  };
  
  const filteredTransactions = transactions
    .filter(t => {
      if (filter === 'all') return true;
      if (filter === 'income') return t.amount > 0;
      if (filter === 'expenses') return t.amount < 0;
      return t.category.toLowerCase() === filter.toLowerCase();
    })
    .filter(t => {
      if (!searchQuery) return true;
      return t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
             t.category.toLowerCase().includes(searchQuery.toLowerCase());
    });
    
  const categories = ['Shopping', 'Food & Drinks', 'Groceries', 'Housing', 'Entertainment', 'Transport', 'Income', 'Other'];
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Shopping': 'bg-blue-100',
      'Food & Drinks': 'bg-purple-100',
      'Groceries': 'bg-orange-100',
      'Housing': 'bg-red-100',
      'Entertainment': 'bg-indigo-100',
      'Transport': 'bg-yellow-100',
      'Income': 'bg-green-100',
      'Other': 'bg-gray-100'
    };
    return colors[category] || 'bg-gray-100';
  };
  
  const getCategoryTextColor = (category: string) => {
    const colors: Record<string, string> = {
      'Shopping': 'text-blue-600',
      'Food & Drinks': 'text-purple-600',
      'Groceries': 'text-orange-600',
      'Housing': 'text-red-600',
      'Entertainment': 'text-indigo-600',
      'Transport': 'text-yellow-600',
      'Income': 'text-green-600',
      'Other': 'text-gray-600'
    };
    return colors[category] || 'text-gray-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <CardTitle className="text-xl">Transactions</CardTitle>
                <CardDescription>View and manage your transactions</CardDescription>
              </div>
              <div className="flex mt-3 sm:mt-0">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mr-2">
                      <Plus className="mr-1 h-4 w-4" /> Add Transaction
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Transaction</DialogTitle>
                      <DialogDescription>
                        Enter the details of your transaction below
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input 
                          id="description" 
                          value={newTransaction.description} 
                          onChange={e => setNewTransaction({...newTransaction, description: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="amount">Amount (use negative for expenses)</Label>
                        <Input 
                          id="amount" 
                          type="number"
                          value={newTransaction.amount} 
                          onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={newTransaction.category} 
                          onValueChange={val => setNewTransaction({...newTransaction, category: val})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={newTransaction.date} 
                          onChange={e => setNewTransaction({...newTransaction, date: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddTransaction}>Add Transaction</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm">
                  <Download className="mr-1 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expenses">Expenses Only</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4 mt-4">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No transactions found
                </div>
              ) : (
                filteredTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-muted/30 px-2 rounded-md transition-colors">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(transaction.category)}`}>
                        <CreditCard className={`h-5 w-5 ${getCategoryTextColor(transaction.category)}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" /> 
                          {transaction.date}
                          <span className="mx-1">•</span>
                          <span className={transaction.status === 'Pending' ? "text-yellow-500" : "text-green-500"}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className={`font-medium text-sm ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full flex justify-center">
              <Button variant="outline" size="sm" className="w-full max-w-xs">
                Load More
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
