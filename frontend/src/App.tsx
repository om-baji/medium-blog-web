import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">Medium Blogs</h1>
      <p className="text-base md:text-lg text-center max-w-md mb-8">
        Discover a world of ideas and share your thoughts with a vibrant community of readers and writers.
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link to="/signin">
          <button className="w-full md:w-auto px-6 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-200 font-semibold">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="w-full md:w-auto px-6 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-200 font-semibold">
            Sign Up
          </button>
        </Link>
      </div>
    </div>

  );
}

export default App;
