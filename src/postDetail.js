import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import "../src/postDetail.css";

function PostDetail(){
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState();
    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);

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
                    
                    body: JSON.stringify({ content, postId: id })
                });
                const result = await res.json();
                setComment(result);
                if(result.message){
            alert(result.message);
        } if(result.error){
        alert(result.error);
        }
            } catch(err){
                alert(err.error);
            }
        }

    useEffect(() => {
        const fetchComments = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/comment/fetchcomments/${id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            });
            const result = await res.json();
            setComments(result);
        } catch(err){
            alert(err.error);
        }
        
    }; fetchComments();  
    },[id])
    
    const deleteComment = async(commentId) => {
        try{
        const res = await fetch(`http://localhost:5000/api/comment/delete/${commentId}`,{
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();
        alert(result.message);
        } catch(err){
            alert(err.error);
        };
    }

    if (!post){
        return <div>loading...</div>;
    }
    
    return(
        <div>
        <div>{post.title}</div>
        <div>{post.content}</div>
        <div className="title-comments">Comments</div>
        <div>
        <textarea className="textarea-comment" placeholder="Add Comment..." value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={() => {
            postComment();
            window.location.reload();
        }}>post comment</button>
        <div className="container-comments">
        {comments.map((r, idx) => (
            <div className="holder-comment" key={idx}>
            <div className="profile-comment"></div>
            <div className="holder-emailAndContent-comment">
            <div className="email-comment">{r.author.email}</div> 
            <div className="content-comment">{r.content}</div>
            </div>
            <button onClick={() => {
                deleteComment(r._id);
                
                window.location.reload();
            }}>Delete</button>
            </div>
        ))}
        </div>
        </div>
        </div>
    )
}

export default PostDetail;