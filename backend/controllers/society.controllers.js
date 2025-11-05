import Society from '../models/Society.js';
import User from '../models/User.js';

export const createSociety = async (req, res) => {
    try {
        const { name, address, city, state, pinCode, managerName, managerEmail, managerPhone, managerPassword } = req.body;
        // Create Manager User
        const manager = await User.create({
            name: managerName,
            email: managerEmail,
            phone: managerPhone,
            password: managerPassword,
            role: 'admin'
        });

        // Create Society and Assign Manager
        const society = await Society.create({
            name,
            address,
            city,
            state,
            pinCode,
            manager: manager._id
        });

        // Link Manager to Society
        manager.society = society._id;
        await manager.save();

        return res.status(201).json({ message: 'Society and manager created', society, manager });
        
    } catch (error) {
        console.error('Failed To Create Society And Manager:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}



// export const getSocietyDetails = async (req, res) => {
//     try {
//         const { societyId } = req.params;
//         const society = await Society.findById(societyId).populate('manager', 'name email phone');      
//         if (!society) {
//             return res.status(404).json({ message: 'Society not found' });
//         }   
//         return res.status(200).json({ society });
//     } catch (error) {
//         console.error('Failed To Get Society Details:', error);
//         return res.status(500).json({ message: 'Server error', error: error.message });
//     }
// }
