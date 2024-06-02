import user from "../models/usermodel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

/*export const login = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new user({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "new user created" });
    } catch (err) {
        next(err);
    }
};   */

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const ValidUser = await user.findOne({ email });
        if (!ValidUser) return next(errorHandler(404, 'User Not Found'));
        const ValidPassword = bcryptjs.compareSync(password, ValidUser.password);
        if (!ValidPassword) return next(errorHandler(401,"Invalid credentials" ));
        const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = ValidUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1hour
        res.cookie('access_token', token, { httpOnly: true, expire: expiryDate }).status(200).json(rest)
    } catch (err) {
        next(err);
    }
};