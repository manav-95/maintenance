import Document from '../models/Document.js';

export const uploadDocument = async (req, res) => {
    try {

        //console.log("Files received:", req.files);
        //console.log("Body received:", req.body);

        const { title, description, manager } = req.body;
        if (!title.trim() || !description.trim() || !manager.trim()) {
            return res.status(400).json({ message: 'All Fields are required' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Map uploaded files
        const uploadedFiles = req.files.map(file => ({
            filename: file.originalname,
            path: file.path.replace(/\\/g, '/'),
            mimetype: file.mimetype,
            size: file.size,
        }));

        const newDocument = new Document({
            title,
            description,
            manager: manager,
            files: uploadedFiles
            
        });
        await newDocument.save();
        return res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}