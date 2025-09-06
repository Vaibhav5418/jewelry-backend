// Admin configuration
const ADMIN_EMAILS = [
  'sonivaibhav037@gmail.com',
  // Add more admin emails here if needed
  // 'admin2@example.com',
  // 'admin3@example.com'
];

// Check if email is admin
const isAdminEmail = (email) => {
  return ADMIN_EMAILS.includes(email);
};

// Get admin emails
const getAdminEmails = () => {
  return ADMIN_EMAILS;
};

module.exports = {
  isAdminEmail,
  getAdminEmails,
  ADMIN_EMAILS
};
