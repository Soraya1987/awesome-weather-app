function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let now=new Date(); 
  let date=now.getDate();
  let hours=now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes=now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year=now.getFullYear();
  let month=now.getMonth()+1;  
  if (month<10){
    month=`0${month}`;
  }
  let day = days[now.getDay()];
  let numDay=now.getDate();
  if(numDay<10){
    numDay=`0${numDay}`;
  }
  let nowDate=document.querySelector("#nowDate");
    
      let formatDate = `${day} ${hours}:${minutes}\n ${year}-${month}-${numDay}`;
      nowDate.innerHTML=formatDate;    
  }

  function setWeather(response){
    document.querySelector("#cityName").innerHTML=response.data.name;
    document.querySelector("#degree").innerHTML=Math.round(response.data.main.temp) ;
    document.querySelector("#humidity").innerHTML=response.data.main.humidity;
    document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed) ;
    document.querySelector("#description").innerHTML=response.data.weather[0].main;
    
  }

  function search(city)
  {
    let apiKey="43f1d8f12b8168c4b7d63a4219944689";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
     axios.get(apiUrl).then(setWeather);
  }

function searchCity(event) {
  event.preventDefault();
  let city=document.querySelector("#cityInp").value;
  search(city);
}

function searchLocation(position)
{
  let apiKey="43f1d8f12b8168c4b7d63a4219944689";
  let latitude=position.coords.latitude;
  let longitude=position.coords.longitude;
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(setWeather);
}

function getCurrentLocation(event)
{
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}



let form=document.querySelector("form");
form.addEventListener("submit",formatDate());
form.addEventListener("submit",searchCity);

let currentLocationButtom=document.querySelector("#current-location-buttom");
//currentLocationButtom.addEventListener("submit",getCurrentLocation);

currentLocationButtom.addEventListener("click", getCurrentLocation);
search("New York");