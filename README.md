# 🖥 MERN Full-Stack Project: Posts & Comments Dashboard
### **🌐 Live Website**
<li>
1. Enter this website to turn the back-end server on: https://mainresisterlogin.onrender.com
</li>
<li>
2. Please create a new account to access the dashboard and try uploading posts: https://mainresgisterlogin.netlify.app/
</li>

## Back-end 
<li>
### Technologies: Node.js, Express.js, MongoDB (Mongoose ODM), JWT Authentication
</li>
<li>
**Deployment**: Render
</li>
<li>  
**Features**: REST API, async/await with try/catch, user authentication & authorization
</li>

## Front-end
<li>
** Technologies **: React.js, React Hooks (useState, useEffect, useNavigate), React Router, HTML, CSS, JavaScript
</li>
<li>
** Features **: Dynamic routing, state management, conditional rendering
</li>
  
# 🧩 Project Description 

This project is a full-stack MERN application with user authentication, CRUD functionality, and post/comment management.

### Registration & Login

Users can register with an email and password. The backend validates data using a Mongoose schema.

If the email already exists, an error message is returned.

After registration, users can log in. Incorrect passwords return an error, while correct credentials navigate the user to the dashboard using useNavigate.

### Posts

Upon login, all posts are fetched automatically using the useEffect hook.

Each post has a unique ID, and users can delete posts only if they are the author.

Input validation prevents empty posts; users must provide a title and content.

Users can view post details by passing a unique post ID to the backend.

### Comments

Users can write comments under posts.

Each comment stores an author ID, and only the comment author can delete it.

Authorization follows the same logic as posts.

# 📂 How to Run Locally

**1. Clone the repository**<br>
git clone <repo-url>

**2. Navigate to backend folder and install dependencies**
cd backend
npm install
npm run dev

**3. Navigate to frontend folder and install dependencies**
cd frontend
npm install
npm start

**4. Open your browser at http://localhost:3000 and start testing.**

💡 Tip: Make sure your **.env.development** files for backend and frontend are correctly configured with API URLs and secrets.






