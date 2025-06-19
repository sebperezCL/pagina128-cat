# Newsletter Integration Setup Guide

## 1. Google Sheets Integration (Required)

The newsletter form automatically sends subscriber data to your external API that writes to Google Sheets using the following payload:

```json
{
  "name": "subscriber name",
  "email": "subscriber@email.com"
}
```

Make sure your `.env.local` file contains:

- `INTEGRATION_URL`: Your external API endpoint URL
- `BEARER_TOKEN`: Authentication token for the API

## 2. Install SendGrid Package (Optional)

```bash
npm install @sendgrid/mail
```

## 3. Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Google Sheets Integration (Required)
INTEGRATION_URL=your_google_sheets_api_url_here
BEARER_TOKEN=your_bearer_token_here

# SendGrid Configuration (Optional)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_verified_sender_email@yourdomain.com
```

## 4. SendGrid Account Setup (Optional)

1. Create a SendGrid account at https://sendgrid.com
2. Verify your sender email address in SendGrid
3. Create an API key in SendGrid dashboard
4. Copy the API key to your `.env.local` file

## 5. Enable SendGrid in API Route (Optional)

In `app/api/newsletter/route.ts`, uncomment the SendGrid code:

1. Uncomment the import: `import sgMail from '@sendgrid/mail';`
2. Uncomment the API key setup: `sgMail.setApiKey(process.env.SENDGRID_API_KEY!);`
3. Uncomment the email sending code in the POST function

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Try submitting the newsletter form
3. Check your email and SendGrid dashboard for confirmation

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive data
- Consider rate limiting for production use
