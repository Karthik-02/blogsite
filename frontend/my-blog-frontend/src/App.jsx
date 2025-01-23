import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Modal from 'react-modal';


const API_BASE_URL = 'http://localhost:5555/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    subheading: '',
    author: '',
    content: '',
    img: '',
  });

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

  const handleCreateBlog = async () => {
    try {
      await axios.post(API_BASE_URL, newBlog);
      fetchBlogs();
      setNewBlog({
        title: '',
        subheading: '',
        author: '',
        content: '',
        img: '',
      });
    } catch (error) {
      console.error('Error creating blog:', error.message);
    }
  };

  const handleUpdateBlog = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, selectedBlog);
      fetchBlogs();
      setSelectedBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchBlogs();
      setSelectedBlog(null);
    } catch (error) {
      console.error('Error deleting blog:', error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

   
   

  return (
    <div className="app">
      <nav className="navbar">
        <img class="logo" src='https://www.justoglobal.com/news/public/images/Logo.png'></img>
        <img class="logo" src='https://logodix.com/logo/1597047.gif'></img>
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
              <button className="update-button" onClick={() => handleUpdateBlog(selectedBlog._id)}>Update Blog</button>
              <button className="delete-button" onClick={() => handleDeleteBlog(selectedBlog._id)}>Delete Blog</button>
              <h2>{selectedBlog.title}</h2>
              <p><strong>By:</strong> {selectedBlog.author}</p>
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
    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
  />
  <input
    type="text"
    placeholder="Subheading"
    value={newBlog.subheading}
    onChange={(e) => setNewBlog({ ...newBlog, subheading: e.target.value })}
  />
  <input
    type="text"
    placeholder="Author"
    value={newBlog.author}
    onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
  />
  <textarea
    placeholder="Content"
    value={newBlog.content}
    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
  ></textarea>
  <input
    type="text"
    placeholder="Image URL"
    value={newBlog.img}
    onChange={(e) => setNewBlog({ ...newBlog, img: e.target.value })}
  />
  <button onClick={handleCreateBlog}>Create Blog</button>

  <style jsx>{`
    .create-blog {
      background: linear-gradient(135deg,rgb(17, 17, 16) 0%,rgb(156, 153, 152) 100%);
      padding: 20px;
      border-radius: 10px;
      max-width: 700px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .create-blog input,
    .create-blog textarea {
      width: 90%;
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
      font-size: 16px;
    }
    .create-blog textarea {
      height: 100px;
      resize: none;
    }
    .create-blog input:focus,
    .create-blog textarea:focus {
      outline: none;
      border-color:rgb(221, 218, 214);
      box-shadow: 0 0 5px rgba(12, 8, 3, 0.8);
    }
    .create-blog button {
      background:rgb(21, 236, 21);
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .create-blog button:hover {
      background:rgb(24, 23, 22);
    }
  `}</style>
</div>



        </div>
      </div>
    </div>
  );
};

export default App;
