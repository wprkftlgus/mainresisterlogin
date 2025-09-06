import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function About(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('You have been logged out.');
        navigate('/');
    }

    const [active, setActive] = useState();

    return(
    <div className='whole'>
      <div className='section-left'>
      <div onClick={() => {
        if (active !== "dashboard") {setActive("dashboard")}
        else {setActive("")}
      }} className={active === "dashboard" ? "button-left-section-true" : "button-left-section-false"}>
        <img className='icon-dashboard' src='/dashboard.png'></img><div className='icon-name'>Dashboard</div></div>
      <div div onClick={() => {
        if (active !== "about") {setActive("about")}
        else {setActive("")}
      }} className={active === "about" ? "button-left-section-true" : "button-left-section-false"}>About</div>
      </div>
      
      
      <div>
            <img className='icon-logout' onClick={() => {handleLogout()}} src='/logout.png'></img>   
      </div>
      
    </div>
    )
}

export default About;