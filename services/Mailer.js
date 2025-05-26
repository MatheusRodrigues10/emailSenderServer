import sgMail from "@sendgrid/mail";
import keys from "../config/keys.js";

sgMail.setApiKey(keys.sendGridKey);

class Mailer {
  constructor({ subject, recipients }, content) {
    this.from = "reativamais100@gmail.com";
    this.subject = subject;
    this.recipients = this.formatAddresses(recipients);
    this.html = content;
    this.addClickTracking();
  }

  //transforma em array
  formatAddresses(recipients) {
    return recipients.map(({ email }) => email);
  }

  addClickTracking() {
    this.trackingSettings = {
      click_tracking: {
        enable: true,
        enable_text: true,
      },
      open_tracking: {
        enable: true,
      },
    };
  }

  async send() {
    const msg = {
      to: this.recipients,
      from: this.from,
      subject: this.subject,
      html: this.html,
      tracking_settings: this.trackingSettings,
    };

    try {
      await sgMail.send(msg);
      console.log("E-mail enviado com sucesso.");
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail:",
        error.response?.body || error.message
      );
    }
  }
}

export default Mailer;
