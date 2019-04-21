import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const accountModel = new Schema({
    user: { 
        type: ObjectId, 
        ref: 'users'
    },
    value: {
        type: Number,
        required: true,
        default: 0
    },
    history: [
        {
            type: ObjectId,
            ref: 'transaction'
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});
accountModel.plugin(mongoosePaginate);

var autoPopulateLead = function(next) {
    this.populate({path : 'history', populate : [{path : 'to'}, {path : 'user'}, {path : 'from'}]});
    next();
};
  
accountModel.
    pre('findOne', autoPopulateLead).
    pre('find', autoPopulateLead);

export default mongoose.model("account", accountModel);