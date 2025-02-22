//keys.js - verifica ambiente para usar chaves respectivas.
let keys;

if (process.env.NODE_ENV === "production") {
  // Se estiver em produção, use as chaves de produção
  keys = await import("./prod.js").then((module) => module.default);
} else {
  try {
    // Se estiver em desenvolvimento, tente carregar `dev.js`
    keys = await import("./dev.js").then((module) => module.default);
  } catch (error) {
    console.error("Arquivo dev.js não encontrado! Certifique-se de que ele existe no ambiente de desenvolvimento.");
  }
};

/* O .then((module) => module.default) é necessário porque import() em ESM (ECMAScript Modules) retorna um objeto de módulo, e queremos pegar apenas o export default desse módulo.
    ele retornaria algo como se estivesse sem:
    const module = await import("./dev.js");
    console.log(module); === { default: { googleClientID: "...", googleClientSecret: "...", ... } }
*/

export default keys;
