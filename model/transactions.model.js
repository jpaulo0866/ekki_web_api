import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const transactionModel = new Schema({
    user: { 
        type: ObjectId, 
        ref: 'users'
    },
    type: {
        type: String,
        required: true,
        trim: true,
        default: 'In'
    },
    identification: {
        type: String,
        trim: true
    },    
    value: {
        type: Number,
        required: true
    },
    from: {
        type: ObjectId,
        ref: 'users'
    },
    to: {
        type: ObjectId,
        ref: 'users'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
transactionModel.plugin(mongoosePaginate);

export default mongoose.model("transaction", transactionModel);