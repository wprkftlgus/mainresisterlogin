import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard(){
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('You have been logged out.');
        navigate('/');
    }

    const handleDeletePost = async() => {
        try{
            const res = await fetch('http://localhost:5000/api/delete', {
                method: 'DELETE'

            });

        }
        catch(err){
            console.log('Error happened...');
            alert('something wrong');
        }
    }

    useEffect(() => {
        const fetchPosts = async() => {
            try {
            const res = await fetch('http://localhost:5000/api/posts');
            const data = await res.json();
            setPosts(data);
            }
            catch(err){
                console.error('Error happened...');
            }
        };
        fetchPosts();
    },[]);
    
    

    return(
    <div>
      <h2>Posts</h2>
      {posts.map(post => 
      (<div>{post.title}<h2>{post.content}</h2><h2>{post.file}</h2>
      <button onClick={() => {handleDeletePost()}}>remove</button></div>))}
      
      <div>
        <button onClick={() => {
            if(!token){
            alert('You need to login to post!');
            navigate('/');
            return;}
            navigate('/CreatePost')}}>Create post</button>
        <button onClick={() => {handleLogout()}}>Log out</button>    
      </div>
    </div>
    )
}

export default Dashboard;