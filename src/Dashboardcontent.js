import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboardcontent(){
    const [posts, setPosts] = useState([]);
    const [value, setValue] =useState();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('You have been logged out.');
        navigate('/');
    }

    const handleDeletePost = async(postId) => {
        if(!token){
            alert('You need to login to delete posts!');
            return;
        }
        try{
            const res = await fetch('http://localhost:5000/api/posts/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: postId})
            });

             const data = await res.json();

            if(res.ok){
                setPosts(posts.filter(post => post._id !== postId));
                alert(data.message);
            } else{
                alert(data.error);
            }
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
    
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const [active, setActive] = useState();
    const email = localStorage.getItem('email');

    return(
    <div className='whole'>
      <div className='contentholder-Posts'>
      <div className='holder-top'>
      <div className='searchbox'>
        <img src='/search.png' className='img-search'></img>
        <input onChange={(e) => setValue(e.target.value)} value={value} className='search' placeholder='Search'></input>
        {value && <button onClick={(e) => {setValue("")}}>x</button>}
      </div>
        <div className='holder-profile'>
          <img className='icon-profile' src='/profile.png' />
          <div className='useremail'>{email}</div>
        </div>
        </div>
      <h2 className='Title-Dashboard'>Dashboard</h2>
      <div className='Subtitle-Dashboard'>Sell what you don’t need, get what you want!</div>
      <div className='posts-container'>
      {posts.map(post => 
      (<div key={post.id} onClick={() => {
        navigate(`/post/${post.id}`)
      }} className='post-box'>{post.title}
      <h2>{post.content}</h2>
      <div>Author<h3>{post.author.email}</h3></div>
      <h1>{post.timestamps}</h1>
      <h2>{post.file}</h2>
      <h2>{post.imageUrl}</h2>
      <img className='bin' onClick={(e) => {
        e.stopPropagation();
        handleDeletePost(post._id)}} src='/bin.png' />
      </div>))}
      </div>
      <div>
        <img className='icon-post' onClick={() => {
            if(!token){
            alert('You need to login to post!');
            navigate('/');
            return;}
            if(!active === "icon-post"){setActive("icon-post")}
            navigate('/CreatePost')}} src='/mores.png'></img>
            <img className='icon-logout' onClick={() => {handleLogout()}} src='/logout.png'></img>   
      </div>
      </div>
    </div>
    )
}

export default Dashboardcontent;