# WeatherNow

A weather dashboard built with React and Vite. Search any city, see current conditions, a 5-day forecast, an hourly breakdown, and a page theme that changes with the weather.

The app works in two modes. With an OpenWeatherMap API key it shows live data. Without a key it runs in demo mode with sample data for a few cities, so anyone can clone it and see it working straight away.

## Features

- City search with quick buttons for popular cities
- Current temperature, feels like, humidity, wind, and visibility
- 5-day forecast with daily high and low
- Next 24 hours in 3 hour steps
- Wind, humidity, pressure, sunrise, and sunset cards
- Celsius and Fahrenheit toggle that is remembered between visits
- Background theme for clear, cloudy, rain, snow, and thunderstorm weather
- Loading and error states, including clear messages for unknown cities and bad API keys
- Keyboard friendly form, labelled inputs, and reduced motion support

## Tech stack

- React 19 with function components and custom hooks
- Vite for development and builds
- Vitest for unit tests
- Oxlint for linting
- OpenWeatherMap API (current weather and 5 day forecast endpoints)
- Plain CSS, no UI library

## Getting started

You need Node.js 20 or newer.

```bash
git clone https://github.com/devrajraisal/weather-dashboard-react.git
cd weather-dashboard-react
npm install
npm run dev
```

Open the address that Vite prints. The app starts in demo mode.

### Using live data

1. Create a free account at https://openweathermap.org/api and copy your API key.
2. Copy the example environment file and add the key:
   ```bash
   cp .env.example .env
   ```
   ```
   VITE_OPENWEATHER_API_KEY=your_key_here
   ```
3. Restart the dev server.

New keys can take a short while to become active, so a 401 error right after sign up is normal.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build in `dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run the linter |
| `npm test` | Run the unit tests |

## Project structure

```
src/
  api/          OpenWeatherMap requests and error handling
  components/   Small presentational components
  data/         Demo data in the same shape as the API
  hooks/        useWeather and useLocalStorage
  utils/        Pure helpers for icons, dates, units, and grouping
  App.jsx       Page layout and state
legacy/         The original single file HTML version
```

## Design decisions

- **Demo data uses the API shape.** Demo mode builds data that looks exactly like the API response, so every component renders the same way in both modes and there is no separate demo code path in the UI.
- **Pure helpers with tests.** Date, unit, and forecast grouping logic lives in `src/utils` and is covered by unit tests, because timezone handling is easy to get wrong.
- **Stale responses are ignored.** When a new search starts, the previous request is cancelled with an `AbortController`, so a slow older response cannot replace a newer one.

## A note about the API key

This is a front end only app, so any key placed in a `VITE_` variable is included in the built JavaScript and can be seen by visitors. That is fine for a free key on a personal project. For a production app, send requests through a small backend and keep the key on the server.

## Original version

The first version of this project was a single HTML file. It is kept in the `legacy` folder for reference.

## License

MIT. See the `LICENSE` file.
