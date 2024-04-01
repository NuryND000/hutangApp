import mongoose from "mongoose";

const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    nominal:{
        type: Number,
        required: true
    },
    ket:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
});

export default mongoose.model('Users', User);