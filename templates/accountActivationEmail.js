const accountActivationEmail = (name, activationLink) => `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px; max-width: 600px; margin: auto; background-color: #f4f4f4; border-radius: 10px;">
    <img src="https://umersaleemultra.github.io/Portfolio-Websites/Assets/UMER%20SALEEM.svg" alt="Company Logo" style="width: 150px; margin-bottom: 20px;" />
    <h2 style="color: #333;">Welcome, ${name}!</h2>
    <p style="color: #555;">Your account has been successfully created and activated. We’re excited to have you on board!</p>
    <a href="${activationLink}" style="
        display: inline-block;
        background-color: #4CAF50;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 30px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    ">Go to Your Account</a>
    <p style="color: #777; margin-top: 20px;">If you didn’t sign up for this account, please ignore this email.</p>
    <footer style="color: #888; font-size: 14px; margin-top: 30px;">
      <p>© ${new Date().getFullYear()} Your Company. All Rights Reserved.</p>
    </footer>
  </div>
`;

export default accountActivationEmail;
