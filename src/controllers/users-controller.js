class UsersController {
    create(req, res) {
        const { name, password, email } = req.body;

        res.status(201).json({ name, email, password });
    }
}

module.exports = UsersController;