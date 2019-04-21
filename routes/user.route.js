import express from 'express';
import userModel from '../model/user.model';
import { findByEmail } from '../service/userService';
import { verifyToken, generateToken } from '../service/jwtauth';
import { send } from '../service/mailService'; 
import Cryptr from 'cryptr';
const securePass = new Cryptr('aes256');

const userRoute = express.Router();

userRoute.put('/changepass', (req, res) => {
    let token = req.headers.token || req.body.token;
    verifyToken(token, (err, decoded) => {
        userModel.findById(decoded.id, (err, user) => {
            if (err) {
                res.status(400).send({status: false, message: err})
            } else {
                if (req.body.password) {
                    if (req.body.password === securePass.decrypt(user.password)) {
                        user.password = securePass.encrypt(req.body.newPassword);
                        user.save()
                        .then((result) => {
                            result.password = null;
                            res.send({status: true, result});
                        })
                        .catch((err) => res.status(400).send({status: false, message: err}))
                    } else {
                        res.status(400).send({status: false, message: 'Senha informada está incorreta'})
                    }
                } else {
                    verifyToken(req.body.token, (err, result) => {
                        if (err) {
                            res.status(400).send({status: false, message: 'Token Inválido'})
                        } else {
                            if (req.body.token === user.resetToken) {
                                user.password = securePass.encrypt(req.body.newPassword);
                                user.save()
                                .then((result) => {
                                    result.password = null;
                                    res.send({status: true, result});
                                })
                                .catch((err) => res.status(400).send({status: false, message: err}))
                            } else {
                                res.status(400).send({status: false, message: 'Token Inválido'})
                            }
                        }
                    })
                }
            }
        })
    })
})

userRoute.post('/forgotpassword', (req, res) => {
    findByEmail(req.body.email, (err, result) => {
        if (err) {
            res.status(400).send({status: false, message: err});
        } else {
            result.resetToken = generateToken({id: result._id, email: result.email}).token;
            result.save()
            .then((response) => 
            {
                send({
                    to: result.email,
                    subject: 'Ekki -> Recuperação de Senha',
                    body: `Perdeu a senha, não esquenta... Use este token: ${result.resetToken}`
                });
                response.password = null;
                res.send({status: true, data: response});
            })
            .catch((err) => {
                res.status(400).send({status: false, message: err})
            });
        }
    })
})

export default userRoute;