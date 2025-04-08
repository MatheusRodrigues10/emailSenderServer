import { Request, Response, NextFunction } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

// Configuração do proxy para desenvolvimento
const setupProxy = (app: {
  use: (
    path: string | string[],
    middleware: (req: Request, res: Response, next: NextFunction) => void
  ) => void;
}) => {
  app.use(
    ["/api", "/auth", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true, // Garante que o host da requisição corresponde ao destino
    })
  );
};

export default setupProxy;
