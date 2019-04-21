import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const creditCardModel = new Schema({
    user: { type: ObjectId, ref: 'users' },
    name: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: String,
        trim: true,
        required: true
    },
    flag: {
        type: String,
        trim: true,
        required: true
    },
    number: {
        type: String,
        trim: true,
        required: true,
        index: {
            unique: true
        }
    },
    validThru: {
        type: String,
        trim: true,
        required: true
    },
    cv: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
creditCardModel.plugin(mongoosePaginate);

export default mongoose.model("creditCards", creditCardModel);