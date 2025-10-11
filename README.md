# 🖥 MERN Full-Stack Project: Posts & Comments Dashboard
## **🌐 Live Website**
<li>
1. Enter this website to turn the back-end server on: https://mainresisterlogin.onrender.com
</li>
<li>
2. Please create a new account to access the dashboard and try uploading posts: https://mainresgisterlogin.netlify.app/
</li>

# Back-end 
Technologies: Node.js, Express.js, MongoDB (Mongoose ODM), JWT Authentication
Deployment: Render
Features: REST API, async/await with try/catch, user authentication & authorization

# Front-end
Technologies: React.js, React Hooks (useState, useEffect, useNavigate), React Router, HTML, CSS, JavaScript

Features: Dynamic routing, state management, conditional rendering

# 🧩 Project Description 

This project is a full-stack MERN application with user authentication, CRUD functionality, and post/comment management.

Registration & Login

Users can register with an email and password. The backend validates data using a Mongoose schema.

If the email already exists, an error message is returned.

After registration, users can log in. Incorrect passwords return an error, while correct credentials navigate the user to the dashboard using useNavigate.

Posts

Upon login, all posts are fetched automatically using the useEffect hook.

Each post has a unique ID, and users can delete posts only if they are the author.

Input validation prevents empty posts; users must provide a title and content.

Users can view post details by passing a unique post ID to the backend.

Comments

Users can write comments under posts.

Each comment stores an author ID, and only the comment author can delete it.

Authorization follows the same logic as posts.
