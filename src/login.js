import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: logEmail, password: logPassword })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem("email", data.email);
        setMessage('Login Succesed');
        alert(data.message);
        navigate('/dashboard')
      } else {
        setMessage(data.error);
        alert(data.error);
      }
    } catch (err) {
      setMessage('Login Error');
    }
  };

  const handlekeydown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div className='holder' style={{ padding: 20 }}>
     <div className='image-left'>
      <h2 className='title-left'>Get start your chat with other people!</h2>
      <div className='subtitle-left'>Access your account to buy and sell with confidence, browse thousands of listings, and make secure transactions in our trusted second-hand marketplace.</div>
     </div>
     <div className='box-login'>
      <div className='title'></div>
      <h2 className='font-login'>Welcome Back!</h2>
      <div className='font2-login'>Please login to your account</div>
      <input className='input-email' type="email" placeholder="Email" value={logEmail} onChange={e => setLogEmail(e.target.value)} onKeyDown={handlekeydown} /><br />
      <input className='input-password' type="password" placeholder="Password" value={logPassword} onChange={e => setLogPassword(e.target.value)} onKeyDown={handlekeydown} /><br />
      <button className='button-login' onClick={handleLogin}>LOGIN</button>
      <button className='button-register' onClick={() => {navigate('/register')}}>REGISTER</button>
      <p>{message}</p>
     </div>
    </div>
  );
}

export default Login;