const { hash, compare } = require('bcryptjs');
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
        const { name, email, password, old_password } = req.body;
        const { id } = req.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if (!user) {
            throw new AppError('Usuário não encontrado')
        }

        const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (userWithUpdateEmail && user.email !== email) {
            throw new AppError('Este email já está em uso')
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError('Você precisa informar a senha antiga');
        }

        if (password && old_password) {
            const checkIfOldPasswordIsCorrect = await compare(old_password, user.password);

            if (!checkIfOldPasswordIsCorrect) {
                throw new AppError('Senha antiga está incorreta');
            }

            const hashedPassword = await hash(password, 8);
            user.password = hashedPassword;
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = ?
            WHERE id = ?`,
            [user.name, user.email, user.password, new Date(), id]
        );

        return res.status(200).json();
    }
}

module.exports = UsersController;