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

export default router;