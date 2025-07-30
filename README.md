# 🌦️ Weather App

A modern, interactive React weather dashboard that shows current weather, forecast, and UV index for any city or your current location.

---

## 🚀 Features

- **Current Weather:** See temperature, humidity, wind speed, pressure, and UV index.
- **Forecast:** 5-day forecast with detailed info.
- **Location Support:** Search by city or use your device's current location.
- **Responsive UI:** Looks great on desktop and mobile.
- **Live Clock:** Displays current time.
- **Error Handling:** User-friendly error messages for invalid locations or denied geolocation.

---



---

## 🛠️ Getting Started

### 1. **Clone the repository**
```sh
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. **Install dependencies**
```sh
npm install
```

### 3. **Get an OpenWeatherMap API Key**

- Sign up at [OpenWeatherMap](https://openweathermap.org/api)
- Go to your account and copy your API key

### 4. **Configure Environment Variables**

Create a `.env` file in the root directory:

```
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
```

### 5. **Run the app**
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧑‍💻 Usage

- **Search by city:** Enter a city name and press enter.
- **Use current location:** Allow location access when prompted.
- **See details:** View temperature, feels like, sunrise/sunset, humidity, wind, pressure, and UV index.
- **Forecast:** Scroll down for the 5-day forecast.

---

## 🏗️ Project Structure

```
src/
  components/
    CityAndTime.jsx
    Forecast.jsx
    Clock.jsx
  App.jsx
  main.jsx
```

---

## 🧩 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## ❓ FAQ

**Q:** The temperature is wrong!  
**A:** Make sure your API URL uses `units=metric`.

**Q:** Geolocation doesn't work?  
**A:** Make sure you allow location access in your browser.

**Q:** How do I change the theme?  
**A:** Edit the Tailwind or CSS classes in the components.

---

## 📝 Interactive Checklist

- [ ] Clone the repo
- [ ] Install dependencies
- [ ] Get your OpenWeatherMap API key
- [ ] Create `.env` file with your API key
- [ ] Run the app locally
- [ ] Try searching for a city
- [ ] Try using your current location
- [ ] Check the forecast and weather details

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT

---

## 📬 Feedback

Found a bug or want a feature?  
Open an [issue](https://github.com/your-username/weather-app/issues) or