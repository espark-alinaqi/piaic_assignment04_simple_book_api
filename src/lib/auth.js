// lib/auth.js
import jwt from 'jsonwebtoken';

export const signToken = (client) => {
    return jwt.sign({ id: client.id, name: client.name, email: client.email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const verifyToken = (req) => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
};
