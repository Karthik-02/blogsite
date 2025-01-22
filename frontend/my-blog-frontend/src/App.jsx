// App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5555/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  };

  const handleSelectBlog = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setSelectedBlog(response.data.blog);
    } catch (error) {
      console.error('Error fetching blog:', error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <h5>Blog Viewer</h5>
      </nav>
      <div className="main">
        <div className="sidebar">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-item"
              onClick={() => handleSelectBlog(blog._id)}
            >
              <h3>{blog.title}</h3>
              <p>{blog.subheading}</p>
            </div>
          ))}
        </div>
        <div className="content">
          {selectedBlog ? (
            <>
              <h2>{selectedBlog.title}</h2>
              <p><strong>Author:</strong> {selectedBlog.author}</p>
              <p>{selectedBlog.content}</p>
            </>
          ) : (
            <p>Select a blog to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
