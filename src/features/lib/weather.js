// Today's weather from Open-Meteo (free, no key). Coordinates are rounded to 2 decimals (about 1 km)
// before they are sent, so the exact spot is never shared.
const CODES = [
  [[0], "Clear sky", "☀️"],
  [[1, 2], "Mostly clear", "🌤️"],
  [[3], "Cloudy", "☁️"],
  [[45, 48], "Fog", "🌫️"],
  [[51, 53, 55, 56, 57], "Drizzle", "🌦️"],
  [[61, 63, 65, 66, 67], "Rain", "🌧️"],
  [[71, 73, 75, 77], "Snow", "❄️"],
  [[80, 81, 82], "Rain showers", "🌦️"],
  [[95, 96, 99], "Thunderstorm", "⛈️"],
];

export function describeWeather(code) {
  const hit = CODES.find(([codes]) => codes.includes(code));
  return hit ? { text: hit[1], icon: hit[2] } : { text: "Weather", icon: "🌡️" };
}

export async function fetchWeather([lat, lng], signal) {
  const q = new URLSearchParams({
    latitude: lat.toFixed(2),
    longitude: lng.toFixed(2),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "3",
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${q}`, { signal });
  if (!res.ok) throw new Error(`Weather service error (${res.status})`);
  const j = await res.json();
  return {
    now: {
      temp: Math.round(j.current.temperature_2m),
      feels: Math.round(j.current.apparent_temperature),
      humidity: j.current.relative_humidity_2m,
      wind: Math.round(j.current.wind_speed_10m),
      ...describeWeather(j.current.weather_code),
    },
    days: j.daily.time.map((date, i) => ({
      date,
      max: Math.round(j.daily.temperature_2m_max[i]),
      min: Math.round(j.daily.temperature_2m_min[i]),
      rain: j.daily.precipitation_probability_max[i],
      ...describeWeather(j.daily.weather_code[i]),
    })),
  };
}
