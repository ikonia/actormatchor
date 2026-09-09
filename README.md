# Actormatchor

Find connections between actors and movies using data from [TMDb (The Movie Database)](https://www.themoviedb.org/).

## Features

- **Find Common Films**: Search by two or more actors to see all films and TV shows they've appeared in together
- **Find Common Cast**: Search by two or more movies to see common cast and crew members
- **Clean, modern UI** built with React and Tailwind CSS

## Demo

![Actormatchor Screenshot](https://raw.githubusercontent.com/ikonia/actormatchor/main/screenshot.png)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A free [TMDb API key](https://www.themoviedb.org/api)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ikonia/actormatchor.git
cd actormatchor
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your TMDb API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Usage

### Search by Actors
1. Select "Find Common Films" tab
2. Enter actor names (one at a time, click "Add")
3. Click "Find Connections" when you have at least 2 actors
4. View all films/TV shows common to all selected actors

### Search by Movies
1. Select "Find Common Cast" tab
2. Enter movie titles (one at a time, click "Add")
3. Click "Find Connections" when you have at least 2 movies
4. View common cast members across all selected movies

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.3 with TypeScript |
| Build Tool | Vite |
| State Management | Zustand |
| Styling | Tailwind CSS |
| API | TMDb API v3 |

## Project Structure

```
src/
├── components/      # React components
│   ├── App.tsx
│   ├── SearchForm.tsx
│   ├── ResultsDisplay.tsx
│   └── ResultCards.tsx
├── stores/          # Zustand state management
│   └── searchStore.ts
├── services/        # API services
│   └── tmdb.ts
└── types/           # TypeScript type definitions
    └── index.ts
```

## API Rate Limits

TMDb's free API tier allows 40 requests per 10 seconds. This application implements request batching to stay within rate limits.

## License

ISC

## Acknowledgments

Data provided by [TMDb](https://www.themoviedb.org/). This product uses the TMDb API but is not endorsed or certified by TMDb.
