require('dotenv').config();
const nodemailer = require('nodemailer');

const html = `
<h1>Hello World</h1>
<p>Nodemailer uses</p>

`;

export async function mailSender(email,token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        debug: true, 
        logger: true 
    });

    try {
        const info = await transporter.sendMail({
            to: email,
            subject: 'Forget password link ',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${3000}/${token}">click here</a></h1>`
                  });

        console.log("Message sent: " + info.messageId);
    } catch (error) {
        console.log("Error sending email: ", error);
    }
}
