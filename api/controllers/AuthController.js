import user from "../models/usermodel.js";
import bcryptjs from 'bcryptjs';

export const login = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new user({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "new user created" });
    } catch (err) {
        next(err);
    }
};   
