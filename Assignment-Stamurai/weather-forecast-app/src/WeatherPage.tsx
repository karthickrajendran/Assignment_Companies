import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: {
    high: number;
    low: number;
    description: string;
    precipitation: number;
    date: string;
  }[];
}

const StyledContainer = styled.div<{ backgroundImage: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
`;

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      // Replace with your city and API key
      const cityName = 'London';
      const apiKey = 'YOUR_API_KEY';

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );

      const currentWeatherData = currentWeatherResponse.data;
      const forecastData = forecastResponse.data.list;

      const data: WeatherData = {
        temperature: currentWeatherData.main.temp,
        description: currentWeatherData.weather[0].description,
        humidity: currentWeatherData.main.humidity,
        windSpeed: currentWeatherData.wind.speed,
        pressure: currentWeatherData.main.pressure,
        forecast: forecastData.map((item: { main: { temp_max: any; temp_min: any; }; weather: { description: any; }[]; pop: number; dt_txt: any; }) => ({
          high: item.main.temp_max,
          low: item.main.temp_min,
          description: item.weather[0].description,
          precipitation: item.pop * 100,
          date: item.dt_txt,
        })),
      };

      setWeatherData(data);
      setBackgroundImage(getBackgroundImage(data.description));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getBackgroundImage = (description: string) => {
    const lowercaseDescription = description.toLowerCase();
    if (lowercaseDescription.includes('rain')) {
      return 'https://example.com/rainy-background.jpg';
    } else if (lowercaseDescription.includes('clear')) {
      return 'https://example.com/sunny-background.jpg';
    } else if (lowercaseDescription.includes('cloud')) {
      return 'https://example.com/cloudy-background.jpg';
    } else {
      return 'https://example.com/default-background.jpg';
    }
  };

  return (
    <StyledContainer backgroundImage={backgroundImage}>
      {weatherData ? (
        <div>
          <h2>Weather for {/* City Name */}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          <p>Pressure: {weatherData.pressure} hPa</p>
          <h3>Forecast</h3>
          {weatherData.forecast.map((forecast, index) => (
            <div key={index}>
              <p>Date: {forecast.date}</p>
              <p>High: {forecast.high}°C</p>
              <p>Low: {forecast.low}°C</p>
              <p>Description: {forecast.description}</p>
              <p>Precipitation: {forecast.precipitation}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </StyledContainer>
  );
};

export default WeatherPage;