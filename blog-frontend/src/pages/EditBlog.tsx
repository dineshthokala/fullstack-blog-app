
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Navbar } from "@/components/Navbar";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { getBlogById, updateBlog } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(200, "Excerpt must be less than 200 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const blog = id ? getBlogById(id) : null;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
    },
  });
  
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        coverImage: blog.coverImage || "",
      });
    }
    setIsLoading(false);
  }, [blog, form]);
  
  // Check if user is the author of the blog
  useEffect(() => {
    if (!isLoading && blog && user && blog.authorId !== user.id) {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to edit this blog.",
        variant: "destructive",
      });
      navigate(`/blog/${id}`);
    }
  }, [blog, user, id, isLoading, navigate, toast]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !blog || !id) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      setTimeout(() => {
        const updatedBlog = updateBlog(id, {
          title: values.title,
          excerpt: values.excerpt,
          content: values.content,
          coverImage: values.coverImage || undefined,
        });
        
        if (updatedBlog) {
          toast({
            title: "Blog updated",
            description: "Your blog has been updated successfully!",
          });
          
          navigate(`/blog/${updatedBlog.id}`);
        } else {
          throw new Error("Failed to update blog");
        }
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "There was an error updating your blog. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <AuthLayout>
          <div className="container flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </AuthLayout>
      </>
    );
  }
  
  if (!blog) {
    return (
      <>
        <Navbar />
        <AuthLayout>
          <div className="container py-16 text-center">
            <h1 className="text-3xl font-serif font-bold">Blog not found</h1>
            <p className="text-muted-foreground mt-4">
              The blog you're trying to edit doesn't exist or has been removed.
            </p>
            <Button asChild className="mt-8">
              <a href="/">Back to homepage</a>
            </Button>
          </div>
        </AuthLayout>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <AuthLayout>
        <div className="container max-w-4xl py-8 page-transition">
          <h1 className="text-3xl font-serif font-bold mb-8">Edit blog</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your blog title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A brief summary of your blog" 
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  {form.watch("coverImage") && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Cover Image Preview</p>
                      <img 
                        src={form.watch("coverImage")} 
                        alt="Cover preview" 
                        className="w-full h-40 object-cover rounded-md"
                        onError={(e) => {
                          // Set a placeholder on image load error
                          e.currentTarget.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <RichTextEditor 
                        value={field.value} 
                        onChange={field.onChange}
                        placeholder="Write your blog content here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </AuthLayout>
    </>
  );
}
