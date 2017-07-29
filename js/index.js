$(document).ready(function() {

	// Geolocation Variables
	var lat;
	var lon;

	// Weather Data Variables
	var city;
	var f;
	var c;
	var weather;
	var fahrenheit;
	var celsius;
	var sunrise;
	var sunset;
	var weatherIcon;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			// variables to store coordinates in
			lat = position.coords.latitude;
			lon = position.coords.longitude;

			// API Call Using Geolocation
			var api =
				"https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
				lat +
				"&lon=" +
				lon +
				"&APPID=0113bf72a83d2ad796778df7f8a4524b";

			$.getJSON(api, function(data) {
				// City
				city = data.name;
				// Kelvin
				var kelvin = data.main.temp;
				// Kelvin to Fahrenheit
				f = (kelvin - 273.15) * 9 / 5 + 32;
				fahrenheit = Math.round(f);
				// Fahrenheit to Celsius
				c = (fahrenheit - 32) * 5 / 9;
				celsius = Math.round(c);
				// Weather Type
				weatherIcon = data.weather[0].id;
				// Weather Description
				weather = data.weather[0].description;
				// Sunrise & Sunset
				sunrise = data.sys.sunrise;
				sunset = data.sys.sunset;

				// Weather into DOM
				$(".city").html(city);
				$(".description").html(weather);
				$(".temp").html(celsius);

				// Get Time Stamp
				var n = new Date();
				var t = Math.floor(n.getTime() / 1000);

				function dayIcons() {

					if (weatherIcon == 800 && celsius >= 25) {
						// clear, above 25deg
						$(".weatherapp").css("background", "#FE938C");
						$(".icon").html(
							'<img src="img/sunny.png" alt="clear-day">'
						);
						$(".slider").addClass("yellow");
						$(".deg").css("color", "#FE938C");
					} else if (weatherIcon == 800 && celsius <= 25) {
						// clear, below 25deg
						$(".weatherapp").css("background", "#8CADFE");
						$(".icon").html(
							'<img src="img/sunny.png" alt="clear-day">'
						);
						$(".deg").css("color", "#8CAEFE");
						$(".slider").addClass("yellow");
					} else if (weatherIcon === 801) {
						// few clouds
						$(".weatherapp").css("background", "#8CADFE");
						$(".icon").html(
							'<img src="img/fewclouds.png" alt="few-clouds">'
						);
						$(".deg").css("color", "#8CADFE");
						$(".slider").addClass("yellow");
					} else if (weatherIcon >= 802 && weatherIcon <= 804) {
						// clouded
						$(".weatherapp").css("background", "#878787");
						$(".icon").html(
							'<img src="img/cloudy.png" alt="cloudy">'
						);
						$(".slider").addClass("grey");
						$(".deg").css("color", "#878787");
					} else if (
						(weatherIcon >= 300 && weatherIcon <= 321) ||
						(weatherIcon >= 500 && weatherIcon <= 531)
					) {
						// rain
						$(".weatherapp").css("background", "#878787");
						$(".icon").html(
							'<img src="img/rain.png" alt="rainy">'
						);
						$(".slider").addClass("blue");
						$(".deg").css("color", "#878787");
					} else if (weatherIcon >= 200 && weatherIcon <= 232) {
						// thunderstorm
						$(".weatherapp").css("background", "#4E5A77");
						$(".icon").html(
							'<img src="img/thunderstorm.png" alt="thunderstorm">'
						);
						$(".slider").addClass("blue");
						$(".deg").css("color", "#4E5A77");
					} else if (weatherIcon >= 600 && weatherIcon <= 622) {
						// snow
						$(".weatherapp").css("background", "#878787");
						$(".icon").html(
							'<img src="img/snowy.png" alt="snowy">'
						);
						$(".slider").addClass("grey");
						$(".deg").css("color", "#878787");
					}
				} // dayIcons() end

				function nightIcons() {
					if (weatherIcon == 800) {
						// clear
						$(".weatherapp").css("background", "#001548");
						$(".icon").html(
							'<img src="img/clearnight.png" alt="clear-night">'
						);
						$(".slider").addClass("yellow");
						$(".deg").css("color", "#001548");
					} else if (weatherIcon == 801) {
						// few clouds
						$(".weatherapp").css("background", "#001548");
						$(".icon").html(
							'<img src="img/cloudynight.png" alt="few-clouds">'
						);
						$(".slider").addClass("yellow");
						$(".deg").css("color", "#8CADFE");
					} else if (weatherIcon >= 802 && weatherIcon <= 804) {
						// cloudy
						$(".weatherapp").css("background", "#001548");
						$(".icon").html(
							'<img src="img/cloudy.png" alt="few-clouds">'
						);
						$(".slider").addClass("grey");
						$(".deg").css("color", "#878787");
					} else if (
						(weatherIcon >= 300 && weatherIcon <= 321) ||
						(weatherIcon >= 500 && weatherIcon <= 531)
					) {
						// rain
						$(".weatherapp").css("background", "#001548");
						$(".icon").html(
							'<img src="img/Rain.png" alt="rainy">'
						);
						$(".slider").addClass("blue");
						$(".deg").css("color", "#878787");
					} else if (weatherIcon >= 600 && weatherIcon <= 622) {
						// snow
						$(".weatherapp").css("background", "#001548");
						$(".icon").html(
							'<img src="img/snowy.png" alt="snowy">'
						);
						$(".slider").addClass("grey");
						$(".deg").css("color", "#878787");
					} else if (weatherIcon >= 200 && weatherIcon <= 232) {
						// thunderstorm
						$(".weatherapp").css("background", "#001548");
						$(".icon").html(
							'<img src="img/thunderstorm.png" alt="thunderstorm">'
						);
						$(".slider").addClass("blue");
						$(".deg").css("color", "#4E5A77");
					}
				} // nightIcons() end

				// Choose Icons Based on Time VS Sunset & Sunrise
				if (t <= sunset && t >= sunrise) {
					dayIcons();
				} else {
					nightIcons();
				} // Choose Icons end

				// Toggle Switch for Celsius & Fahrenheit
				var toggleTemp = true;
				$(".slider").click(function() {
					if (toggleTemp === false) {
						$(".temp").html(celsius);
						toggleTemp = true;
					} else {
						$(".temp").html(fahrenheit);
						toggleTemp = false;
					}
				}); // Toggle Switch End
			}); // getJSON End
		}, function (error) {
  if (error.code == error.PERMISSION_DENIED)
      $('.weatherapp').remove();
			$('.container').html('<div class="error"><p class="oops"><i class="fa fa-thumbs-down" aria-hidden="true"></i></br>We could not locate you!</p><p>Please refresh your browser and allow this app to use your location.</p></div>');
}); // Navigator Function End
	} // Geolocation IF end

}); // Document Ready End
