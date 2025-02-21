import express from "express";
import passport from "passport";

const router = express.Router();

//rota de autenticação
router.get(
    '/google/', 
    passport.authenticate('google', {
        scope: ['profile', 'email'] //escopo para pegar perfil e email
    })
);

//callback pós autenticcação
router.get('/google/callback', passport.authenticate('google'));

//desloga o usuário
router.get('/api/logout', (req, res) => {
    // Remove a sessão do usuário
    req.logout();
    //prova ao usuário que ele não está mais logado
    res.send(req.user);
});


//rota para teste de requisição
router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});


export default router;