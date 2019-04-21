import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactModel = new Schema({
    user: { type: ObjectId, ref: 'users' },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    bank: {
        type: String,
        trim: true,
        required: true
    },
    account: {
        type: String,
        trim: true,
        required: true
    },
    agency: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
contactModel.plugin(mongoosePaginate);

export default mongoose.model("contacts", contactModel);