import React, { useEffect , useState } from "react";
import { data, useParams } from "react-router-dom";

function PostDetail(){
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async() => {
            const res = await fetch(`http://localhost:5000/api/posts/postDetail/${id}`);
            const data = await res.json();
            setPost(data);
        };
        fetchPosts();
    },[id]);
    console.log({post});
    
    if (!post) return <div>no post</div>
    if (post) return <div>yes post</div>
    return(
        <div>
        <div>{post.title}</div>
        <div>{post.content}</div>
        </div>
    )
}

export default PostDetail;