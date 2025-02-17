import express from 'express';
import passport from './services/passport.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

//inicializa o passport
app.use(passport.initialize());

//usa o middlewere para todas as rotas de autenticação
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta 5000")
});

