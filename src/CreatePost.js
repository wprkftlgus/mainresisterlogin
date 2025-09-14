import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import './createPost.css';

function CreatePost(){
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [file, setFile] = useState(null);
    const Navigate = useNavigate();
    
    const handleSubmit = async () => {
        if(!title){
            alert('You can not empty the title');
            return ;
        }
        if(!content){
            alert('You can not empty the content');
            return ;
        }

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);

        const res = await fetch('http://localhost:5000/api/posts/create', {
            method: 'POST' ,
            headers: { 'Authorization': `Bearer ${token}`},
            body: formData
        });
        const data = await res.json();
        if(!token){
            alert('You need to login to post!');
            Navigate('/dashboard');
            
        }
        if (data.Message) {
            alert(data.Message);
            Navigate('/dashboard');
        } else {
            alert(data.error);
        }
    };
    return(
        <div className='holder-createPost'>
            <img className='icon-back' onClick={() => {Navigate('/dashboard')}} src='/left-arrow.png'></img>
            <h2 className='title-createPost'>Create Post</h2>
            <div className='div-box-input'><div className='box-input'><input className='input-title' type='text' placeholder='Title' value={title} onChange={(e) => {setTitle(e.target.value)}} /></div></div>
            <div className='box-input'><textarea className='input-content' placeholder="Content" value={content} onChange={e => setContent(e.target.value)} /></div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <div className='holder-buttom-icon'>
             <img className='icon-checked' src='/checked.png' onClick={handleSubmit} />
            </div>
        </div>
    );

}

export default CreatePost;

    