# EquiFit - AI PM Internship Matcher

A modern, futuristic Progressive Web App (PWA) built with Next.js, TypeScript, and Tailwind CSS for matching aspiring Product Managers with their ideal internships using AI technology.

## 🚀 Features

- **AI-Powered Matching**: Advanced machine learning algorithms analyze profiles and match users with suitable PM internships
- **Progressive Web App**: Fully functional PWA with offline capabilities and mobile app-like experience
- **Futuristic Design**: Modern, glass-morphism UI with smooth animations and gradient effects
- **Cross-Platform**: Responsive design that works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Full type safety and enhanced developer experience
- **Performance Optimized**: Built with Next.js 15 for optimal performance and SEO
- **Multilingual UI (Google Translate)**: Bottom-right widget with prioritized Indian languages

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth micro-interactions
- **Icons**: Lucide React for consistent iconography
- **PWA**: next-pwa for service worker and manifest generation
- **Font**: Inter for modern typography

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) to Cyan (#06b6d4) gradient
- **Background**: Dark theme with animated gradient
- **Glass Morphism**: Semi-transparent elements with backdrop blur
- **Text**: High contrast white and gray scale

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300-900
- **Responsive**: Fluid typography scaling

### Components
- **Buttons**: Gradient primary buttons with hover effects
- **Cards**: Glass morphism cards with hover animations
- **Navigation**: Fixed header with mobile hamburger menu
- **Sections**: Hero, Features, Testimonials, CTA, Footer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📱 PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Service worker caches resources for offline use
- **App-like Experience**: Standalone display mode
- **Push Notifications**: Ready for future notification implementation
- **Background Sync**: Automatic data synchronization when online

## 🌐 Language Support (Google Translate)

- A Google Translate widget is mounted globally in `src/app/layout.tsx`.
- It appears as a small bottom-right widget with a "Translate" label and loads after hydration.
- Uses inline simple layout to stay compact and unobtrusive.

Default configuration:

- Script: `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`
- Options in `googleTranslateElementInit()`:
  - `pageLanguage: 'en'`
  - `includedLanguages: 'hi,bn,te,mr,ta,ur,gu,kn,or,ml,pa,as,ne,sd,sa'`
  - `layout: google.translate.TranslateElement.InlineLayout.SIMPLE`

Customization:

- Update `includedLanguages` list in `src/app/layout.tsx` to add/remove languages.
- Adjust position/appearance via the wrapper Tailwind classes near the widget (e.g., `bottom-4 right-4 z-[9999]`).
- Tweak dark/light styling by editing the container classes.

Notes:

- CSP: If enforcing a strict Content Security Policy, allow:
  - `script-src`: `https://translate.google.com` `https://translate.googleapis.com`
  - `img-src/style-src/frame-src`: `https://*.gstatic.com` and Google Translate domains
- SEO: This is client-side translation for user convenience; it does not generate localized, crawlable routes. Use Next.js i18n for SEO locales.

## 🎯 Key Sections

### Hero Section
- Compelling headline with gradient text
- Clear value proposition
- Call-to-action buttons
- Key statistics display

### Features Section
- 6 core features with icons
- Hover animations and effects
- Responsive grid layout

### Testimonials
- Rotating testimonial carousel
- Star ratings
- Real user feedback

### Call-to-Action
- Final conversion section
- Multiple action buttons
- Trust indicators

## 🔧 Customization

### Colors
Update the CSS custom properties in `globals.css`:
```css
:root {
  --primary: #3b82f6;
  --accent: #06b6d4;
  /* ... other colors */
}
```

### Content
Modify the content in `page.tsx`:
- Update testimonials array
- Change feature descriptions
- Modify hero text and statistics

### Styling
- Tailwind classes for quick styling
- Custom CSS classes for complex animations
- Framer Motion for advanced animations

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Minimized with Next.js optimizations
- **Images**: Optimized with Next.js Image component

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting platform

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository.

---

Built with ❤️ by the EquiFit Team 11