class UsersController {
    create(request, response) {
        const { name, password, email } = request.body;

        response.status(201).json({ name, email, password });
    }
}

module.exports = UsersController;