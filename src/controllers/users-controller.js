const AppError = require('../utils/app-error');

const sqliteConnection = require('../database/sqlite')

class UsersController {
    async create(req, res) {
        const { name, password, email } = req.body;

        const database = await sqliteConnection();
        const checkIfUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkIfUserExists) {
            throw new AppError('Este email já está em uso')
        }

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])

        return res.status(201).json();

    }
}

module.exports = UsersController;