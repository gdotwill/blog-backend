import * as userService from "../services/usersServices.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (err) { 
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};