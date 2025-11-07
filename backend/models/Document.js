import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: String,
    description: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    files: [{
        filename: String,
        path: String,
        size: Number,
        mimetype: String,
    }]
}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);

export default Document;
