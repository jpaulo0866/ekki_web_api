import { verify, sign } from 'jsonwebtoken';
import { secret, expirationToken } from '../properties/config.json';

export const jwtAuth = async (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, token');
    
    if (req.method === 'OPTIONS') {
        return next();
    }

    if (req.url.includes('/login') 
        || req.url.includes('/forgotpassword')
        || req.url.includes('/changepass')) {
        return next();
    }

    if (!req.headers.token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }

    let token = req.headers.token;
    verifyToken(token, (err, decoded) => {
        if (err) {
            res.status(401).send({status: false, message: 'Token inválido', err: err});
        } else {
            next();
        }
    });
}

export const verifyToken = (token, callback) => {
    verify(token, secret, (err, decoded) => {
        if (callback) callback(err, decoded);
    });
}

export const generateToken = (payload) => {
    return {token: sign(payload, secret, {
        expiresIn: expirationToken
    }), 
    expires: expirationToken};
}