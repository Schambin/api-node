const { Router } = require("express");

const UsersController = require('../controllers/users-controller');

const usersRoutes = Router();

function myMiddleware(request, response, next) {
    console.log('Bateu no middleware')

    if (!request.body.isAdmin) {
        return response.json({ message: 'user unauthorized' });
    }

    next();
}

const usersController = new UsersController();

usersRoutes.post('/', myMiddleware, usersController.create);

module.exports = usersRoutes;