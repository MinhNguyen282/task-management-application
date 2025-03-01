const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({message: 'Please authenticate'});
        }


        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({message: 'Please authenticate'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({message: 'Please authenticate'});
    }
};

module.exports = auth;