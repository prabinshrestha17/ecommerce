exports.emailVerificationTemplate = (clientName, verificationLink) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f3f4f6; padding: 40px 0;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #2563EB, #1D4ED8); color: #fff; padding: 20px 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">Verify Your Email</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <p style="font-size: 16px;">Hi ${clientName},</p>
        <p style="font-size: 15px; line-height: 1.6;">Thank you for registering with us! Please verify your email address to complete your signup.</p>

        <div style="margin: 30px 0; text-align: center;">
          <a href="${verificationLink}" style="background: #2563EB; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
            Verify Email
          </a>
        </div>

        <p style="font-size: 14px; color: #666;">Or copy and paste this link in your browser:</p>
        <p style="font-size: 13px; color: #2563EB; word-break: break-all;">${verificationLink}</p>

        <p style="font-size: 13px; color: #888; margin-top: 20px;">This link expires in 24 hours.</p>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; text-align: center; padding: 14px; border-top: 1px solid #eee;">
        <p style="margin: 0; font-size: 13px; color: #888;">
          © ${new Date().getFullYear()} Ecommerce. All rights reserved.
        </p>
      </div>
    </div>
  </div>
`;

exports.welcomeEmailTemplate = clientName => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f3f4f6; padding: 40px 0;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #4F8EF7, #2563EB); color: #fff; padding: 20px 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">Welcome!</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: center; color: #333;">
        <h2 style="color: #2563EB;">Hi ${clientName},</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Your email has been verified successfully! You can now login and start shopping with us.
        </p>
        <p style="font-size: 14px; color: #777;">Welcome to our community!</p>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; text-align: center; padding: 16px; border-top: 1px solid #eee;">
        <p style="margin: 0; font-size: 13px; color: #888;">
          © ${new Date().getFullYear()} Ecommerce. All rights reserved.
        </p>
      </div>
    </div>
  </div>
`;
