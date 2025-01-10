const UserData = require('../Model/userModel')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}
const AddUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({ message: 'All Fields are required' })
        }
        const UserExists = await UserData.findOne({ email });
        if (UserExists) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const NewUser = await UserData.create({ username, email, password, role: 'Regular' });
        const token = generateToken(NewUser._id);
        await NewUser.save();
        return res.status(201).json(({
            user: {
                id: NewUser._id, email: NewUser.email
            }, token
        }));
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All Fields are required' })
        }
        const User = await UserData.findOne({ email });
        console.log(User);
        if (!User) {
            return res.status(404).json({ message: "User Does Not Exist" });
        }
        const isPasswordValid = await bycrpt.compare(password, User.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = generateToken(User._id);
        return res.status(201).json(({
            user: {
                id: User._id, email: User.email
            }, token
        }));

    } catch (err) {
        res.status(500).json({ message: err.message });

    }
}

const AddAdmin = async (req, res) => {
    try {
        const { username, email, password, adminkey } = req.body;
        if (!username || !email || !password || !adminkey) {
            return res.json({ message: 'All Fields are required' });
        }
        const UserExists = await UserData.findOne({ email });
        if (UserExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (adminkey != process.env.ADMIN_KEY) {
            return res.status(400).json({ message: "Invalid Credentials|Admin Key" });
        }

        const NewUser = await UserData.create({ username, email, password, role: 'Admin' });
        const token = generateToken(NewUser._id);
        await NewUser.save();
        return res.status(201).json(({
            user: {
                id: NewUser._id, email: NewUser.email
            }, token
        }));
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const LoginAdmin = async (req, res) => {
    try {
        const { email, password, adminkey } = req.body;
        if (!email || !password || !adminkey) {
            return res.json({ message: 'All Fields are required' })
        }
        const User = await UserData.findOne({ email });
        // console.log(User);
        if (!User) {
            return res.status(404).json({ message: "User Does Not Exist" });
        }
        if (adminkey != process.env.ADMIN_KEY) {
            return res.status(400).json({ message: "Invalid Credentials|Admin Key" });
        }
        const isPasswordValid = await bycrpt.compare(password, User.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = generateToken(User._id);
        return res.status(201).json(({
            user: {
                id: User._id, email: User.email
            }, token
        }));

    } catch (err) {
        res.status(500).json({ message: err.message });

    }
}


module.exports = { AddUser, LoginUser,AddAdmin,LoginAdmin };