const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports = {
  async show(req, res, next) {
    try {
      const post = await Post.findById(req.params.id).populate('comments');

      if (!post) {
        return res.status(400).json({ error: "Post doesn't exist" });
      }

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const post = await Post.create({ ...req.body, user: req.userId });

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Post.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
