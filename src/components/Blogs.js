import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog");
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  console.log(blogs);

  return (
    <div>
      {blogs &&
        blogs.map((blog, id) => (
          <Blog
            key={blog.id} // Add a unique key to each rendered Blog component
            title={blog.title}
            description={blog.description}
            imageURL={blog.imageURL}
            userName={blog.user?.name} // Use optional chaining for user.name
          />
        ))}
    </div>
  );
};

export default Blogs;
