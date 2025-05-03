
export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  readingTime: string;
}

// Initial mock data
export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "The Future of Web Development",
    content: `
# The Future of Web Development

Web development has come a long way since the early days of static HTML pages. Today, we're seeing a revolution in how web applications are built, deployed, and experienced by users.

## The Rise of JAMstack

JAMstack (JavaScript, APIs, and Markup) has transformed how we think about web architecture. By pre-rendering pages and serving them directly from a CDN, we get incredible performance benefits and improved security.

## AI-Assisted Development

Artificial intelligence is no longer just a buzzword—it's actively changing how developers work. From code completion to automated testing, AI tools are making developers more productive than ever before.

## Web Components and Micro-Frontends

The component model has won, but we're seeing even more granular approaches with web components and micro-frontends allowing teams to work independently while maintaining a cohesive product.

## The Return to Server Components

After years of pushing computation to the client, we're seeing a renaissance of server-side rendering and server components, offering the best of both worlds: the interactivity of client-side apps with the performance of server rendering.

As we look to the future, one thing is clear: web development will continue to evolve rapidly, and the most successful developers will be those who adapt quickly while maintaining a strong foundation in the fundamentals.
    `,
    excerpt: "Exploring the cutting-edge technologies and methodologies that will shape the web development landscape in the coming years.",
    authorId: "1",
    authorName: "Demo User",
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-15T10:30:00Z",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readingTime: "5 min read"
  },
  {
    id: "2",
    title: "Mastering CSS Grid Layout",
    content: `
# Mastering CSS Grid Layout

CSS Grid Layout has revolutionized how we create two-dimensional layouts on the web. In this comprehensive guide, we'll explore everything from the basics to advanced techniques.

## Why Grid Layout Matters

Before Grid, creating complex layouts often required hacky solutions involving floats, positioning, and plenty of workarounds. Grid gives us a purpose-built system for creating layouts of all complexities.

## Getting Started with Grid

Let's start with the basics:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

This simple setup creates a three-column layout with equal width columns and 20px gaps between items.

## Advanced Grid Techniques

### Named Areas

One of Grid's most powerful features is named areas:

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
\`\`\`

This creates a layout with a header and footer that span the full width, and a sidebar that takes up one-third of the middle row.

## Responsive Grid Layouts

Grid shines when it comes to responsive design. Using minmax() and auto-fit/auto-fill, we can create layouts that automatically adjust to different screen sizes:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

This creates a layout where each column is at least 250px wide, and the number of columns adjusts automatically based on the available space.

## Conclusion

CSS Grid Layout is a game-changer for web layouts. By understanding its core concepts and advanced features, you can create complex, responsive layouts with clean, maintainable CSS.
    `,
    excerpt: "A deep dive into the power of CSS Grid Layout, with practical examples and techniques for creating responsive, complex layouts.",
    authorId: "1",
    authorName: "Demo User",
    createdAt: "2023-10-10T08:15:00Z",
    updatedAt: "2023-10-10T08:15:00Z",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readingTime: "8 min read"
  },
  {
    id: "3",
    title: "Understanding JavaScript Promises",
    content: `
# Understanding JavaScript Promises

JavaScript Promises are a powerful tool for managing asynchronous operations. In this article, we'll explore how Promises work and how to use them effectively.

## What is a Promise?

A Promise in JavaScript represents an operation that hasn't completed yet, but is expected to in the future. It's an object that can be in one of three states:

- **Pending**: The initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

## Creating a Promise

Here's how to create a basic Promise:

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  if (success) {
    resolve('Operation completed!');
  } else {
    reject('Operation failed!');
  }
});
\`\`\`

## Using Promises

Once you have a Promise, you can use \`.then()\` to handle the fulfilled state and \`.catch()\` to handle the rejected state:

\`\`\`javascript
myPromise
  .then(result => {
    console.log(result); // 'Operation completed!'
  })
  .catch(error => {
    console.error(error); // 'Operation failed!'
  });
\`\`\`

## Chaining Promises

One of the most powerful aspects of Promises is the ability to chain them:

\`\`\`javascript
fetchUserData(userId)
  .then(userData => fetchUserPosts(userData.id))
  .then(posts => displayPosts(posts))
  .catch(error => handleError(error));
\`\`\`

## Async/Await: Syntactic Sugar for Promises

Modern JavaScript provides the async/await syntax, which makes working with Promises even cleaner:

\`\`\`javascript
async function getUserPosts(userId) {
  try {
    const userData = await fetchUserData(userId);
    const posts = await fetchUserPosts(userData.id);
    displayPosts(posts);
  } catch (error) {
    handleError(error);
  }
}
\`\`\`

## Promise Methods

JavaScript provides several useful methods for working with multiple Promises:

- **Promise.all()**: Waits for all Promises to resolve
- **Promise.race()**: Waits for the first Promise to resolve or reject
- **Promise.allSettled()**: Waits for all Promises to settle, regardless of outcome
- **Promise.any()**: Waits for the first Promise to fulfill

## Conclusion

Understanding Promises is essential for modern JavaScript development. They provide a clean, powerful way to handle asynchronous operations and are the foundation for features like async/await.
    `,
    excerpt: "A comprehensive guide to JavaScript Promises, covering creation, chaining, error handling, and modern async/await patterns.",
    authorId: "1",
    authorName: "Demo User",
    createdAt: "2023-09-28T14:20:00Z",
    updatedAt: "2023-09-28T14:20:00Z",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readingTime: "6 min read"
  }
];

// Helper function to get blogs with pagination
export const getBlogs = (page = 1, pageSize = 6): { blogs: Blog[], total: number } => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBlogs = mockBlogs.slice(startIndex, endIndex);
  
  return {
    blogs: paginatedBlogs,
    total: mockBlogs.length
  };
};

// Helper function to get a blog by ID
export const getBlogById = (id: string): Blog | undefined => {
  return mockBlogs.find(blog => blog.id === id);
};

// Helper function to create a new blog
export const createBlog = (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog => {
  const newBlog: Blog = {
    ...blog,
    id: String(mockBlogs.length + 1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockBlogs.unshift(newBlog);
  
  return newBlog;
};

// Helper function to update a blog
export const updateBlog = (id: string, updates: Partial<Blog>): Blog | undefined => {
  const index = mockBlogs.findIndex(blog => blog.id === id);
  
  if (index === -1) {
    return undefined;
  }
  
  mockBlogs[index] = {
    ...mockBlogs[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return mockBlogs[index];
};

// Helper function to delete a blog
export const deleteBlog = (id: string): boolean => {
  const index = mockBlogs.findIndex(blog => blog.id === id);
  
  if (index === -1) {
    return false;
  }
  
  mockBlogs.splice(index, 1);
  
  return true;
};
