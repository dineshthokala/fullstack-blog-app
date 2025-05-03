
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Navbar } from "@/components/Navbar";
import { BlogCard } from "@/components/BlogCard";
import { getBlogs } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const { blogs, total } = getBlogs(currentPage, blogsPerPage);
  const totalPages = Math.ceil(total / blogsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Where <span className="text-primary">Ideas</span> Find Their Voice
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover stories, thinking, and expertise from writers on any topic. Start writing today.
              </p>
              {isAuthenticated ? (
                <Button asChild size="lg" className="mt-6">
                  <Link to="/create">Start Writing</Link>
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button asChild size="lg" variant="outline">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild size="lg">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        </section>
        
        {/* Featured Blog */}
        {blogs.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Featured Stories</h2>
              <BlogCard blog={blogs[0]} variant="wide" />
            </div>
          </section>
        )}
        
        {/* Blog List */}
        <section className="py-12 md:py-16 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Latest Stories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(1).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(prev => Math.max(prev - 1, 1));
                          }} 
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          href="#" 
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                          }} 
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Serene Story Sphere. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
