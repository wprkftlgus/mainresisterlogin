import React from 'react';

function AboutContent() {
  return (
    <div className="about-container">
      <h2>About</h2>
      <p>
        Welcome to our community-driven secondhand marketplace dashboard.  
This platform is designed to make buying and selling pre-owned items simple, secure, and efficient.  

Users can easily sign up and create an account, and with the integrated login system, they can securely access their personalized dashboard at any time. To ensure the safety and integrity of user accounts, the system implements password hashing with bcrypt along with token-based authentication. This guarantees that sensitive information remains protected while providing a smooth and reliable login experience.  

Once logged in, members are able to create posts to list items they wish to sell or browse through available listings from other users. The dashboard features a built-in search function, allowing users to quickly find items by keywords. On top of that, filtering options are available so that users can narrow down results and locate exactly what they are looking for without unnecessary effort.  

This combination of account security, search capabilities, and filtering tools creates a user-friendly marketplace environment where people can confidently trade secondhand goods. Whether you are decluttering your space by selling unused items or looking for affordable deals, our platform provides a safe and convenient way to connect buyers and sellers.  

      </p>
    </div>
  );
}

export default AboutContent;
