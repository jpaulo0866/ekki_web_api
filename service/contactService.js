import contactModel from '../model/contact.model';

export const findById = (id, callback) => {
    contactModel.findById(id, (err, contact) => {
        if (callback) callback(err, contact);
    });
}

export const create = (contact, callback) => {
    const contactObj = new contactModel(contact);
    contactObj.save()
    .then((result) => callback(null,result))
    .catch((err) => callback(err));
}

export const update = (contact, callback) => {
    findById(contact._id, (err, contactObject) => {
        if (err) {
            callback(err);
        } else {
            contactObject.name = contact.name;
            contactObject.bank = contact.bank;
            contactObject.account = contact.account;
            contactObject.agency = contact.agency;
            contactObject.email = contact.email;
            
            contactObject.save()
            .then((result) => callback(null, result))
            .catch((err) => callback(err));
        }
    })
}

export const remove = (id, callback) => {
    contactModel.findByIdAndRemove(id, (err, result) => {
        callback(err, result);
    });
}

export const findAll = (page, count, callback) => {
    contactModel.paginate({}, {sort: {
        created: 'desc'
    }, page: page, limit: count})
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
}