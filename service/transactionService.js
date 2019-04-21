import transactionModel from '../model/transactions.model';
import accountModel from '../model/account.model';
import moment from 'moment';

export const getBalance = (userId, callback) => {
    accountModel.findOne({user: userId})
    .then((result) => {
        const filteredBalance = result;
        filteredBalance.history = filteredBalance.history != null && Array.isArray(filteredBalance.history) 
            ? filteredBalance.history.filter((item) => {
            const sevenDaysBefore = moment().subtract(7, 'days');  
            return sevenDaysBefore.isBefore(moment(item.created));
        }) : [];
        filteredBalance.history = filteredBalance.history.sort((a,b) => b.created - a.created);

        filteredBalance.history.forEach((item) => {
            if (item.user) {
                item.user.password = null;
            }

            if (item.to) {
                item.to.password = null;
            }

            if (item.from) {
                item.from.password = null;
            }
        })
        callback(null, filteredBalance)
    } )
    .catch((err) => callback(err));
}

export const newTransaction = (transfer, callback) => {
    accountModel.findOne({user: transfer.user}, (err, account) => {
        if (err) {
            if (callback) callback(err);
        } else {
            const outBalance = account;
            let outTransaction = new transactionModel();
            outTransaction.user = transfer.user;
            outTransaction.type = 'Out'; 
            outTransaction.value = transfer.value;
            outTransaction.identification = transfer.identification;
            outTransaction.to = transfer.favored;
            outTransaction.save()
            .then((result) => {
                outBalance.value -= transfer.value;
                outBalance.value = outBalance.value > 0 ? outBalance.value : 0;
                outBalance.history.push(result._id);
                outBalance.save();
            });
        }
    })

    accountModel.findOne({user: transfer.favored}, (err, inAccount) => {
        if (err) {
            if (callback) callback(err);
        } else {
            const inBalance = inAccount;
            let inTransaction = new transactionModel();
            inTransaction.user = transfer.favored;
            inTransaction.type = 'In'; 
            inTransaction.identification = transfer.identification;
            inTransaction.value = transfer.value;
            inTransaction.from = transfer.user;
            inTransaction.save()
            .then((result) => {
                inBalance.value += transfer.value;
                inBalance.history.push(result._id);
                inBalance.save();
            });
        }
    })
}

export const newAccount = (userId, callback) => {
    let account = new accountModel();
    account.user = userId;
    account.save()
    .then((response) => {
        callback(null, response);
    })
    .catch((err) => callback(err));
}