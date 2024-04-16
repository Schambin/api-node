const express = require('express');

const app = express();

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

//Route Params
app.get('/message/:user/:id', (request, response) => {
    const { user, id } = request.params;

    response.send(`Na url está ${user} e ${id}`);
})

//Query Params
app.get('/products', (request, response) => {
    const { page, limit } = request.query;

    response.send(`Página ${page}. Mensagens: ${limit}`)
})