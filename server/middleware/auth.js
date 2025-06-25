const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader) res.status(401).json({message: 'Unauthorized'});
        const token = authHeader.split(' ')[1];
        if(!token) res.status(201).json({message:'Token missing'});
        const decoded = jwt.verify(process.env.JWT_SECRET, token);
        req.user = {id: decoded.id};
        next();
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = auth;