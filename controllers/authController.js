import keys from "../config/keys.js";

export const handleGoogleCallback = (req, res) => {
  res.redirect(`${keys.CLIENT_URL}/surveys`);
};

export const logoutUser = (req, res) => {
  req.logout(); // Passport adiciona esse método
  res.redirect(`${keys.CLIENT_URL}`);
};

export const getCurrentUser = (req, res) => {
  res.send(req.user); // `req.user` é definido pelo Passport após autenticação
};
