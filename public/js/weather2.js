let weather = {
    //api_key: "70ad934c4fb447329e0e66c606a80637",

    getweather: function (city) {
        //fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.api_key)
            .then(response => {
                if (!response.ok) {
                    alert("No weather found");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then(data => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";

    },

    search: function () {
        this.getweather(document.querySelector(".search-bar").value);
    },


};


function myfunction() {
    weather.search();
};


document.querySelector(".search button").addEventListener("click", function () {
    weather.search();

});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});



weather.getweather("Cairo");