
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, PenSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-serif text-xl font-bold tracking-tight">
            Serene Story
            <span className="text-primary">Sphere</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/create" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Write
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Log in
              </Link>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-50 bg-background flex flex-col p-6 transition-all duration-300 ease-in-out",
          isMenuOpen 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link 
            to="/" 
            className="text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/create" 
                className="text-lg font-medium flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <PenSquare className="h-5 w-5" />
                <span>Write</span>
              </Link>
              
              <hr className="border-border" />
              
              <div className="flex flex-col space-y-4">
                <div className="text-lg font-medium">
                  {user?.name}
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="justify-start px-0 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Button 
                asChild 
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
