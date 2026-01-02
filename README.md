# Persian Wedding Invitation

An elegant, mobile-first digital wedding invitation in Persian with animations and background music.

## 🏗️ Project Structure

```
wedding-card/
├── src/
│   ├── components/           # React components
│   │   ├── ErrorBoundary/   # Error handling wrapper
│   │   ├── InvitationCard/   # Main wedding invitation card
│   │   ├── LoadingScreen/   # Initial loading screen with progress
│   │   └── Ornament/        # Decorative SVG ornaments
│   ├── config/              # Configuration files
│   │   └── weddingConfig.ts # Wedding details and audio settings
│   ├── hooks/               # Custom React hooks
│   │   ├── useAudioLoader.ts # Audio loading with progress tracking
│   │   └── useAudioPlayer.ts # Audio playback controls
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   │   └── animationVariants.ts # Framer Motion animations
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
└── index.html              # HTML template
```

## 🚀 Getting Started

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## ⚙️ Configuration

All wedding details are configurable in `src/config/weddingConfig.ts`:

```typescript
export const weddingConfig: WeddingConfig = {
  couple: {
    groom: "امین",
    bride: "مهتا"
  },
  event: {
    date: "جمعه، ۲۴ شهریور ۱۴۰۳",
    time: "از ساعت ۱۹ الی ۲۳",
    location: "تهران",
    dateLabel: "📅 تاریخ:",
    timeLabel: "⏰ ساعت:",
    locationLabel: "📍 مکان:"
  },
  message: {
    greeting: "به نام خدا",
    body: ["خط اول", "خط دوم", ...],
    invitationText: "برای مشاهده کارت ضربه بزنید"
  },
  audio: {
    url: "URL_TO_MUSIC_FILE",
    volume: 0.5
  }
};
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Features

- **Responsive Design**: Optimized for mobile devices
- **Smooth Animations**: Framer Motion powered transitions
- **Audio Integration**: Background music with progress tracking
- **Error Handling**: Graceful error recovery with ErrorBoundary
- **Configurable**: Easy to update wedding details
- **RTL Support**: Built-in right-to-left layout for Persian

## 📦 Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
