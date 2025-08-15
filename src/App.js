import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ResisterPage from './register';
import LoginPage from './login';
import Dashboard from './dashboard';
import CreatePost from './CreatePost';



function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<ResisterPage />} />
        <Route path='/dashboard' element={<Dashboard />} ></Route>
        <Route path='/createpost' element={<CreatePost />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
