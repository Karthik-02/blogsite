import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./SearchBar.jsx";

const API_BASE_URL = "http://localhost:5555/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    subheading: "",
    author: "",
    content: "",
    img: "",
  });

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  const handleSelectBlog = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setSelectedBlog(response.data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error.message);
    }
  };

  const handleCreateBlog = async () => {
    try {
      await axios.post(API_BASE_URL, newBlog);
      fetchBlogs();
      setNewBlog({
        title: "",
        subheading: "",
        author: "",
        content: "",
        img: "",
      });
    } catch (error) {
      console.error("Error creating blog:", error.message);
    }
  };

  const handleUpdateBlog = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, selectedBlog);
      fetchBlogs();
      setSelectedBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchBlogs();
      setSelectedBlog(null);
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addData = (array_obj) => {
    for (let i = 0; i < array_obj.length; i++) {
      setData(array_obj[i].title);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-image">
          <img
            class="logo"
            src="https://www.justoglobal.com/news/public/images/Logo.png"
          ></img>
          <img class="logo" src="https://logodix.com/logo/1597047.gif"></img>
        </div>
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
              <img className="blog-img" src={selectedBlog.img} alt="Blog" />
              <button
                className="update-button"
                onClick={() => handleUpdateBlog(selectedBlog._id)}
              >
                Update Blog
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteBlog(selectedBlog._id)}
              >
                Delete Blog
              </button>
              <h2>{selectedBlog.title}</h2>
              <p>
                <strong>By:</strong> {selectedBlog.author}
              </p>
              <h3>{selectedBlog.subheading}</h3>
              <p class="blog-content">{selectedBlog.content}</p>
            </>
          ) : (
            <p>"Select a blog to view its details."</p>
          )}

          <div className="create-blog">
            <input
              type="text"
              placeholder="Title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Subheading"
              value={newBlog.subheading}
              onChange={(e) =>
                setNewBlog({ ...newBlog, subheading: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Author"
              value={newBlog.author}
              onChange={(e) =>
                setNewBlog({ ...newBlog, author: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              value={newBlog.content}
              onChange={(e) =>
                setNewBlog({ ...newBlog, content: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              placeholder="Image URL"
              value={newBlog.img}
              onChange={(e) => setNewBlog({ ...newBlog, img: e.target.value })}
            />
            <button onClick={handleCreateBlog}>Create Blog</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
