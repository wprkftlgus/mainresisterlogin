import React from "react";
import './profile.css';
import { useNavigate } from "react-router-dom";

function Profile(){
    const Navigate = useNavigate();
    const userEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const handleDeleteAllPost = async () => {
        const res = await fetch('http://localhost:5000/api/posts/deleteAllPost' , {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}` },
            body: JSON.stringify({userEmail})
        });
        const data = await res.json();
        if(data){
            alert(data.message);
        } else{
            alert(data.error);
        }
    }
    return(
        <div className="container-profile">
            <img className='icon-back' onClick={() => {Navigate('/dashboard')}} src='/left-arrow.png'></img>
            <div className="div-profile">
                <img className="img-profile" src="/profile.png" />
                <div className="email-profile">{userEmail}</div>
            </div>
        <div onClick={() => {
            handleDeleteAllPost();
        }}>Delete Account</div>
        </div>
    )
};


export default Profile;