import express from 'express';

//um so app que usa as funções do express
const app = express();

//primeira rota
app.get('/', (req, res) => {
 res.send({ hi: 'there' });
});

//no caso o site de deploy cria essas variaveis de ambiente para nois (ocultas)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta 5000")
});