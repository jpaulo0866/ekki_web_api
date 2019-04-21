import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const transferModel = new Schema({
    user: { 
        type: ObjectId, 
        ref: 'users'
    },
    favored: {
        type: ObjectId, 
        ref: 'users',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    valueOnCredit: {
        type: Number,
        required: false
    }, 
    creditCardUsed: {
        type: ObjectId, 
        ref: 'creditCards',
        required: false
    },
    status: {
        type: String,
        trim: true,
        default: 'transfered'
    },
    identification: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
transferModel.plugin(mongoosePaginate);

export default mongoose.model("transfers", transferModel);