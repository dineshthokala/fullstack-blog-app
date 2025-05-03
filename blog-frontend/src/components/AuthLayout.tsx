
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export function AuthLayout({ children, requireAuth = true }: AuthLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }
  
  // If authentication is not required but user is authenticated (for login/signup pages)
  if (!requireAuth && isAuthenticated) {
    // Get the redirect path from state, or default to home page
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }
  
  return <>{children}</>;
}
