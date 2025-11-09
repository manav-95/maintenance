import Document from '../models/Document.js';
import User from '../models/User.js';
import Society from '../models/Society.js';

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
            path: file.path,
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

export const getAllDocumentsForMembers = async (req, res) => {
    try {

        const { memberId } = req.body;
        if (!memberId) return res.status(400).json({ message: 'Member ID is required' });

        // step 1 find member society
        const member = await User.findById(memberId);
        if (!member) return res.status(404).json({ message: 'Member not found' });

        const society = await Society.findById(member.society);
        if (!society) return res.status(404).json({ message: 'Society not found' });

        // step 2 find manager of that society
        const managerId = society.manager;
        if (!managerId) return res.status(404).json({ message: 'Manager not found for the society' });

        // step 3 get all documents uploaded by that manager
        const documents = await Document.find({ manager: managerId });
        return res.status(200).json({ message: "User Documents Found Successfully", documents });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}