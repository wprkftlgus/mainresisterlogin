import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import "../src/postDetail.css";
import { useNavigate } from "react-router-dom";

function PostDetail(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState();
    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const fetchPosts = async() => {
            const res = await fetch(`${API_URL}/api/posts/postDetail/${id}`, {
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
                const res = await fetch(`${API_URL}/api/comment/create`,{
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
            const res = await fetch(`${API_URL}/api/comment/fetchcomments/${id}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            });
            const result = await res.json();
            setComments(result);
        } catch(err){
            alert(err.error);
        }
        
    }; fetchComments();  
    },[comments])
    
    const deleteComment = async(commentId) => {
        try{
        const res = await fetch(`${API_URL}/api/comment/delete/${commentId}`,{
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();
        
        if(res.ok){
           alert(result.message);
           
        } else {
            alert(result.error);
        }
        } catch(err){
            alert(err.error);
        };
    }

    if (!post){
        return (
        <div className="bugAndLoading-postdetail">
        <div className="bug-postdetail"></div>
        <div className="loading-postdetail">Loading...</div>
        </div>)
    }
    
    return(
        <div>
        <div className="back-postdetail" onClick={() =>{
            navigate(-1);
        }}></div>
        <div className="holder-titleAndContent-postdetail">
        <div className="title-postdetail">{post.title}</div>
        <div className="content-postdetail">{post.content}</div>
        </div>
        <div className="title-comments">Comments</div>
        <div>
        <div className="holder-textareaAndButton"><textarea className="textarea-comment" placeholder="Add Comment..." value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={async () => {
            await postComment();
            
        }}>post comment</button></div>
        <div className="container-comments">
        {comments== "" ? (<div className="noComments">No Comments Yet!</div>) : (
            comments.map((r, idx) => (
            <div className="holder-comment" key={idx}>
            <div className="profile-comment"></div>
            <div className="holder-emailAndContent-comment">
            <div className="email-comment">{r.author.email}</div> 
            <div className="content-comment">{r.content}</div>
            </div>
            <div className="bin-comment" onClick={async () => {
                await deleteComment(r._id);
                
            }}></div>
            </div>
        ))
        )}
        
        </div>
        </div>
        </div>
    )
}

export default PostDetail;