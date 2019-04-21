import nodemailer from 'nodemailer';

const getTransport = () => {
    return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "b64c3985334bc1",
            pass: "0e7556d0d8ea9f"
        }
    })
}

const getOptions = (params) => {
    return {
        from: 'admin@ekki.com',
        to: params.to,
        cc: params.cc,
        bcc: params.bcc,
        subject: params.subject,
        text: params.body
    }
}

export const send = (params, callback) => {
    let transporter = getTransport()
    let option = getOptions(params)
    
    transporter.sendMail(option, (error, info) => { 
        if(callback) callback(error, info);
    });

}