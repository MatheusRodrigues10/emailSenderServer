import sgMail from "@sendgrid/mail";
import keys from "../config/keys.js";

//chave da api
sgMail.setApiKey(keys.sendGridKey);

class Mailer {
  constructor({ subject, recipients }, content) {
    this.from = "reativamais100@gmail.com";
    this.subject = subject;
    this.recipients = this.formatAddresses(recipients);
    this.html = content;
    this.addClickTracking();
  }

  formatAddresses(recipients) {
    //usando destructuring para pegar apenas email
    return recipients.map(({ email }) => email);
  }

  addClickTracking() {
    this.trackingSettings = {
      //verifica se houve clique no email seja em link ou em texto puro
      click_tracking: { enable: true, enable_text: true },
      //verifica se abriu o email
      open_tracking: { enable: true },
    };
  }

  async send() {
    const msg = {
      to: this.recipients,
      from: this.from,
      subject: this.subject,
      html: this.html,
      trackingSettings: this.trackingSettings,
    };

    try {
      //TODO lógica de enviar e-mails
      console.log("aaa");
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail:",
        error.response?.body || error.message
      );
    }
  }
}

export default Mailer;
