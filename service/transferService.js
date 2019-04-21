import transferModel from '../model/transfer.model';
import moment from 'moment';
import { newTransaction } from './transactionService';

export const findById = (id, callback) => {
    transferModel.findById(id).populate('favored')
    .then((transfer) => callback(null, transfer))
    .catch((err) => callback(null));
}

export const find = (params, callback) => {
    transferModel.find(params).populate('favored')
    .then((transfer) => callback(null, transfer))
    .catch((err) => callback(null));
}

export const create = (transfer, callback) => {
    
    let options = {
        user: transfer.user
    };

    const twoMinutesBefore = moment().subtract(2, 'minutes'); 

    options.created = {
        $gte: twoMinutesBefore, 
        $lte: moment()
    };

    options.value = transfer.value;
    options.favored = transfer.favored;

    find(options, (err, duplicatedResults) => {
        if (err) {
            callback(err, null);
        } else {
            const transferObj = new transferModel(transfer);
            transferObj.save()
            .then((result) => {
                if (Array.isArray(duplicatedResults) && duplicatedResults.length > 0) {
                    duplicatedResults.forEach((item) => {
                        cancel(item, () => {});
                    })        
                } else {
                    newTransaction(result);
                }   
                callback(null,result);                   
            })
            .catch((err) => callback(err));
        }
    })
}

export const cancel = (trasnfer, callback) => {
    findById(trasnfer._id, (err, trasnferObject) => {
        if (err) {
            callback(err);
        } else {
            trasnferObject.status = 'Cancelled';
            
            trasnferObject.save()
            .then((result) => callback(null, result))
            .catch((err) => callback(err));
        }
    })
}

export const findAll = (page, count, token, callback) => {
    transferModel.paginate({user: token}, {sort: {
        created: 'desc'
    }, page: page, limit: count, populate: 'favored'})
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
}