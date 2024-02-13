import express from "express"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const router = express.Router()

router.post("/register", async (req, res) => {

    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("user created")
    }
    catch (err) {
        res.status(400).json(err)
    }

})
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) return next(createError(404, "User Not found"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong password or Username"))

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller,
        },
            process.env.JWT_KEY
        )

        const { password, ...info } = user._doc
        res.cookie("accessToken", token, { httpOnly: true, }).status(200).send(info)
    }
    catch (err) {
        res.status(400).json(err)
    }
})
router.post("/logout", async (req, res) => {
    res.clearCookie("accesToken", {
        sameSite: "none",
        secure: true,
    }).status(200).send("User has been logged out")
})

export default router