const { User, Thought } = require("../models");

module.exports = {
async getAllUsers(req, res) {
    try {
        const users = await User.find()
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v");
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
},

async getSingleUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v");
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }}};