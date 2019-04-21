import Cryptr from 'cryptr';
import { generateToken } from './jwtauth';
import { findByEmail } from './userService';
const securePass = new Cryptr('aes256');

export const login = (email, pass, callback) => {
    findByEmail(email, (err, user) => {
        if (err || !user || user.length === 0) {
            callback(err || 'Usuário não encontrado');
        } else {
            if (pass != securePass.decrypt(user.password)) {
                callback('Senha incorreta');    
            } else {
                user.password = null;
                let genToken = generateToken({id: user._id, email: user.email});
                callback(null, {token: genToken.token, user: user, expires: genToken.expires});
            }
        }
    })
}