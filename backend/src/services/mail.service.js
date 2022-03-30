const nodemailer = require("nodemailer");
const Mail = "randrianarivelofinoana1@gmail.com"
const Mdp = "Admin2022*"

const sendEmail = async (email, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.googlemail.com",
        mailer: "smtp",
        secure: true,
        encryption: "ssl",
        auth: {
            user: Mail,
            pass: "ndhrqrflhjhypnih",
        },
    });

    const message = {
        from: Mail,
        to: email,
        subject: subject,
        html: htmlContent,
    };

    await transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log("-----------------------------------");
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = { sendEmail: sendEmail }
