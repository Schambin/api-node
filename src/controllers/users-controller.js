const { hash } = require('bcryptjs');
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

        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword])

        return res.status(201).json();

    }

    async update(req, res) {
        const { name, email } = req.body;
        const { id } = req.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT FROM users WHERE id = (?)', [id]);
    }
}

module.exports = UsersController;