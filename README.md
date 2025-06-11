
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

Perfeito. Segue a **versão corrigida e final da seção de configuração de ambiente**, com `import` (ES Modules) e instruções detalhadas para **obter e configurar cada chave**, incluindo o `.env` do frontend com Vite.

---

### 3. Configurar Ambiente de Desenvolvimento

#### 3.1 Backend (`config/dev.js`)

Crie um arquivo `config/dev.js` com o seguinte conteúdo (substitua os valores pelas suas chaves reais):

```js
// config/dev.js
const devKeys = {
  googleClientID: "...",               // ID do Cliente OAuth do Google
  googleClientSecret: "...",           // Segredo do Cliente OAuth do Google
  mongoURI: "...",                     // URI de conexão com MongoDB
  cookieKey: "...",                    // Chave de sessão para assinar cookies
  CLIENT_URL: "http://localhost:5173", // URL do frontend (modo dev)
  stripePublishableKey: "...",         // Chave publicável do Stripe (modo de teste)
  stripeSecretKey: "...",              // Chave secreta do Stripe (modo de teste)
  sendGridKey: "...",                  // API Key do SendGrid
  redirectDomain: "http://localhost:5000", // URL base do backend (modo dev)
};

export default devKeys;
```

**Importante:** esse arquivo **não deve ser commitado**. Inclua `config/dev.js` no `.gitignore`.

---

#### 3.2 Frontend (`.env`)

Na raiz do frontend (projeto Vite), crie um arquivo `.env` com a seguinte variável:

```env
VITE_STRIPE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

> Essa chave é a mesma `stripePublishableKey` usada no backend.

---

### 3.3 Onde obter cada chave

* **Google OAuth 2.0**

  * Acesse: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
  * Crie um **OAuth Client ID**
  * Adicione os redirecionamentos:

    * `http://localhost:5000/auth/google/callback` (desenvolvimento)
    * `https://emailsenderserver.onrender.com/auth/google/callback` (produção)

* **MongoDB (Atlas)**

  * Crie um cluster gratuito em: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  * Copie a URI de conexão (exemplo):
    `mongodb+srv://usuario:senha@cluster.mongodb.net/banco`

* **Stripe**

  * Acesse: [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
  * Copie as chaves de teste:

    * **Publishable key** (usada no frontend e backend)
    * **Secret key** (usada apenas no backend)
  * Para testar pagamentos, utilize o cartão de teste:
    `4242 4242 4242 4242` com qualquer data e CVC.

* **SendGrid**

  * Acesse: [SendGrid](https://app.sendgrid.com/settings/api_keys)
  * Crie uma **API Key com permissão de envio de e-mails**

* **Chave de Cookies**

  * Pode ser qualquer string aleatória segura

**Importante:** nunca exponha esse arquivo em ambiente público.

---


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
