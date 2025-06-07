import keys from "../../config/keys.js";

// template para pesquisas (e-mail)
export default (survey, encodedEmail) => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center;">
          <h2 style="color: #333;">Queremos ouvir você!</h2>
          <p style="font-size: 16px; color: #555;">Sua opinião é muito importante para nós. Responda à pergunta abaixo:</p>
          <p style="font-size: 18px; font-weight: bold; color: #222;">${survey.body}</p>
          
          <div style="margin: 30px 0;">
            <a href="${keys.redirectDomain}/survey/webhooks/${survey.id}/yes?email=${encodedEmail}" 
               style="display: inline-block; margin: 10px; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; font-size: 16px; border-radius: 6px; transition: background-color 0.3s;">
              Sim
            </a>
            <a href="${keys.redirectDomain}/survey/webhooks/${survey.id}/no?email=${encodedEmail}" 
               style="display: inline-block; margin: 10px; padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; font-size: 16px; border-radius: 6px; transition: background-color 0.3s;">
              Não
            </a>
          </div>

          <p style="font-size: 12px; color: #999;">Se você recebeu este e-mail por engano, basta ignorá-lo.</p>
        </div>
      </body>
    </html>
  `;
};
