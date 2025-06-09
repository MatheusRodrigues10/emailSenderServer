
# Reativa

**Reativa** é uma aplicação web para envio de pesquisas de feedback por e-mail, com autenticação via Google, controle de créditos e pagamentos integrados via Stripe. A plataforma foi projetada com foco em segurança, modularidade e escalabilidade, utilizando tecnologias modernas no frontend e backend.

---

## Funcionalidades

- Autenticação via Google (OAuth 2.0 com Passport.js)
- Criação e envio de pesquisas com múltiplos destinatários
- Links rastreáveis por destinatário com criptografia de e-mail
- Sistema de créditos por usuário
- Pagamento via Stripe (modo de testes disponível)
- Dashboard com histórico de envios

---

## Tecnologias Utilizadas

### Frontend
- Vite + React com TypeScript
- Tailwind CSS
- Redux Thunk
- Axios

### Backend
- Express.js
- MongoDB com Mongoose
- Passport.js para autenticação
- Stripe SDK
- Sessões com cookie-session
- Render para deploy

---

## URL de Produção

A aplicação está hospedada em ambiente de produção via Render:

**https://emailsenderserver.onrender.com**

---

## Pagamentos com Stripe (Modo de Testes)

Durante a fase beta, é possível testar a compra de créditos utilizando o ambiente de testes do Stripe.

**Cartão de teste:**

- Número: `4242 4242 4242 4242`
- Validade: qualquer data futura (exemplo: 12/29)
- CVC: qualquer número (exemplo: 123)

Cada pagamento aprovado adiciona **5 créditos** ao usuário logado.

---

## Criptografia de E-mails

Os e-mails dos destinatários são codificados antes de serem incluídos nos links enviados. Ao clicar, o endereço é decodificado no backend, garantindo:

- Segurança do dado sensível
- Validação segura de resposta

Local do utilitário:  
`/utils/emailEncoder.js`

Métodos disponíveis:
- `encodeEmail(email: string): string`
- `decodeEmail(encoded: string): string`

---

## Como Rodar Localmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/SEU_USUARIO/reativa.git
cd reativa
```

### 2. Instalar Dependências

```bash
npm install
cd client && npm install
```

### 3. Criar Arquivo de Ambiente

Crie um arquivo `config/dev.js` com o seguinte conteúdo (substitua com suas próprias chaves de API):

```js
// config/dev.js
const devKeys = {
  googleClientID: "...",
  googleClientSecret: "...",
  mongoURI: "...",
  cookieKey: "...",
  CLIENT_URL: "http://localhost:5173",
  stripePublishableKey: "...",
  stripeSecretKey: "...",
  sendGridKey: "...",
  redirectDomain: "http://localhost:5000",
};

export default devKeys;
```

**Importante:** nunca exponha esse arquivo em ambiente público.

### 4. Executar o Servidor

```bash
npm run dev
```

Isso iniciará simultaneamente o servidor backend e o frontend React via Vite.

---

## Licença

Projeto de uso acadêmico e educacional. Livre para estudo, modificação e extensão.

---

## Autor

**Matheus Rodrigues**  
Desenvolvedor Full Stack em formação  
