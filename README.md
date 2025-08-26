# Fun with Flags Mobile Game

A fun and educational mobile-first web game that tests your knowledge of world country flags. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Flag Guessing Game**: Test your knowledge with a streak-based scoring system
- 🌍 **Regional Filtering**: Play with specific regions or all countries
- 📚 **Flag Library**: Browse through all available country flags
- ♿ **Accessibility**: Full screen reader support and keyboard navigation
- 📱 **Mobile Optimized**: Responsive design that works on all devices
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 🔧 **Customizable**: Adjust game settings and preferences

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Radix UI Components
- **Build Tool**: Vite
- **State Management**: React Hooks
- **API**: REST Countries API
- **Optional**: Supabase for Geoguessr favorites integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Fun with Flags Mobile Game"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `build` directory.

### Type Checking

```bash
npm run type-check
```

## Environment Variables

Create a `.env` file in the root directory for Supabase integration (optional):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/           # React components
│   ├── accessibility/   # Accessibility components
│   ├── flag-library/    # Flag library components
│   ├── figma/          # Design system components
│   └── ui/             # UI components (Radix UI)
├── utils/               # Utility functions and hooks
│   ├── hooks/          # Custom React hooks
│   └── supabase/       # Supabase configuration
├── styles/              # Global styles
└── main.tsx            # Application entry point
```

## Game Rules

1. **Objective**: Identify as many country flags as possible in a row
2. **Scoring**: Your streak increases with each correct answer
3. **Game Over**: One wrong answer ends the game
4. **Regions**: Choose to play with specific regions or all countries
5. **Accessibility**: Full keyboard navigation and screen reader support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Flag data provided by [REST Countries API](https://restcountries.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide React](https://lucide.dev/)
  