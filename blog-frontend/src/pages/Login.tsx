import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { AuthLayout } from "@/components/AuthLayout";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { login } from '../lib/api';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const { login: authLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await authLogin(values.email, values.password);
      // Redirect is handled by AuthLayout
    } catch (error) {
      setIsSubmitting(false);
      // Error is handled by the auth context
    }
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(form.getValues("email"), form.getValues("password"));
      console.log('Login successful:', data);

      // Store the token in local storage
      localStorage.setItem('token', data.access);
      console.log('Token stored in local storage:', data.access);

      toast({
        title: "Login successful",
        description: "You are now logged in!",
      });

      // Redirect to the home page or another route
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  // Pre-fill the demo account for convenience
  const fillDemoAccount = () => {
    form.setValue("email", "demo@example.com");
    form.setValue("password", "password123");
  };

  return (
    <>
      <Navbar />
      <AuthLayout requireAuth={false}>
        <div className="container max-w-md mx-auto py-12 page-transition">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-serif font-semibold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Email address" 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="Password" 
                          type="password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Sign in
                </Button>
              </form>
            </Form>
            
            <div className="text-center text-sm">
              <Button 
                variant="link" 
                type="button"
                onClick={fillDemoAccount}
                className="text-primary"
              >
                Use demo account
              </Button>
            </div>
            
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Button variant="link" asChild className="p-0">
                <Link to="/signup" className="text-primary">
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
