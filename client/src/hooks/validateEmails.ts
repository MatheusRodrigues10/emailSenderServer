const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//validar múltiplos e-mails separados por vírgula
const validateEmails = (emails: string) => {
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => emailRegex.test(email) === false); //pega o e-mail e valida pela expressão

  //retorna os e-mails inválidos
  if (invalidEmails.length) {
    return `E-mails inválidos: ${invalidEmails.join(", ")}`;
  }

  return;
};

export default validateEmails;
