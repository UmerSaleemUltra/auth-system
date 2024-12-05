const accountActivationEmail = (name, activationLink) => `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h2>Welcome, ${name}!</h2>
    <p>Your account has been successfully created and activated.</p>
    <a href="${activationLink}" style="
        display: inline-block;
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
    ">Go to Your Account</a>
    <p>If you didn’t sign up for this account, please ignore this email.</p>
  </div>
`;

export default accountActivationEmail;
