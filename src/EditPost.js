import React, { useEffect, useState }from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPost.css';
const API_URL = process.env.REACT_APP_API_URL;

function EditPost(){
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [price, setPrice] = useState();
    const [file, setFile] = useState(null);
    const Navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
            const fetchPosts = async () => {
                try{
                    const res = await fetch(`${API_URL}/api/posts/postDetail/${id}`);
                    const data = await res.json();
                    setTitle(data.title);
                    setContent(data.content);
                    setPrice(data.price); 
                    setFile(data.file);
                } catch(err){
                    console.log('Can not fetch the previous post data');
                }
                
            }
            fetchPosts();
        },[id])

    const handleSubmit = async () => {
        if(!title){
            alert('You can not empty the title');
            return ;
        }
        if(!content){
            alert('You can not empty the content');
            return ;
        }
        if(!file){
            alert('You have to post at least 1 picture!');
            return ;
        }
        if(isNaN(price)){
            alert('Please put price properly');
            return ; 
        }
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('price', price);
        formData.append('file', file);

        const res = await fetch(`${API_URL}/api/posts/create`, {
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
            <h2 className='title-createPost'>Edit Post</h2>
            <div className='div-box-input'><input className='input-title' type='text' placeholder='Title' value={title} onChange={(e) => {setTitle(e.target.value)}} /></div>
            <div className='box-input'><textarea className='input-content' placeholder="Content" value={content} onChange={e => setContent(e.target.value)} /></div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <input value={price} onChange={(e) => setPrice(e.target.value)} type='number' className='price-input' placeholder='Price (£)' />
            <div className='holder-buttom-icon'>
             <img className='icon-checked' src='/checked.png' onClick={handleSubmit} />
            </div>
        </div>
    );

}

export default EditPost;

    