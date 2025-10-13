import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ResisterPage from './register';
import LoginAndRegister from './loginAndRegister';
import Dashboard from './dashboard';
import CreatePost from './CreatePost';
import About from './about';
import PostDetail from './postDetail';
import Profile from './profile';



function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<LoginAndRegister />} />
        <Route path="/register" element={<ResisterPage />} />
        <Route path='/dashboard' element={<Dashboard />} ></Route>
        <Route path='/createpost' element={<CreatePost />} ></Route>
        <Route path='/About' element={<About />}></Route>
        <Route path='/post/:id' element={<PostDetail />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
