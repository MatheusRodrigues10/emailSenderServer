//verifica se existe usuario logado.
export default (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "Você precisa estar logado." });
  }
  next();
};
