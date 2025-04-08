
import React, { ReactNode, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  PieChart, 
  User, 
  Settings, 
  Calendar, 
  Menu,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const userInitials = user?.user_metadata?.full_name 
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || 'FV';

  const navItems = [
    { label: 'Overview', icon: <PieChart className="mr-2 h-4 w-4" />, path: '/dashboard' },
    { label: 'Transactions', icon: <CreditCard className="mr-2 h-4 w-4" />, path: '/transactions' },
    { label: 'Budget', icon: <PieChart className="mr-2 h-4 w-4" />, path: '/budget' },
    { label: 'Investments', icon: <TrendingUp className="mr-2 h-4 w-4" />, path: '/investments' },
    { label: 'Calendar', icon: <Calendar className="mr-2 h-4 w-4" />, path: '/calendar' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
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
                    <Button variant="ghost" size="sm" className="w-full justify-start text-left" onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-left" onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-left" onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex">
        {/* Sidebar */}
        <div className={`fixed md:static inset-y-0 left-0 transform ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-200 ease-in-out z-50 w-64 md:w-56 bg-white md:bg-transparent md:mr-6 h-full md:h-auto overflow-y-auto md:overflow-visible`}>
          <div className="p-4 md:p-0">
            <div className="md:hidden flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-primary">
                Fin<span className="gold-text">vv</span>
              </h1>
              <Button variant="ghost" size="sm" onClick={() => setMobileSidebarOpen(false)}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <p className="text-sm font-medium text-gray-500">Main Menu</p>
                </div>
                <div className="p-2">
                  {navItems.map((item) => (
                    <Button 
                      key={item.path}
                      variant={isActive(item.path) ? 'secondary' : 'ghost'} 
                      className="w-full justify-start text-left mb-1"
                      onClick={() => {
                        navigate(item.path);
                        setMobileSidebarOpen(false);
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 md:pl-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
