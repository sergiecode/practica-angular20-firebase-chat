# 🔐 Environment Setup Instructions

This project requires API keys that are **NOT** included in the repository for security reasons.

## 🚀 Quick Setup

### 1. Copy Template Files
```bash
# Copy the template files to create your environment files
cp src/environments/environment.template.ts src/environments/environment.ts
cp src/environments/environment.template.ts src/environments/environment.prod.ts
```

### 2. Get Your API Keys

#### Firebase Configuration:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (or create a new one)
3. Go to Project Settings ⚙️ → General → Your apps
4. Copy the configuration object

#### OpenAI API Key:
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-...`)

### 3. Update Environment Files

Open `src/environments/environment.ts` and replace:

```typescript
export const environment = {
  production: false,
  
  firebaseConfig: {
    apiKey: "YOUR_ACTUAL_FIREBASE_API_KEY",
    authDomain: "your-actual-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-actual-project.appspot.com", 
    messagingSenderId: "your-actual-sender-id",
    appId: "your-actual-app-id",
    measurementId: "your-actual-measurement-id"
  },
  
  openai: {
    apiKey: "your-actual-openai-api-key",
    apiUrl: "https://api.openai.com/v1/chat/completions"
  }
};
```

### 4. Enable Firebase Services

1. **Authentication**: Enable Google sign-in provider
2. **Firestore**: Create database with these rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## ⚠️ Security Notes

- **NEVER** commit files with real API keys
- The `.gitignore` file prevents this automatically
- Environment files are excluded from Git
- Always use template files for sharing

## 🔍 Verification

After setup, you should be able to:
- ✅ Login with Google
- ✅ Send messages to the AI
- ✅ See chat history persist
- ✅ Real-time message updates

## 🆘 Troubleshooting

If you see "API Key not configured" errors:
1. Check that your environment.ts file has real values (not placeholders)
2. Restart the Angular dev server: `npm start`
3. Check browser console for specific error messages
