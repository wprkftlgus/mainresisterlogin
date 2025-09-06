import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ResisterPage from './register';
import LoginPage from './login';
import Dashboard from './dashboard';
import CreatePost from './CreatePost';
import About from './about';



function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<ResisterPage />} />
        <Route path='/dashboard' element={<Dashboard />} ></Route>
        <Route path='/createpost' element={<CreatePost />} ></Route>
        <Route path='/About' element={<About />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
