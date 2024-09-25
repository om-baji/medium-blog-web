import { useEffect, useState } from 'react';
import PostComp from '../components/PostComp';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import AppBar from '../components/AppBar';

interface PostData {
    title: string;
    content: string;
    publishedBy: string;
    date?: string; 
}

function Post() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    const authHeader = `Bearer ${localStorage.getItem("token")}`

    const [post, setPost] = useState<PostData | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/post/${id}`,{
                    headers : {
                        Authorization : authHeader
                    }
                });
                const data: PostData = response.data.post;

                setPost(data);
                setLoading(false); 
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };

        getData();
    }, [id]);

    if (loading) return <div>Loading...</div>; 
   
    if (!post) return <div>No post found.</div>;

    return (
        <div>
            <AppBar />
            <PostComp 
                title={post.title}
                description={post.content}
                author={post.publishedBy}
                date={"24 Sep 2024"} 
            />
        </div>
    );
}

export default Post;
