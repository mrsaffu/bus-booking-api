const User = require("../models/Users");
const { hashData, compareData } = require("../utils/encrypData");

const { generateAccessToken } = require("../utils/token");


// ! User register 
const register = async (req, res) => {
    try {
        const { name, email, password, conform_password, role } = req.body;
        console.log(password, conform_password);

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ error: 'User already exists' })

        }

        if (conform_password !== password) {
            return res.status(400).json({ error: true, message: "User password and conformpassword does not match" })
        }
        const hashedPassword = await hashData(password)

        const newUser = await User.create({ name, email, password: hashedPassword, role })
        // const response = await newUser.save()
        console.log('User registered successfully');
        res.status(200).json({ message: "User registered successfully", data: newUser })


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })

    }
}

// ! User Login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: true, message: "User does not exist with this email" })
        }

        const is_match = await compareData(password, user.password);
        if (!is_match) {
            return res.status(400).json({ error: true, message: "Password invalid please check the password ..!" })
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful!",
            accessToken,

        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })

    }
}



module.exports = {
    register,
    login
}