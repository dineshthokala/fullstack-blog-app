import React, { useState, useEffect } from 'react';
import { fetchBlogs } from '../lib/api';
import BlogItem from './BlogItem';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs(currentPage);
        setBlogs(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    loadBlogs();
  }, [currentPage]);

  return (
    <div>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;