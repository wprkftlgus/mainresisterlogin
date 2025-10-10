import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: 20 }}>
      
     <h2>Register</h2>
      <input type="email" placeholder="Email" value={regEmail} onChange={e => setRegEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={regPassword} onChange={e => setRegPassword(e.target.value)} /><br />
      <button onClick={handleRegister}>Register</button>

      <p>{message}</p>
    </div>
  );
}

export default Register;
