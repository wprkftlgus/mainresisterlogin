import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './login.css';
import "./WaveBackground.css";
import Login from './login';

function LoginAndRegister() {

  return (
    <div className='holder'>
     <div className='image-left'>
      <div className='title-left1'>Loop</div>
      <div className='title-left2'>Market</div>
      <div className='subtitle-left'>Access your account to buy and sell with confidence, browse thousands of listings, and make secure transactions in our trusted second-hand marketplace.</div>
     </div>
    <Login />
    </div>
  );
}

export default LoginAndRegister;