import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './login.css';
import "./WaveBackground.css";

function WaveBackground() {
  return (
    <>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </>
  );
}

function Login() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
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
    <div className='holder'>
     <div className='box-login'>
      <WaveBackground className="wavebackground" />
      <div className='holder-login'>
      <div className='title'></div>
      <h2 className='font-login'>Welcome Back!</h2>
      <div className='font2-login'>Please login to your account</div>
      <input className='input-email' type="email" placeholder="Email" value={logEmail} onChange={e => setLogEmail(e.target.value)} onKeyDown={handlekeydown} /><br />
      <input className='input-password' type="password" placeholder="Password" value={logPassword} onChange={e => setLogPassword(e.target.value)} onKeyDown={handlekeydown} /><br />
      <button className='button-login' onClick={handleLogin}>LOGIN</button>
      <div className='bottom-holder-login'>
      <div className='bottom-holder-login-title'>
      <div className='bottom-login-title'>Don't have an account yet?</div>
      <div className='button-register' onClick={() => {navigate('/register')}}>REGISTER</div>
      </div>
      </div>
     </div>
     </div>
    </div>
  );
}

export default Login;