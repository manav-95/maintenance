import multer from 'multer';
import path from 'path';    
import fs from 'fs';

const uploadDir = path.resolve("uploads/documents");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);    
    },
    filename: function (req, file, cb) {    
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });
export const uploadSingleDocument = upload.single('document');
export const uploadMultipleDocuments = upload.array('documents', 10); // Max 10 files
export const uploadDocumentFields = upload.fields([
    { name: 'document', maxCount: 1 },
    { name: 'documents', maxCount: 10 }
]);
