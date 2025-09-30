import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail(){
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [comment, setComment] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async() => {
            const res = await fetch(`http://localhost:5000/api/posts/postDetail/${id}`, {
            method : 'GET' ,
            headers : { 'Content-Type': 'application/json' }
            });
            const result = await res.json();
            if(result.message){
        alert(result.message);
        } if(result.error){
        alert(result.error);
        }
            setPost(result);
        };
        fetchPosts();
    },[id]);
    const postComment = async () => {
            try{
                const res = await fetch('http://localhost:5000/api/comment/create',{
                    method : 'POST',
                    headers: { 
                        'Authorization': `Bearer ${token}` ,
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify({ title, content })
                });
                const result = await res.json();
                setComment(result);
            } catch(err){
                alert(err.error);
            }
        }

    if (!post){
        return <div>loading</div>;
    }
    return(
        <div>
        <div>{post.title}</div>
        <div>{post.content}</div>
        <div><input value={title} onChange={(e) => setTitle(e.target.value)}/></div>
        <div><textarea value={content} onChange={(e) => setContent(e.target.value)} /></div>
        <button onClick={() => {
            postComment();
            alert('success!');
            console.log(comment);
        }}>post comment</button>
        </div>
    )
}

export default PostDetail;