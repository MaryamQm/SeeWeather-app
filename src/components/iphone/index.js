// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// button displayWeatherButton state
		this.setState({ displayHomeButton: false });
		this.setState({ displayHeader: false });
		this.setState({ displayTextToSpeechButton: false });
		this.setState({ weatherIcon: "../../assets/icons/clear.svg", sunset: null, moonPhase: null });

		this.state.long = "-0.127758";
		this.state.lat = "51.507351";

		this.state.windSpeed = null;
	}

	// a call to fetch weather data via wunderground
	fetchCurrentData = () => {
		// Get the current location from the browser
		// If it works it sends to correctPositionSuccess else it sends to correctPositionError
		navigator.geolocation.getCurrentPosition(this.currentPositionSuccess, this.currentPositionError);
	}

	currentPositionSuccess = (position) => {
		// Set the state to the current location from the information recieved from the browser in position variable
		this.setState({ lat: position.coords.latitude });
		this.setState({ long: position.coords.longitude });
		// Call the API to get the weather data
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.long + "&units=metric&appid=054dda3fed5ac7ac79608dbaca7b2d10";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseCurrentResponse,
			error: function (req, err) { console.log('API call failed ' + err); }
		})
		this.setState({ displayWeatherButton: false });
		this.setState({ headerVisable: true });
		this.setState({ displayHomeButton: true });
		this.setState({ displayTextToSpeechButton: true });
	}

	currentPositionError = () => {
		console.log("Error getting location. Have you allowed location services?")
	}

	textToSpeech = () => {
		// This is the message that will be spoken
		var textToSpeechMessage = "In " + this.state.locate + "it is "
		textToSpeechMessage += this.state.cond + ". With a temperature of "
		textToSpeechMessage += this.state.temp + " degrees celcius."

		// This creates the bot to speak
		const voices = window.speechSynthesis.getVoices();
		const voice = voices.find((voice) => voice.name === 'Microsoft Zira Desktop - English (United States)');
		const msg = new SpeechSynthesisUtterance(textToSpeechMessage)
		msg.voice = voice
		// This speaks the message
		window.speechSynthesis.speak(msg)
	}

	ambientSounds = () => {
		// This gets the current weather icon and splits it into an array
		// This is used to get the same name so that the correct sound can be played
		var currentWeather = this.state.weatherIcon.split('/').pop();
		currentWeather = currentWeather.split('.')[0];
		var audioFilename = "";
		if (currentWeather == "clear" || currentWeather == "cloud" || currentWeather == "atmosphere") {
			audioFilename = "MallardSnglBirdTak_PE542001";
		} else if (currentWeather == "rain") {
			audioFilename = "mixkit-rain-on-umbrella-1263";
		}
		else if (currentWeather == "storm") {
			audioFilename = "mixkit-downpour-loop-1245";
		}
		else if (currentWeather == "snow") {
			audioFilename = "people-walk-in-the-snow-in-the-city-park-16588";
		}
		// This sets the audio file to loop and then plays it
		var audio = new Audio('../../assets/sounds/' + audioFilename + '.mp3');
		audio.loop = true;
		audio.addEventListener('canplaythrough', function () {
			audio.play();
		});

	}

	playAudio = () => {
		this.ambientSounds();
		this.textToSpeech();
	}

	componentDidMount() {
		// Sleep for 500 ms to allow the page to load
		setTimeout(() => {
			this.fetchCurrentData();
			this.displaySunsetTime();
		}, 500);
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// displayWeatherButton all weather data
		return (
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<script src="https://kit.fontawesome.com/71b827e2e9.js" crossorigin="anonymous"></script>
					<title>SeeWeather App</title>
					<link rel="stylesheet" href="style.css" />
				</head>
				<body>
					<div class="wrapper active">

						<section class="weather-part">
							{/* This gets the image for the top */}
							<img src={this.state.weatherIcon} alt="Weather Icon" />
							<div class="temp">
								<span class="numb">{this.state.temp}</span>
								<span class="deg">°</span>C

							</div>
							<div class="weather"></div>
							<div class="location">
								<i class="fas fa-map-marker-alt"></i>
								{/* This puts in the current condition and the current location of the user */}
								<span>{this.state.cond} in {this.state.locate}</span>
							</div>
							{/* Here we have the added details split up into 3 columns */}
							<div class="bottom-details">
								<div class="column feels">
									<i class="fas fa-temperature-high"></i>
									<div class="details">
										<div class="temp">
											<span class="numb-2">{this.state.feels}</span>
											<span class="deg">°</span>C
										</div>
										<p>Feels like</p>
									</div>
								</div>
								<div class="column humidity">
									<i class="fas fa-tint"></i>
									<div class="details">
										<span>{this.state.humidity}</span>
										<p>Humidity</p>
									</div>
								</div>
								<div class="column windspeed">
									<i class="fas fa-tint"></i>
									<div class="details">
										<span>{this.state.windSpeed}</span>
										<p>Wind Speed</p>
									</div>
								</div>
							</div>
							{/* We then created a new row and placed two more columns with the sunset and TTS */}
							<div class="bottom-details">
								<div class="column feels">
									<div class="details">
										<div class="temp">
											<span class="numb-2">{this.state.sunset}</span>
										</div>
										<p>Sunset</p>
									</div>
								</div>
								<div class="column windspeed">
									<div class="details">
										<span>
											{/* This uses the imported Button class to play the audio and also inputs the style to remove background and add the image of a speaker */}
											{/* It has added parameters as required by the button component. There is also no textInputted as we only want the image to show */}
											<Button class="Speech" clickFunction={this.playAudio} styleInputted="background: transparent; border-style: none; background-image: url('../../assets/backgrounds/speaker.png'); height: 50px; width: 50px">
											</Button>
										</span>
									</div>
								</div>
							</div>
						</section>
					</div>
				</body>
			</html>
		);
	}

	displayWindSpeed = () => {
		if (this.state.windSpeed !== null) {
			// alert("Current wind speed: " + this.state.windSpeed + " m/s");
		} else {
			// alert("Fetching wind speed data, please wait...");
			// Make the API call to fetch wind speed data
			const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&units=metric&appid=054dda3fed5ac7ac79608dbaca7b2d10`;
			$.ajax({
				url: url,
				dataType: "jsonp",
				success: (parsed_json) => {
					const windSpeed = parsed_json['wind']['speed'];
					this.setState({ windSpeed });
					alert("Current wind speed: " + windSpeed + " m/s");
				},
				error: function (req, err) { console.log('API call failed ' + err); }
			});
		}
	}

	displaySunsetTime = () => {
		// Make the API call to fetch sunset time data
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&units=metric&appid=054dda3fed5ac7ac79608dbaca7b2d10`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: (parsed_json) => {
				const sunset = parsed_json['sys']['sunset'];
				const sunsetDate = new Date(sunset * 1000);
				const sunsetTimeString = sunsetDate.toLocaleTimeString();
				this.setState({ sunset: sunsetTimeString }, () => {
					//   console.log(this.state.sunset); // optional, for debugging purposes
				});
			},
			error: function (req, err) { console.log('API call failed ' + err); }
		});
	}

	parseCurrentResponse = (parsed_json) => {
		// Get all the data from the API call
		var windSpeed = parsed_json['wind']['speed'];
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var humid_val = parsed_json['main']['humidity'];
		var feels_like = parsed_json['main']['feels_like'];
		var currentWeathersNonCapital = parsed_json['weather']['0']['main'];
		// Capitalize the first letter of the weather condition
		var currentWeathers = currentWeathersNonCapital.charAt(0).toUpperCase() + currentWeathersNonCapital.slice(1);
		// set states for fields so they could be rendered and used later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond: currentWeathers,
			humidity: humid_val,
			feels: feels_like,
			windSpeed: windSpeed,
		});
		// This is for the weather icon it will change depending on the weather condition received from the API
		if (this.state.currentWeathers == "Clear") {
			this.setState({ weatherIcon: "../../assets/icons/clear.svg" });
		} else if (this.state.cond == "Clouds") {
			this.setState({ weatherIcon: "../../assets/icons/cloud.svg" });
		} else if (this.state.cond == "Snow") {
			this.setState({ weatherIcon: "../../assets/icons/snow.svg" });
		} else if (this.state.cond == "Rain") {
			this.setState({ weatherIcon: "../../assets/icons/rain.svg" });
		} else if (this.state.cond == "Storm") {
			this.setState({ weatherIcon: "../../assets/icons/storm.svg" });
		} else if (this.state.cond == "Atmosphere") {
			this.setState({ weatherIcon: "../../assets/icons/haze.svg" });
		}
	}
}
