exports.adminNotificationMailTemplate = (
  clientName,
  email,
  subject,
  message
) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f3f4f6; padding: 40px 0;">
    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #2563EB, #1D4ED8); color: #fff; padding: 20px 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;"> New Message Received</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333;">
        <p style="font-size: 16px;">You have received a new message from your website contact form.</p>

        <div style="margin-top: 20px; background: #f9fafb; border-radius: 6px; border: 1px solid #eee; padding: 16px;">
          <p style="margin: 0; font-size: 15px;"><strong>Name:</strong> ${clientName}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin: 8px 0; font-size: 15px;"><strong>Message:</strong></p>
          <p style="margin-top: 4px; font-size: 14px; color: #555;">${message}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; text-align: center; padding: 14px; border-top: 1px solid #eee;">
        <p style="margin: 0; font-size: 13px; color: #888;">
          Notification generated on ${new Date().toLocaleString()}.
        </p>
      </div>
    </div>
  </div>
`;
