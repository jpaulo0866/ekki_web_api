import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userModel = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    resetToken: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
userModel.plugin(mongoosePaginate);


export default mongoose.model("users", userModel);