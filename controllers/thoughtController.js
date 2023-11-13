const { User, Thought } = require('../models');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({});
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that Id!" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      return res.status(200).json({ thought, user });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with this Id!" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with this Id!" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: "No thought with this Id!" });
      }
      return res.status(200).json(reaction);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: "Check your thought and reaction Id!" });
      }
      return res.status(200).json(reaction);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
};


