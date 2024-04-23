const { Router } = require("express");

const UsersController = require('../controllers/users-controller');

const usersRoutes = Router();

function myMiddleware(req, res, next) {

    next();
}

const usersController = new UsersController();

usersRoutes.post('/', myMiddleware, usersController.create);

module.exports = usersRoutes;