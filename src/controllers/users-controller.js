const AppError = require('../utils/app-error');

class UsersController {
    create(req, res) {
        const { name, password, email, isAdmin } = req.body;

        if (!name || !email) {
            throw new AppError('Nome ou Email inválido.')
        }

        res.status(201).json({ name, email, password, isAdmin });
    }
}

module.exports = UsersController;