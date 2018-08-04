const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

module.exports = {
  async create(req, res, next) {
    try {
      const me = await User.findById(req.userId);

      const post = await Post.findById(req.body.post);

      if (!post) {
        return res.status(400).json({ error: "Post doesn't exist" });
      }

      if (me.friends.indexOf(post.user) === -1 && post.user.toString() !== me._id.toString()) {
        return res.status(400).json({ error: 'You and the owner of the post are not friends' });
      }

      const comment = await Comment.create({ user: req.userId, ...req.body });

      post.comments.push(comment._id);
      await post.save();

      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const comment = await Comment.findById(req.params.id);

      const post = await Post.findById(comment.post);
      post.comments.splice(comment._id, 1);
      await post.save();

      await Comment.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
