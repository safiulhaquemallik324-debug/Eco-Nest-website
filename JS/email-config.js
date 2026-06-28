/**
 * ECO NEST — EmailJS Setup (Gmail)
 * --------------------------------
 * Follow these steps ONCE to enable real email sending:
 *
 * 1. Create a free account at https://www.emailjs.com/
 * 2. Email Services → Add New Service → Gmail → Connect your Gmail account
 * 3. Email Templates → Create New Template:
 *
 *    To Email:    {{to_email}}
 *    From Name:   Eco Nest
 *    Reply To:    {{from_email}}
 *    Subject:     {{subject}}
 *
 *    Content (Body):
 *    ─────────────────────────────
 *    New message from Eco Nest website
 *
 *    From:    {{from_name}}
 *    Email:   {{from_email}}
 *    Subject: {{subject}}
 *
 *    Message:
 *    {{message}}
 *    ─────────────────────────────
 *
 * 4. Account → General → copy your Public Key
 * 5. Paste the 3 values below and save this file
 */
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE',
  DEFAULT_TO_EMAIL: 'hello@econest.in',
};

function isEmailJsConfigured() {
  const placeholders = ['YOUR_PUBLIC_KEY_HERE', 'YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE'];
  return !placeholders.includes(EMAILJS_CONFIG.PUBLIC_KEY)
    && !placeholders.includes(EMAILJS_CONFIG.SERVICE_ID)
    && !placeholders.includes(EMAILJS_CONFIG.TEMPLATE_ID);
}
