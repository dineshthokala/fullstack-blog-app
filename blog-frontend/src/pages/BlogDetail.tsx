
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Navbar } from "@/components/Navbar";
import { BlogCard } from "@/components/BlogCard";
import { getBlogById, getBlogs, deleteBlog } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Pencil, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const blog = id ? getBlogById(id) : null;
  const { blogs } = getBlogs(1, 3);
  const relatedBlogs = blogs.filter(b => b.id !== id).slice(0, 3);
  
  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-24 text-center">
          <h1 className="text-3xl font-serif font-bold">Blog not found</h1>
          <p className="text-muted-foreground mt-4">
            The blog you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="mt-8">
            <Link to="/">Back to homepage</Link>
          </Button>
        </div>
      </>
    );
  }
  
  const formattedDate = format(new Date(blog.createdAt), "MMMM d, yyyy");
  const isAuthor = user?.id === blog.authorId;
  
  const handleDelete = () => {
    if (id) {
      const success = deleteBlog(id);
      if (success) {
        toast({
          title: "Blog deleted",
          description: "Your blog has been deleted successfully.",
        });
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: "There was a problem deleting the blog.",
          variant: "destructive",
        });
      }
    }
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 page-transition">
        <article className="py-8 md:py-12">
          {/* Back navigation */}
          <div className="container mx-auto px-4 md:px-6 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to blogs
              </Link>
            </Button>
          </div>
          
          {/* Blog Header */}
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2 md:gap-4">
                <span>{blog.authorName}</span>
                <span className="inline-block">•</span>
                <span>{formattedDate}</span>
                <span className="inline-block">•</span>
                <span>{blog.readingTime}</span>
              </div>
            </div>
            
            {/* Admin Controls */}
            {isAuthor && (
              <div className="mb-8 flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link to={`/edit/${blog.id}`}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
          
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="container mx-auto px-4 md:px-6 max-w-5xl my-8">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          {/* Blog Content */}
          <div className="container mx-auto px-4 md:px-6 max-w-3xl my-8">
            <div className="prose prose-slate md:prose-lg max-w-none">
              <ReactMarkdown>
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
        
        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-2xl font-serif font-bold mb-8">Related Stories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </section>
        )}
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
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this blog?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your blog and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
