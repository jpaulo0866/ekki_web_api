import userModel from "../model/user.model";
import {newAccount} from './transactionService';
import Cryptr from 'cryptr';
const securePass = new Cryptr('aes256');

export const findById = (id, callback) => {
    userModel.findById(id, (err, user) => {
        if (callback) callback(err, user);
    });
}

export const findByEmail = (email, callback) => {
    userModel.findOne({email: email}, (err, user) => {
        if (callback) callback(err, user);
    })
}

export const create = (user, callback) => {
    const userObject = new userModel(user);
    userObject.password = securePass.encrypt(user.password);
    userObject.save()
    .then((result) => 
    {   
        newAccount(result._id, (err, response) => {
            callback(null, result);
        })
    })
    .catch((err) => callback(err, null));
}