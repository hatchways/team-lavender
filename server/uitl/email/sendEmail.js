const EmailTemplates = require("./emailTemplates");


const EMAIL_TYPE = {
    WELCOME_EMAIL : "welcome",
    CONFIRM_EMAIL : "confirm"
}

function sendConfirmEmail (emailType, emailInfo) {
    let isValid = true;
    let template
    switch (emailType) {
        case EMAIL_TYPE.WELCOME_EMAIL:
            template = EmailTemplates.templateEmail(EMAIL_TYPE.WELCOME_EMAIL)
            break;
        case EMAIL_TYPE.CONFIRM_EMAIL:
            template = EmailTemplates.templateEmail(EMAIL_TYPE.CONFIRM_EMAIL)
            break;
        default:
            const err = new Error('email type is wrong');
            isValid = false;
            return {isValid, err}
    }
    let emailsToSend = new Array()
    emailInfo.forEach((value) => {
      emailsToSend.push(value.sendTo);
    });
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: emailsToSend,
      from: 'team.lavender.hatchway@gmail.com', // Use the email address or domain you verified by sendgrid
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'TEST EMAIL',
      html: template,
    };
    //ES6
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
  
        if (error.response) {
          console.error(error.response.body)
        }
      });
    //ES8
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
  
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();

    return isValid
}

module.exports = {
  EMAIL_TYPE        : EMAIL_TYPE,
  sendConfirmEmail  : sendConfirmEmail
};