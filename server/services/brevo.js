const brevo = require("@getbrevo/brevo"); // https://developers.brevo.com/
require("dotenv/config");


let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

let sendSmtpEmail = new brevo.SendSmtpEmail();

const sendEmail = async (emailTarget, nameTarget) => {
  sendSmtpEmail.subject = "My First Email";
  sendSmtpEmail.htmlContent =
    "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = {
    name: "John Cena",
    email: "youraccountemail@gmail.com",
  };
  sendSmtpEmail.to = [
    { email: "tenorio2003@gmail.com ", name: "juisjuas"},
  ];
  sendSmtpEmail.replyTo = {
    email: "emailtoreplyto@gmail.com",
    name: "Support",
  };
  sendSmtpEmail.params = { parameter: "My param value" };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error(error);
  }
};

const sendEmailWithTemplate = async () => {
    sendSmtpEmail.templateId = 1;
    sendSmtpEmail.sender = {
      name: "John Cena",
      email: "youraccountemail@gmail.com",
    };
    sendSmtpEmail.to = [
      { email: "destinationemail@gmail.com", name: "User Name" },
    ];
    sendSmtpEmail.replyTo = {
      email: "emailtoreplyto@gmail.com",
      name: "Support",
    };
    sendSmtpEmail.params = { parameter: "My param value" };
  
    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(JSON.stringify(response));
    } catch (error) {
      console.error(error);
    }
  };

module.exports = { sendEmail, sendEmailWithTemplate };
