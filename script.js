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
    return fetch(apiUrl)
        .then(function(response){
           if(response.ok){
                return response.json();
           }
        })
}  

function getWeather(cityData){
    console.log(cityData);
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
        });
}