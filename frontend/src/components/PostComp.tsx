import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import axios from 'axios';

interface PostComponentProps {
    title: string;
    description: string;
    author: string;
    date: string;
}

const PostComponent: React.FC<PostComponentProps> = ({ title, description, author, date }) => {
    const [isAuthor, setIsAuthor] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate()

    const query = new URLSearchParams(location.search)
    const postId = query.get("id")
    const authHeader = `Bearer ${localStorage.getItem("token")}`

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const queryAuthorId = queryParams.get('auth');
        const storedAuthorId = localStorage.getItem('author');

        if (storedAuthorId && storedAuthorId === queryAuthorId) {
            setIsAuthor(true);
        }
    }, []);

    return (
        <div className="w-[90%] mx-auto p-6 mb-6 grid gap-6 md:grid-cols-[70%_30%]">
            <div className="flex flex-col gap-4 md:gap-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-700 leading-relaxed text-base md:text-xl lg:text-2xl">
                    {description}
                </p>

                {isAuthor && (
                    <div className="flex gap-4 mt-4">
                        <button onClick={() => navigate(`/update?id=${postId}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Edit Post
                        </button>
                        <button onClick={async () => {
                            try {
                                const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/post/${postId}`, {
                                    headers: {
                                        Authorization: authHeader
                                    }
                                })
                                console.log(response.data);

                                navigate(`/blog`)
                            } catch (e) {
                                console.log(e);

                            }
                        }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Delete Post
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-start items-start gap-4 p-4 md:p-6 text-gray-900 bg-gray-100 rounded-md">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 text-gray-800 flex items-center justify-center text-lg md:text-xl font-bold rounded">
                        {author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base md:text-lg font-semibold">Author:</span>
                        <span className="text-lg md:text-xl lg:text-2xl font-medium">{author}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-base md:text-lg font-semibold">Published:</span>
                    <span className="text-lg md:text-xl lg:text-2xl">{date}</span>
                </div>
                <span className="italic text-sm md:text-md text-gray-600">Medium User</span>
                <span className="italic text-sm md:text-base lg:text-gray-600 mt-4">
                    "The customer support I received was exceptional. The support team went above and beyond to address my concerns."
                </span>
            </div>
        </div>
    );
};

export default PostComponent;
