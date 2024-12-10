import React, { useState, useRef } from "react";
import "./WeatherMain.css";
import { FaArrowCircleRight } from "react-icons/fa";

import clear128 from "../../src/icons/clear128.png";
import brokenClouds128 from "../../src/icons/brokenClouds128.png";
import cloudy128 from "../../src/icons/cloudy128.png";
import heavyRain from "../../src/icons/heavyRain128.png";
import rain128 from "../../src/icons/rain128.png";
import snow128 from "../../src/icons/snow128.png";
import storm128 from "../../src/icons/storm128.png";
import mist128 from "../../src/icons/mist128.png";
import TempData from "./TempData";

const WeatherMain = () => {
	const inputRef = useRef();
	const [weatherData, setWeatherData] = useState("");

	const iconsAll = {
		"01d": clear128,
		"01n": clear128,
		"02d": cloudy128,
		"02n": cloudy128,
		"03d": brokenClouds128,
		"03n": brokenClouds128,
		"04d": brokenClouds128,
		"04n": brokenClouds128,
		"09d": rain128,
		"09n": rain128,
		"10d": heavyRain,
		"10n": heavyRain,
		"11d": storm128,
		"11n": storm128,
		"13d": snow128,
		"13n": snow128,
		"50d": mist128,
		"50n": mist128,
	};

	const search = async (cityName) => {
		if (cityName === "") {
			alert("Enter a valid city name");
			return;
		}

		try {
			const apiKey = import.meta.env.VITE_API_KEY;
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
			const response = await fetch(url);
			const data = await response.json();

			if (!response.ok) {
				alert(data.message);
				return;
			}

			console.log(data);

			const icon = iconsAll[data.weather[0].icon] || clear128;

			setWeatherData({
				temp: Math.floor(data.main.temp),
				temp_max: Math.ceil(data.main.temp_max),
				temp_min: Math.ceil(data.main.temp_min),
				windSpeed: data.wind.speed,
				humidity: data.main.humidity,
				feelsLike: data.main.feels_like,
				location: data.name,
				weather_desc: data.weather[0].description,
				weather_icon: icon,
			});
		} catch (error) {
			console.log(`The error is: ${error}`);
			setWeatherData(false);
		}
	};

	return (
		<div className="container">
			<div className="search-bar">
				<input
					ref={inputRef}
					className="input-field"
					type="text"
					placeholder="Enter city name"
					onFocus={(e) => e.target.select()}
				/>
				<button
					className="input-btn"
					onClick={() => search(inputRef.current.value)}>
					<FaArrowCircleRight />
				</button>
			</div>
			{weatherData ? (
				<>
					<div className="initial-details">
						<img
							src={weatherData.weather_icon}
							alt="weather icon"
							className="weather-icon"
						/>
						<p className="weather-description">
							{weatherData.weather_desc}
						</p>
						<p className="temp">{weatherData.temp}°C</p>
						<p className="feelsTemp">
							Feels like {weatherData.feelsLike}°C
						</p>
						<p className="city">{weatherData.location}</p>
					</div>
					<TempData
						infoTitle1="Min Temp"
						infoDetail1={weatherData.temp_min}
						infoTitle2="Max Temp"
						infoDetail2={weatherData.temp_max}
					/>
					<TempData
						infoTitle1="Humidity"
						infoDetail1={weatherData.humidity}
						infoTitle2="Wind Speed"
						infoDetail2={weatherData.windSpeed}
					/>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default WeatherMain;
