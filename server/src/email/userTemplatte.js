exports.userThankYouMailTemplate = (clientName, subject, message) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f3f4f6; padding: 40px 0;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #4F8EF7, #2563EB); color: #fff; padding: 20px 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">${subject}</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: center; color: #333;">
        <h2 style="color: #2563EB;">Hi ${clientName},</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Thank you for getting in touch with us! We’ve received your message and our team will get back to you soon.
        </p>

        <div style="margin: 25px 0; background: #f9fafb; border-left: 4px solid #2563EB; padding: 16px; text-align: left;">
          <p style="margin: 0; font-size: 15px; color: #333;"><strong>Your Message:</strong></p>
          <p style="margin-top: 8px; font-size: 14px; color: #555;">${message}</p>
        </div>

        <p style="font-size: 14px; color: #777;">
          We appreciate your time and will reach out soon.  
          Have a great day! 
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; text-align: center; padding: 16px; border-top: 1px solid #eee;">
        <p style="margin: 0; font-size: 13px; color: #888;">
          © ${new Date().getFullYear()} Prabin Shretsha. All rights reserved.
        </p>
      </div>
    </div>
  </div>
`;
