
import { Link } from "react-router-dom";
import { Blog } from "@/lib/mockData";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";

interface BlogCardProps {
  blog: Blog;
  variant?: "default" | "wide";
}

export function BlogCard({ blog, variant = "default" }: BlogCardProps) {
  const formattedDate = format(new Date(blog.createdAt), "MMM d, yyyy");
  
  if (variant === "wide") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover-lift h-full">
        <div className="flex flex-col md:flex-row">
          {blog.coverImage && (
            <div className="md:w-1/3">
              <Link to={`/blog/${blog.id}`}>
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="h-48 md:h-full w-full object-cover"
                />
              </Link>
            </div>
          )}
          
          <div className={blog.coverImage ? "md:w-2/3 p-6" : "w-full p-6"}>
            <CardHeader className="p-0 pb-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{blog.authorName}</span>
                  <span className="mx-1">·</span>
                  <span>{formattedDate}</span>
                  <span className="mx-1">·</span>
                  <span>{blog.readingTime}</span>
                </div>
                <Link to={`/blog/${blog.id}`}>
                  <h3 className="font-serif text-xl font-semibold leading-tight hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                </Link>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <p className="text-muted-foreground line-clamp-3">
                {blog.excerpt}
              </p>
            </CardContent>
            
            <CardFooter className="p-0 pt-4">
              <Link 
                to={`/blog/${blog.id}`}
                className="text-primary font-medium hover:underline"
              >
                Read more
              </Link>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover-lift h-full">
      {blog.coverImage && (
        <Link to={`/blog/${blog.id}`}>
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="h-48 w-full object-cover"
          />
        </Link>
      )}
      
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{blog.authorName}</span>
            <span className="mx-1">·</span>
            <span>{formattedDate}</span>
          </div>
          <Link to={`/blog/${blog.id}`}>
            <h3 className="font-serif text-xl font-semibold leading-tight hover:text-primary transition-colors">
              {blog.title}
            </h3>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {blog.excerpt}
        </p>
      </CardContent>
      
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-muted-foreground">
            {blog.readingTime}
          </span>
          <Link 
            to={`/blog/${blog.id}`}
            className="text-primary text-sm font-medium hover:underline"
          >
            Read more
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
