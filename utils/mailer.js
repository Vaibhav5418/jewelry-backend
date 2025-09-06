const nodemailer = require('nodemailer');

// Creates and returns a singleton transporter using environment variables
let cachedTransporter = null;

async function createTransporter() {
  if (cachedTransporter) return cachedTransporter;

  // Ethereal fallback removed per requirement; use only explicit SMTP

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const missing = [];
  if (!host) missing.push('SMTP_HOST');
  if (!user) missing.push('SMTP_USER');
  if (!pass) missing.push('SMTP_PASS');
  if (host && host.includes('yourprovider.com')) missing.push('Valid SMTP_HOST');
  if (missing.length) {
    throw new Error(`SMTP configuration missing: ${missing.join(', ')}`);
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });

  return cachedTransporter;
}

async function sendMail({ to, subject, html, text }) {
  const transporter = await createTransporter();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  return transporter.sendMail({ from, to, subject, html, text });
}

module.exports = { sendMail };


