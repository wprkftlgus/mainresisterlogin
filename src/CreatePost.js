import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost(){
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const Navigate = useNavigate();
    
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        
        
        const res = await fetch('http://localhost:5000/api/posts/create', {
            method: 'Post' ,
            headers: { 'Authorization': `Bearer ${token}`},
            body: formData
        });
        const data = await res.json();
        
        if(!token){
            alert('You need to login to post!');
            Navigate('/dashboard');
            
        }
        if (data.message) {
            alert(data.message);
            Navigate('/dashboard');
        } else {
            alert(data.error);
        }
    };
    return(
        <div>
            <h2>Create Post</h2>
            <input type='text' placeholder='Title' value={title} onChange={(e) => {setTitle(e.target.value)}} />
            <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            <button onClick={handleSubmit}>Upload Post</button>    
            <button onClick={() => {Navigate('/dashboard')}}>Go back to dashboard</button>
        </div>
    );

}

export default CreatePost;

    