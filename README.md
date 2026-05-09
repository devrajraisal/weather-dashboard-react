# WeatherNow ☁️

A real-time weather dashboard with city-based search, current conditions, 5-day forecast, and hourly breakdown. Dynamic UI themes shift based on weather conditions.

## Features
- 🔍 Search any city worldwide
- 🌡️ Current temperature, feels-like, humidity, wind
- 📅 5-day daily forecast
- 🕐 8-hour hourly forecast
- 🎨 Dynamic background themes (clear/cloudy/rain/snow/thunder)
- 📊 Metric cards: wind, humidity, pressure, sunrise/sunset
- 🌙 Day/night icon switching
- 💾 Demo mode (works without API key for common cities)

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript (ES6+)
- OpenWeatherMap REST API (free tier)
- CSS custom properties for dynamic theming
- Google Fonts (Outfit)

## Setup & API Key

1. Get a **free** API key from [openweathermap.org](https://openweathermap.org/api)
2. Open `index.html` and replace `YOUR_API_KEY_HERE`:

```js
const API_KEY = 'your_actual_api_key';
```

3. Open `index.html` in your browser — that's it!

> **Note**: Free tier allows 1,000 API calls/day. The app works in demo mode without a key for popular cities.

## Getting Started
```bash
open index.html
# OR serve with:
npx serve .
```

## Project Structure
```
WeatherNow/
└── index.html   # Complete app (single-file)
```

---
Built by **Devraj Raisal** | [Portfolio](http://devrajraisal.portfolial.com) | [GitHub](https://github.com/devrajraisal)
