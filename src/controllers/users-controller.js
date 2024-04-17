class UsersController {
    create(request, response) {
        const { name, password, email } = request.body;

        response.json({ name, email, password });
    }
}

module.exports = UsersController;