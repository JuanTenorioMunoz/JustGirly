const brevo = require('@getbrevo/brevo'); // https://developers.brevo.com/
require('dotenv/config');

let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

let sendSmtpEmail = new brevo.SendSmtpEmail();

const sendEmail = async () => {
	sendSmtpEmail.subject = 'My First Email';
	sendSmtpEmail.htmlContent =
		'<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>';
	sendSmtpEmail.sender = {
		name: 'Just girly',
		email: 'sofiaromeronar@gmail.com',
	};
	sendSmtpEmail.to = [{ email: 'valegaru2003@gmail.com', name: 'Cliente' }];
	sendSmtpEmail.replyTo = {
		email: 'sofiaromeronar@gmail.com',
		name: 'Support',
	};
	sendSmtpEmail.params = {
		parameter:
			'https://zwpeceuhrpmdsreadcfz.supabase.co/storage/v1/object/public/VisionBoards/images/user_0390f0ab-ab1d-4ce3-945e-41a6b5feb853.png',
	};

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
		name: 'Just Girly',
		email: 'justgirlys.shop@gmail.com',
	};
	sendSmtpEmail.to = [{ email: 'valegaru2003@gmail.com', name: 'cliente' }];
	sendSmtpEmail.replyTo = {
		email: 'sofiaromeronar@gmail.com',
		name: 'Support',
	};
	sendSmtpEmail.params = {
		FIRSTNAME: 'Valeria',
		imageURL:
			'https://zwpeceuhrpmdsreadcfz.supabase.co/storage/v1/object/public/VisionBoards/images/user_0390f0ab-ab1d-4ce3-945e-41a6b5feb853.png',
	};

	try {
		const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
		console.log(JSON.stringify(response));
	} catch (error) {
		console.error(error);
	}
};

module.exports = { sendEmail, sendEmailWithTemplate };
