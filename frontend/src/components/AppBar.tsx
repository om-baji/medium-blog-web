import { Link } from "react-router-dom";

function AppBar() {
  return (
    <div className="w-full sticky top-0 z-50 bg-white backdrop-blur-lg shadow-lg">
      <div className="w-full max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <Link to="/blog">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-300">
            Medium
          </p>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-300 text-gray-800 flex items-center justify-center text-lg font-bold rounded-full">
            U
          </div>
          <Link to="/signin" className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300">
            Log Out
          </Link>
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto p-2 flex justify-evenly items-center">
        <Link to="/" className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300">
          Home
        </Link>
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            window.location.reload(); // Reload the page
          }} 
          className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
        >
          Refresh
        </a>
        <Link to="/create" className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300">
          Publish
        </Link>
      </div>
    </div>
  );
}

export default AppBar;
