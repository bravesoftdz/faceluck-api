const express = require('express');
const requiredir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requiredir('./controllers');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * Auth routes
 */
routes.use(authMiddleware);

/**
 * Users
 */
routes.get('/users/me', controllers.userController.me);
routes.put('/users', controllers.userController.update);
routes.get('/feed', controllers.userController.feed);

/**
 * Friends
 */
routes.post('/friendship/:id', controllers.friendshipController.create);
routes.delete('/friendship/:id', controllers.friendshipController.destroy);

/**
 * Posts
 */
routes.get('/posts/:id', controllers.postController.show);
routes.post('/posts', controllers.postController.create);
routes.delete('/posts/:id', controllers.postController.destroy);

/**
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

/**
 * Comments
 */
routes.post('/comments', controllers.commentController.create);
routes.delete('/comments/:id', controllers.commentController.destroy);

module.exports = routes;
