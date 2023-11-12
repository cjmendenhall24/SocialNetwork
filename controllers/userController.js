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
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this Id!" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with this Id!" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async createFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "No friend with this Id!" });
      }
      return res.status(200).json(friend);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "No friend with this Id!" });
      }
      return res.status(200).json(friend);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
};
