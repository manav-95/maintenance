import mongoose from "mongoose";

const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    pinCode: {
        type: String,
        required: true,
        trim: true
    },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
}, {
    timestamps: true
});

const Society = mongoose.model('Society', societySchema);
export default Society;

