import creditCardModel from '../model/creditCard.model';

export const findById = (id, callback) => {
    creditCardModel.findById(id, (err, creditCard) => {
        if (callback) callback(err, creditCard);
    });
}

export const create = (creditCard, callback) => {
    const creditCardObj = new creditCardModel(creditCard);
    creditCardObj.save()
    .then((result) => callback(null,result))
    .catch((err) => callback(err));
}

export const update = (creditCard, callback) => {
    findById(creditCard._id, (err, creditCardObject) => {
        if (err) {
            callback(err);
        } else {
            creditCardObject.name = creditCard.name;
            creditCardObject.owner = creditCard.owner;
            creditCardObject.flag = creditCard.flag;
            creditCardObject.number = creditCard.number;
            creditCardObject.validThru = creditCard.validThru;
            creditCardObject.cv = creditCard.cv;
            
            creditCardObject.save()
            .then((result) => callback(null, result))
            .catch((err) => callback(err));
        }
    })
}

export const remove = (id, callback) => {
    creditCardModel.findByIdAndRemove(id, (err, result) => {
        callback(err, result);
    });
}

export const findAll = (page, count, token, callback) => {
    creditCardModel.paginate({user: token}, {sort: {
        created: 'desc'
    }, page: page, limit: count})
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
}