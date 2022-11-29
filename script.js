var apiKey = "af44960abbcc41f5ff680fae977d1d71";
var button = $("#search-button");
var searchInput = "";


button.click(function (){
console.log("button was clicked");
searchInput = $("#search-city").val().trim();
console.log(searchInput);

})