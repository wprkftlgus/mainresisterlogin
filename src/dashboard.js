import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import Aboutcontent from './Aboutcontent';
import Dashboardcontent from './Dashboardcontent';

function Dashboard(){
    const [active, setActive] = useState("dashboard");
    const [value, setValue] =useState();
    const navigate = useNavigate();

    return(
        <div className='whole'>
      <div className='section-left'>
      <div className='category-leftsection'>MENU</div>
      <div onClick={() => {
        navigate('/dashboard');
        if (active !== "dashboard") {setActive("dashboard")}
        else {setActive("")}
      }} className={active === "dashboard" ? "button-left-section-true" : "button-left-section-false"}>
        <img className='icon' src='/dashboard.png'></img><div className='icon-name'>Dashboard</div>
      </div>
      <div onClick={() => {
        if (active !== "about") {setActive("about")}
        else {setActive("")}
      }} className={active === "about" ? "button-left-section-true" : "button-left-section-false"}>
        <img className='icon' src='/about.png'></img><div className='icon-name'>About</div>
      </div>
      <div className='category-leftsection'>GENERAL</div>
      <div onClick={() => {
        if (active !== "logout"){setActive("logout")}
        
      }} className='icon-name'>Logout</div>
      </div>
      <div className='contentholder-Posts'>
      <div>{active === "dashboard" && <Dashboardcontent />}</div>
      <div>{active === "about" && <Aboutcontent />}</div>
      </div>
    </div>
    )
}

export default Dashboard;