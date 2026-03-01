const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure the email transport using Environment Variables.
const gmailEmail = process.env.GMAIL_EMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.sendContactConfirmationEmail = functions.firestore
    .document('contacts/{contactId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();

        // Ensure email credentials are set
        if (!gmailEmail || !gmailPassword) {
            console.log('Email configuration missing in environment variables.');
            return null;
        }

        if (!data.email) {
            console.log('No email provided in the contact submission.');
            return null;
        }

        const mailOptions = {
            from: `"DigiRoots Team" <${gmailEmail}>`,
            to: data.email,
            subject: 'We Received Your Request - DigiRoots',
            html: `
        <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #65a30d; margin-bottom: 24px;">Hello ${data.businessName || ''}!</h2>
          <p style="font-size: 16px;">We have successfully received your request for a free consultation. Thank you for your interest in our services.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <p style="margin-top: 0;"><strong>Here is what you selected:</strong></p>
              <p style="margin-bottom: 0;">${data.selectedServices && data.selectedServices.length > 0 ? data.selectedServices.join('<br/>') : 'No specific services selected'}</p>
          </div>

          <p style="font-size: 16px;">Our team is reviewing your details and will give you a call or email shortly to arrange the consultation.</p>
          
          <p style="font-size: 16px; margin-top: 32px;">
            Best regards,<br/>
            <strong>The DigiRoots Team</strong>
          </p>
        </div>
      `,
        };

        try {
            await mailTransport.sendMail(mailOptions);
            console.log('Confirmation email sent to:', data.email);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }

        return null;
    });
