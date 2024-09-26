import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface Blog {
  title: string;
  content: string;
  publishedBy: string;
  id: string;
  authorId: string;
}

const Blog = () => {
  const [combined, setCombined] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const authHeader = `Bearer ${localStorage.getItem("token")}`;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/post/bulk`, {
          headers: {
            Authorization: authHeader,
          },
        });

        const arr = response.data.blogs;

        const combinedData = arr.map((blog: Blog) => ({
          title: blog.title,
          content: blog.content,
          publishedBy: blog.publishedBy,
          id: blog.id,
          authorId: blog.authorId,
        }));

        setCombined(combinedData);
      } catch (e) {
        console.log("Error", e);
      } finally {
        setLoading(false);
        console.log(combined);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <AppBar />
      <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-6 md:gap-8 max-w-screen-xl mx-auto">
        {combined.map((blog) => (
          <div
            onClick={() => navigate(`/post?id=${blog.id}&auth=${blog.authorId}`)}
            key={blog.id}
            className="bg-white shadow-lg rounded-lg p-4 sm:p-6 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer border-l-4 border-blue-600 flex flex-col gap-2 sm:gap-4"
          >
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 hover:text-blue-600 transition-colors duration-300">
              {blog.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {blog.content.slice(0, 750)}...
            </p>
            <div className="flex items-center justify-between text-gray-500 text-xs sm:text-sm mt-2 sm:mt-4">
              <span>
                Published by:{" "}
                <span className="font-medium text-gray-800">{blog.publishedBy}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
