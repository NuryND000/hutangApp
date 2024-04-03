import mongoose from "mongoose";

const Hutang = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    hutang: {
        type: Number,
        required: true
    },
    ket: {
        type: String,
        required: true
    },
})
const Bayar = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    bayar: {
        type: Number,
        required: true
    },
})
const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sisahutang:{
        type:Number,
        required:true,
        default: 0

    },
    hutang: [
        Hutang,
    ],

    bayar: [
        Bayar,
    ]

});

export default mongoose.model('Users', User);