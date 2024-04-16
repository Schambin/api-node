const express = require('express');

const app = express();
app.use(express.json())

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

app.post('/users', (request, response) => {
    const { name, password, email } = request.body;
    response.send(`Você chamou a rota post. ${name} ${email} ${password}`);
});