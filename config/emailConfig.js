import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Hostinger SMTP server
    port: 465, // Port for secure connection
    secure: true, // Use SSL
    auth: {
        user: 'hello@umersaleem.com', // Hostinger email address
        pass: '@Umer2024', // Hostinger email password
    },
});

export default transporter;
