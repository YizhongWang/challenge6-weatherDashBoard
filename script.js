var apiKey = "af44960abbcc41f5ff680fae977d1d71";
var button = $("#search-button");
var forecastApi = "https://api.openweathermap.org/data/2.5/forecast";
var weatherApi="https://api.openweathermap.org/data/2.5/weather";


button.click(function (){
    console.log("button was clicked");
    var searchInput = $("#search-city").val().trim();     
    console.log(searchInput);
    getCity(searchInput)
        .then(getWeather);
})

function getCity(searchInput){
    var apiUrl = weatherApi + "?q=" + searchInput + "&appid=" + apiKey +"&units=imperial";
    console.log(apiUrl);
    return fetch(apiUrl)
        .then(function(response){
           if(response.ok){
                return response.json();
           }
        })
}  

function getWeather(cityData){
    console.log(cityData);
    var h2 =document.createElement("h2");
    h2.textContent=cityData.name
    document.querySelector(".screen").append(h2);
    var h3 =document.createElement("h3");
    h3.textContent= "Temperature: " + cityData.main.temp;
    document.querySelector(".screen").append(h3);
    var humidity =document.createElement("h3");
    humidity.textContent="Humidity: "+cityData.main.humidity;
    document.querySelector(".screen").append(humidity);
    var windSpeed =document.createElement("h3");
    windSpeed.textContent="Wind speed: "+cityData.wind.speed+ "mph";
    document.querySelector(".screen").append(windSpeed);
    var lat = cityData.coord.lat;
    var lon = cityData.coord.lon;
    var apiUrl = forecastApi + "?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                return response.json()
            }
        })
        .then(function(data){

            console.log(data);

        for(var i=0; i< data.list.length; i++){
            if(data.list[i].dt_txt.includes("09:00:00")){
                var day = document.createElement("h3");
                day.textContent= data.list[i].dt_txt;
                document.querySelector(".forecast").append(day);
                var weather = document.createElement("h3");
                weather.textContent="weather: "+data.list[i].weather[0].main;
                document.querySelector(".forecast").append(weather);
                var windSpeed = document.createElement("h3");
                windSpeed.textContent= "wind speed: "+data.list[i].wind.speed;
                document.querySelector(".forecast").append(windSpeed);
                var temperature = document.createElement("h3");
                temperature.textContent= "temperature: "+ data.list[i].main.temp;
                document.querySelector(".forecast").append(temperature);
            }
        }

        });

}