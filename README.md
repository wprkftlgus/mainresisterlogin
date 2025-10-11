# How to go on live website?
1. Enter this website to turn the back-end server on: https://mainresisterlogin.onrender.com
2. This is my website people can upload the post, please go this website and make a new account to access to the dashboard: https://mainresgisterlogin.netlify.app/

# How does it work?
Let's look at the big forest first
# Back-end 
Mongoose (MongoDB ODM), JWT Middleware (authMiddleware), Render, Express.js, REST API, async/await + try/catch
# Front-end
HTML, CSS, JAVA, REACT, React Hooks, Routes

# 🧩 Project Description 

This project implements a full-stack MERN (MongoDB, Express, React, Node.js) application with user authentication and CRUD functionality.

When a new user registers through the register page, the email and password are sent to the backend using the POST method following the Mongoose schema structure.
If the email already exists in the database, the backend returns an error message.

After registration, users can log in using their credentials.
If the password is incorrect, an error message appears; if correct, the page navigates to the dashboard using React Router’s useNavigate function.

Once logged in, the useEffect hook automatically fetches and displays all posts stored in MongoDB.
Each post has a unique ID, and users can delete a post only if the post author matches the currently logged-in user.

When attempting to submit an empty post, the system validates input fields and returns a message such as “Please enter a title” or “Please enter content.”
Users can also view the details of each post by passing a unique parameter (post ID) to the backend, which returns the full post information.

Additionally, users can write comments under posts.
Each comment is stored with an author ID, and only the user who created a comment can delete it — following the same authorization logic used for posts.
