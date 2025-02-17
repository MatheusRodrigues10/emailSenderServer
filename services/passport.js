import passport from 'passport';

//pegamos apenas o metodo
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleClientID, googleClientSecret } from '../config/keys.js';

passport.use(
    new GoogleStrategy({
        //chaves da API
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        //rota de callback ao terminar de autenticar
        callbackURL: '/auth/google/callback'
    }, 
    (acessToken, refreshToken, profile, done) => {
        console.log('token de acesso', acessToken);
        console.log('token de atualização', refreshToken);
        console.log('perfil', profile);
    })
);

export default passport;