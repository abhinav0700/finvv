
import React from "react";
import AuthForm from "./AuthForm";
import { Card } from "@/components/ui/card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Brand/Image Side - 30% */}
      <div className="hidden md:flex md:w-3/10 bg-gradient-to-br from-primary to-secondary p-8 text-white items-center justify-center">
        <div className="max-w-md animate-fade-in">
          <div className="mb-8 animate-scale-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text inline-block">
              Fin<span className="gold-text">vv</span>
            </h1>
            <div className="gold-line mt-2"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>Take control of your financial future</h2>
          
          {/* Feature list */}
          <div className="space-y-4">
            <div className="flex items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="mr-3 p-2 bg-accent text-accent-foreground rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <span>Track your spending habits</span>
            </div>
            <div className="flex items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="mr-3 p-2 bg-accent text-accent-foreground rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <span>Set and achieve savings goals</span>
            </div>
            <div className="flex items-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
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

      {/* Form Side - 70% */}
      <div className="w-full md:w-7/10 flex items-center justify-center p-6" style={{ backgroundColor: 'hsl(var(--beige))' }}>
        <Card className="w-full max-w-md border border-border/50 shadow-lg hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 animate-scale-in">
          <div className="p-8">
            <div className="mb-6 md:hidden animate-fade-in">
              <h1 className="text-2xl font-bold text-primary">
                Fin<span className="gold-text">vv</span>
              </h1>
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
