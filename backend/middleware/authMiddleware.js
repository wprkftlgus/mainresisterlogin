const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const token = req.headers.authoriztion?.split('')[1];
    
    if(!token){
        return res.status(401).json({ message: 'No token provided'})
    }
    try {
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token'})
    }
};

module.exports = authMiddleware;