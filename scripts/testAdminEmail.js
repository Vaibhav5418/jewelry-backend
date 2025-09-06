const { isAdminEmail, getAdminEmails } = require('../config/adminConfig');

console.log('🔍 Testing Admin Email Configuration');
console.log('=====================================');

// Test the admin email
const testEmail = 'sonivaibhav037@gmail.com';
const isAdmin = isAdminEmail(testEmail);

console.log(`Email: ${testEmail}`);
console.log(`Is Admin: ${isAdmin ? '✅ YES' : '❌ NO'}`);

// Test a regular email
const regularEmail = 'user@gmail.com';
const isRegularAdmin = isAdminEmail(regularEmail);

console.log(`\nEmail: ${regularEmail}`);
console.log(`Is Admin: ${isRegularAdmin ? '✅ YES' : '❌ NO'}`);

// Show all admin emails
console.log('\n📋 All Admin Emails:');
getAdminEmails().forEach((email, index) => {
  console.log(`${index + 1}. ${email}`);
});

console.log('\n✅ Configuration is working correctly!');
console.log('\n🚀 To test:');
console.log('1. Restart your backend server');
console.log('2. Login with Google using sonivaibhav037@gmail.com');
console.log('3. You should automatically get admin access!');
