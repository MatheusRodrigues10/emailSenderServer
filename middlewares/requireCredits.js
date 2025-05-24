//verifica se existe usuario tem créditos.
export default (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "Créditos insuficientes" });
  }
  next();
};
