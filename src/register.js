import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./WaveBackground.css";
import "./register.css"

function WaveBackground() {
  return (
    <>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </>
  );
}

function Register() {
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
   const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail, password: regPassword })
      });
      const data = await res.json();
      if (data.message) {
      alert(data.message);
      navigate('/');
    }  else if (data.error) {
      alert(data.error);
    }
      setMessage(data.message || data.error);
    } catch (err) {
      setMessage('Register Error');
    }
  };


  return (
    <div className='holder'>
     <div className='image-left'>
      <div className='title-left1'>Loop</div>
      <div className='title-left2'>Market</div>
      <div className='subtitle-left'>Access your account to buy and sell with confidence, browse thousands of listings, and make secure transactions in our trusted second-hand marketplace.</div>
     </div>
     <div className='box-login'>
      <WaveBackground className="wavebackground" />
      <div className='holder-register'>
     <div className='title-register'>Register</div>
      <input className='input-email-register' type="email" placeholder="Email" value={regEmail} onChange={e => setRegEmail(e.target.value)} /><br />
      <input className='input-password-register'type="password" placeholder="Password" value={regPassword} onChange={e => setRegPassword(e.target.value)} /><br />
      <button className='button-register-register' onClick={handleRegister}>REGISTER</button>
      <div className='bottom-holder-register-title'>
      <div className='bottom-register-title'>Back to login</div>
      <div className='navigate-login' onClick={() => {navigate('/')}}>LOGIN</div>
      </div>
      </div>
     </div>
    </div>
  );
}

export default Register;
