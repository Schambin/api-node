const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.post('/', (request, response) => {
    const { name, password, email } = request.body;
    response.send(`Rota post. ${name} ${email} ${password}`);
});

module.exports = usersRoutes;