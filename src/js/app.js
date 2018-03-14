// Cache Dom
const btnSubmit = document.getElementsByClassName('btn-submit')[0];
const btnSubmitFuture = document.getElementsByClassName('btn-submit')[1];
const cityInformations = document.getElementsByClassName('city-informations')[0];
const temperature = document.getElementsByClassName('weather-info')[0];
const humidity = document.getElementsByClassName('weather-info')[1];
const pressure = document.getElementsByClassName('weather-info')[2];
const clouds = document.getElementsByClassName('weather-info')[3];
const choosenCity = document.getElementsByClassName('choosen-city')[0];
const choosenCityFuture = document.getElementsByClassName('choosen-city')[1];
const time = document.getElementsByClassName('time');
const yesButton = document.getElementsByClassName('yes-button')[0];
const noButton = document.getElementsByClassName('no-button')[0];
const futureTemp = document.getElementsByClassName('future-temp');
const futureHumid = document.getElementsByClassName('future-humid');
const futurePressure = document.getElementsByClassName('future-pressure');
const futureClouds = document.getElementsByClassName('future-clouds');
const checkFuture = document.getElementsByClassName('check-future')[0];
const futureWeatherSection = document.getElementsByClassName('future-weather')[0];
const errorMsg = document.getElementsByClassName('error')[0];
const futureCity = document.getElementsByClassName('future-city-informations')[0];
const cityInput = document.getElementsByClassName('city-input');


// Main weather function
let showWeather = () => {
  // create XHR Object
  cityInformations.classList.remove('hidden');
  let userInput = cityInput[0].value;
  let url = `http://api.openweathermap.org/data/2.5/find?q=${userInput}&units=metric&APPID=3f97ec7c1a1fbcea52329fce776a3af1`
  let xhr = new XMLHttpRequest();
  // OPEN - type, url/file, async
  xhr.open('GET', url, true);
  xhr.onload = function(){
    if (this.status === 200) {
      let weather = JSON.parse(this.responseText)
      choosenCity.innerHTML = `Weather in ${userInput}`
      checkFuture.innerHTML = `Do you also want to check future forecast for ${userInput} ?`
      // displaying weather infromations
      temperature.innerHTML =`Temperature: ${weather.list[0].main.temp} &degC`
      humidity.innerHTML = `Humidity: ${weather.list[0].main.humidity} %`
      pressure.innerHTML = `Pressure: ${weather.list[0].main.pressure} hPa`
      clouds.innerHTML =  `Clouds: ${weather.list[0].clouds.all} %`

      futureWeatherSection.style.display = "flex";
  }else{
    error.style.display= "block";

  }
}
  //  sends request
  xhr.send();
}
// Same city forecast
let sameCityForecast = () =>{
    let userInput = cityInput[0].value;
      choosenCityFuture.innerHTML = `5 days weather in ${userInput}`
      futureCity.style.display = "flex"
      weatherForecast(userInput);
}
// diffrent city forecast
let diffrentCityForecast = ()=>{
    let userInput = cityInput[1].value;
      choosenCityFuture.innerHTML = `5 days weather in ${userInput}`
      futureCity.style.display = "flex"
      weatherForecast(userInput);
  }
  // displaying search area
let SearchField = () =>{
  checkFuture.style.display = "none"
  yesButton.style.display = "none";
  noButton.style.display = "none";
  btnSubmitFuture.style.display = "block";
  document.getElementsByClassName('city-input')[1].style.display = "block";
}
// Main foreceast function
let weatherForecast = (name) =>{
  checkFuture.style.display = "none"
  noButton.style.display = "none"
  yesButton.style.display = "none"
  btnSubmitFuture.style.display = "none";
  cityInput[1].style.display = "none";

  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&APPID=3f97ec7c1a1fbcea52329fce776a3af1`
  let xhr = new XMLHttpRequest();
  // OPEN - type, url/file, async
  xhr.open('GET', url, true);
  xhr.onload = function(){
    if (this.status === 200) {
      let futureWeather = JSON.parse(this.responseText)
        let add = 0;
      for (var i = 0; i < time.length; i++) {
        // setting up date
        let dateUnix = new Date(futureWeather.list[add].dt*1000);
        let date = `${dateUnix.getFullYear()}/${(dateUnix.getMonth()+1)}/${dateUnix.getDate()}`;
        time[i].innerHTML = date;
        // displaying weather informations
        futureTemp[i].innerHTML = `Temperature: ${futureWeather.list[add].main.temp} &degC`;
        futureHumid[i].innerHTML = `Humidity: ${futureWeather.list[add].main.humidity} %`;
        futurePressure[i].innerHTML = `Pressure: ${futureWeather.list[add].main.pressure}  hPa`;
        futureClouds[i].innerHTML = `Clouds: ${futureWeather.list[add].clouds.all} %`;
        add += 8;
      }
  }else{
    error.style.display= "block";
  }
  }
    //  sends request
    xhr.send();
}

// Event Listeners
btnSubmit.addEventListener("click", showWeather);
btnSubmitFuture.addEventListener("click", diffrentCityForecast);
yesButton.addEventListener("click", sameCityForecast);
noButton.addEventListener("click", SearchField);
