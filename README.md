# 🍽️ Re-Eat

An AI-powered food suggester that helps you balance your diet by analyzing recent meals and recommending what to eat next.

![Demo Mode](https://img.shields.io/badge/Demo-Active-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Firebase](https://img.shields.io/badge/Firebase-Ready-orange)

## ✨ Features

- 🔐 **Authentication** - Firebase Email/Password auth with demo mode
- 📝 **Meal Logging** - Simple form with validation and category selection
- 📊 **Meal History** - View your recent meals with timestamps
- 🤖 **AI Suggestions** - Get personalized diet recommendations
- 📱 **Responsive Design** - Mobile-first with beautiful gradients
- ⚡ **Demo Mode** - Test without any configuration

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/leksautomate/Re-Eat.git
cd Re-Eat
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
npm run dev
```

### 4. Sign in with demo mode
- Go to http://localhost:5173/login
- Enter any email (e.g., `demo@re-eat.com`)
- Enter any password (6+ characters, e.g., `password123`)
- Click **Sign In**

That's it! The app works in demo mode with local storage.

## 🔧 Configuration (Optional)

### Firebase Setup
To use real Firebase storage, update `src/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### OpenRouter API
To use real AI suggestions, update `src/lib/openai.js`:
```javascript
const OPENROUTER_API_KEY = 'YOUR_OPENROUTER_API_KEY';
```

## 🏗️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS v3
- **State Management**: React Query + Context API
- **Forms**: React Hook Form
- **Backend**: Firebase (Auth + Firestore)
- **AI**: OpenRouter API (OpenAI SDK)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── logic/          # Business logic hooks (no prop drilling)
├── pages/          # Page components
├── lib/            # Third-party configurations
├── firebase.js     # Firebase setup
└── App.jsx         # Main app component
```

## 🎨 Features Breakdown

### Meal Logging
- Text input with validation
- 6 food categories (Carbs, Protein, Veggies, Fruits, Dairy, Fats)
- Instant feedback with animations

### AI Suggestions
- Analyzes your last 5 meals
- Identifies missing food groups
- Generates 3 personalized meal ideas

### Demo Mode
- No configuration required
- Local storage for meals
- Full functionality available

## 📝 License

MIT

## 👨‍💻 Author

Built with ❤️ by [leksautomate](https://github.com/leksautomate)
