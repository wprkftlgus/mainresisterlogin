import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboardcontent(){
    const [posts, setPosts] = useState([]);
    const [value, setValue] =useState();
    const [favorite, setFavorite] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const API_URL = process.env.REACT_APP_API_URL;

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
            const res = await fetch(`${API_URL}/api/posts/delete`, {
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
            const res = await fetch(`${API_URL}/api/posts`);
            const data = await res.json();
            setPosts(data);
            console.log(data);
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

    const fetchAllPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/posts`);
      const data = await res.json();
      setPosts(data);
    }catch (err) {
    console.error("Error fetching all posts");
    }};

    const handleSearch = async (e) => {
      if(e.key === "Enter"){
        if(!value){
          fetchAllPosts();
          return;
        }
        try{
        const res = await fetch(`${API_URL}/api/posts/search/${value}`);
        const data = await res.json();
        setPosts(data);
      } catch(err){
        alert(err.error);
      }
      }
    }
    const [active, setActive] = useState();
    const email = localStorage.getItem('email');

    return(
    <div className='whole'>
      <div className='contentholder-Posts'>
      <div className='holder-top'>
      <div className='searchbox'>
        <img src='/search.png' className='img-search'></img>
        <input onKeyDown={handleSearch} onChange={(e) => setValue(e.target.value)} value={value} className='search' placeholder='Search'></input>
        {value && <button onClick={(e) => {setValue("")}}>x</button>}
      </div>
        <div onClick={() => {
          navigate('/Profile');
        }} className='holder-profile'>
          <img className='icon-profile' src='/profile.png' />
          <div className='useremail'>{email}</div>
        </div>
        </div>
      <div className='container-dashboard'>
      <div className='holder-dashboard'>
      <h2 className='Title-Dashboard'>Dashboard</h2>
      <div className='create-post' 
      onClick={() => {
            if(!token){
            alert('You need to login to post!');
            navigate('/');
            return;}
            if(!active === "icon-post"){setActive("icon-post")}
            navigate('/CreatePost')}} 
      >+ Create Post</div>
      </div>
      <div className='Subtitle-Dashboard'>Sell what you don’t need, get what you want!</div>
      <div className='posts-container'>
      {posts.length > 0 ? 
      (<div className='posts-container'>
        {posts.map(post => (post ? (
        <div key={post._id} onClick={() => {
        navigate(`/post/${post._id}`)
      }} className='post-box'><div className='holder-title-post'>{post.title}
        </div>
      <div className='holder-content-post'>{post.content}</div>
      <div className='bottomHolder-post'>
      <div className='holder-author-post'>
        <div>{post.author.email}</div>
      </div>
      <h1>{post.timestamps}</h1>
      <h2>{post.file}</h2>
      <h2>{post.imageUrl}</h2>
      <div className='date'>{new Date(post.updatedAt).toLocaleString()}</div>
      <img className='heart' src='heart.png' onClick={(e) => {
        e.stopPropagation();
        
      }} />
      <img className='bin' onClick={(e) => {
        e.stopPropagation();
        handleDeletePost(post._id)}} src='/bin.png' />
      </div>
      </div>
      ) : 
      (<div>loading...</div>))
      )}
      </div>)
      :
      (<div className='noResearch'>No search found ㅠ~ㅠ</div>)}  
      
      </div>
      </div>
      </div>
    </div>
    )
}

export default Dashboardcontent;