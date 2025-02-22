import passport from 'passport';
import mongoose from 'mongoose';

//pegamos apenas o metodo
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
//variaveis de ambiente
import keys from './config/keys.js';

const User = mongoose.model('users');

//envia o id do mongoDb para o cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//pegamos o id que passamos para o cookie
passport.deserializeUser(async (id, done) => {
    try {
        // Busca o usuário no banco de dados pelo ID armazenado na sessão                      
        const user = await User.findById(id);
        // Se encontrou o usuário, passa ele para o done()
        done(null, user);
    } catch (error) {
        // Em caso de erro, passa o erro para o done()
        done(error, null);
    }
});


passport.use(
    new GoogleStrategy({
        // Chaves da API do Google OAuth
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        // Rota de callback para onde o Google redireciona após autenticação
        callbackURL: '/auth/google/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Verifica se o usuário já existe no banco de dados com o ID do Google
            const existingUser = await User.findOne({ googleID: profile.id });

            if (existingUser) {
                // Se o usuário já existe, chamamos 'done' passando null(sem erro) e o usuário encontrado
                return done(null, existingUser);
            }
            // Se o usuário não existir, criamos um novo e o salvamos no banco
            const newUser = await new User({ googleID: profile.id }).save();
            // Passamos o novo usuário para o 'done' para que o Passport possa gerenciá-lo.
            return done(null, newUser);
        } catch (error) {
            // Em caso de erro na busca ou criação do usuário, passamos o erro para o 'done'
            return done(error, null);
        }
    })
);
