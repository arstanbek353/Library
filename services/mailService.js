const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'arstanbek353@gmail.com',
            to,
            subject: `Активация ${process.env.API_URL}`,
            text: '',
            html: `
                <div>
                <h1>для активации перейдите по ссылке</h1>
                <a href="${link}" target="_blank">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()