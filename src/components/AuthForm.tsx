import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "./AuthIcons"; // Removed AppleIcon import
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Login successful!",
          description: "Welcome back!",
        });
        
        navigate("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;
        
        toast({
          title: "Sign up successful!",
          description: "Please check your email for verification.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Redirecting...",
        description: "Please wait while we redirect you to the dashboard",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred with Google Sign In",
        variant: "destructive",
      });
    }
  };

  /* Removed: handleAppleSignIn function and its implementation */

  return (
    <div className="w-full max-w-md px-6 py-8 bg-white rounded-2xl shadow-lg">
      {/* Login/Signup Tabs */}
      <div className="flex mb-8 border-b border-gray-200">
        <button
          onClick={() => setIsLogin(true)}
          className={`auth-tab ${isLogin ? "active" : "text-gray-500"}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`auth-tab ${!isLogin ? "active" : "text-gray-500"}`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              className="auth-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            className="auth-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {isLogin && (
              <a href="#" className="gold-link text-sm">
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            className="auth-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          variant="gold"
          className="w-full premium-button"
          disabled={loading}
        >
          {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <button 
            className="social-login-btn" 
            type="button" 
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            <span>Google</span>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AuthForm;