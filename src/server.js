const express = require('express');

const app = express();

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})


app.get('/message/:user/:id', (request, response) => {
    const { user, id } = request.params;

    response.send(`Na url está ${user} e ${id}`);
})