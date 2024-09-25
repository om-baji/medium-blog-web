import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <h1 className="text-6xl font-extrabold mb-4">Medium Blogs</h1>
      <p className="text-lg text-center max-w-md mb-8">
        Discover a world of ideas and share your thoughts with a vibrant community of readers and writers.
      </p>
      <div className="flex space-x-4">
        <Link to="/signin">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-200 font-semibold">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-200 font-semibold">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
