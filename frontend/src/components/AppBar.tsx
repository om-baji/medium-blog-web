import { Link } from "react-router-dom";

function AppBar() {
    return (
        <div className="flex justify-center w-full sticky top-0 z-50">
            <div className="w-full max-w-screen-xl grid grid-cols-2 backdrop-blur-lg bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg mx-4 my-2 p-2">
                <div className="flex items-center">
                    <Link to={"/blog"}>
                        <p className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-300">
                            Medium
                        </p>
                    </Link>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <Link to="/">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 shadow-md">
                            Home
                        </button>
                    </Link>
                    <Link to="/signin">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 shadow-md">
                            Log Out
                        </button>
                    </Link>
                    <Link to="/create">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 shadow-md">
                            Publish
                        </button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-300 text-gray-800 flex items-center justify-center text-lg font-bold rounded-md">
                            U
                        </div>
                        <p className="text-lg text-gray-800 font-medium">User</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppBar;
