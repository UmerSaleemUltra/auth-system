const accountLoginSuccessEmail = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login Verification</title>
      <style>
        /* Global Styles */
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f7fa;
          margin: 0;
          padding: 0;
          color: #333;
          line-height: 1.6;
        }
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 30px;
          color: #333;
          margin: 0;
          padding: 0;
          font-weight: 600;
        }
        .message {
          font-size: 16px;
          color: #555;
          margin-bottom: 25px;
        }
        .message p {
          margin-bottom: 10px;
        }
        /* OTP Styles */
        .otp {
          font-size: 24px;
          font-weight: bold;
          color: #ea2024;
          text-align: center;
          margin: 20px 0;
        }
        /* Footer Styles */
        .footer {
          text-align: center;
          font-size: 14px;
          color: #777;
          margin-top: 30px;
        }
        .footer a {
          color: #ea2024;
          text-decoration: none;
          font-weight: bold;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        /* Responsive Styles */
        @media (max-width: 600px) {
          .email-container {
            padding: 25px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header Section -->
        <div class="header">
          <h1>Login Verification Required</h1>
        </div>

        <!-- Main Message -->
        <div class="message">
          <p>Hello ${name},</p>
          <p>To complete your login, please use the One-Time Password (OTP) below:</p>
        </div>

        <!-- OTP Display -->
        <div class="otp">${otp}</div>

        <!-- Additional Message -->
        <div class="message">
          <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
          <p>If you didn’t attempt to log in, please <a href="mailto:support@yourapp.com">contact support</a>.</p>
        </div>

        <!-- Footer Section -->
        <div class="footer">
          <p>Thank you for using QuickDocs!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default accountLoginSuccessEmail;
