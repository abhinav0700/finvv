
import React from "react";
import AuthForm from "./AuthForm";
import { Card } from "@/components/ui/card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Brand/Image Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-secondary p-8 text-white items-center justify-center">
        <div className="max-w-md">
          <div className="mb-8 flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Finvv</h1>
            <div className="h-1 w-20 bg-accent ml-4 rounded"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Take control of your financial future</h2>
          
          
          {/* Feature list */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-accent text-accent-foreground rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <span>Track your spending habits</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-accent text-accent-foreground rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <span>Set and achieve savings goals</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-accent text-accent-foreground rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span>Expert financial insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md border border-border/50 shadow-lg hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
          <div className="p-8">
            <div className="mb-6 md:hidden">
              <h1 className="text-2xl font-bold text-primary">FriendlyFinance</h1>
              <p className="text-sm text-accent mt-1">Your personal finance companion</p>
            </div>
            
            <AuthForm />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
