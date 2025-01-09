const jwt = require('jsonwebtoken');
const UserData = require('../Model/userModel');

const protect = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        req.user = await UserData.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Proceed to the next middleware
        next();
    } catch (err) {
        console.error('Error in protect middleware:', err.message);
        res.status(401).json({
            message: 'Not authorized, token failed',
        });
    }
};

module.exports = { protect };
