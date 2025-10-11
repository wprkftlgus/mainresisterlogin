# 🖥 MERN Full-Stack Project: Posts & Comments Dashboard
### **🌐 Live Website**
1. Enter this website to turn the back-end server on: https://mainresisterlogin.onrender.com
2. Please create a new account to access the dashboard and try uploading posts: https://mainresgisterlogin.netlify.app/

## Back-end 

**Technologies**: Node.js, Express.js, MongoDB (Mongoose ODM), JWT Authentication

**Deployment**: Render

**Features**: REST API, async/await with try/catch, user authentication & authorization


## Front-end

**Technologies** : React.js, React Hooks (useState, useEffect, useNavigate), React Router, HTML, CSS, JavaScript
  
**Features** : Dynamic routing, state management, conditional rendering

  
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

**1. Clone the repository** <br>
git clone <repo-url>

**2. Navigate to backend folder and install dependencies**
<br>
cd backend <br>
npm install  <br>
npm run dev

**3. Navigate to frontend folder and install dependencies**
<br>
cd frontend <br>
npm install <br>
npm start

**4. Open your browser at http://localhost:3000 and start testing.**
### 💡 Tip: !!Make sure your **.env.development** files for backend and frontend are correctly configured with API URLs and secrets!!. <br><br>
For example...<br><br>
**.env.development** <br>
REACT_APP_API_URL=http://localhost:3000<br>
MONGO_URI=mongodb+srv://(Your MongoDB ID):(Your MongoDB Password)@loginresister.6q5h7ri.mongodb.net/LoginResister?retryWrites=true&w=majority  
JWT_SECRET=26r9$gWq!5xHqT2@fR4vM5yK <br> 

**Make sure that when your password contains special characters, you use URL encoding. For example, ** becomes %2A%2A.** <br>







