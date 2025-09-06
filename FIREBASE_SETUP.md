# Firebase Admin SDK Setup

To enable Google login with database storage, you need to configure Firebase Admin SDK on the backend.

## 1. Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file

## 2. Set Environment Variables

Add these environment variables to your `.env` file:

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_firebase_private_key_here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_CLIENT_ID=your_firebase_client_id
```

## 3. Extract Values from Service Account JSON

From the downloaded JSON file, extract:
- `project_id` → `FIREBASE_PROJECT_ID`
- `private_key_id` → `FIREBASE_PRIVATE_KEY_ID`
- `private_key` → `FIREBASE_PRIVATE_KEY` (keep the quotes and newlines)
- `client_email` → `FIREBASE_CLIENT_EMAIL`
- `client_id` → `FIREBASE_CLIENT_ID`

## 4. Restart Backend Server

After setting up the environment variables, restart your backend server:

```bash
npm run dev
```

## 5. Test Google Login

1. Go to the frontend
2. Click "Login with Google"
3. Complete Google authentication
4. Check your MongoDB database - you should see the user stored in the `users` collection

## Troubleshooting

- Make sure all Firebase environment variables are set correctly
- Check that the private key includes the full key with newlines
- Verify that your Firebase project has Authentication enabled
- Check backend logs for any Firebase Admin SDK errors
