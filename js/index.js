

let searchInput = document.getElementById("search");

let icon = document.getElementById("icon");
icon.addEventListener("click" , function(){
    document.body.classList.toggle("dark-theme")
    if (document.body.classList.contains("dark-theme")){
        icon.src = "images/sun.png"
    }else {
        icon.src = "images/moon.png"
    }
})

let currentlocation = document.querySelector(".location");
currentlocation.addEventListener("click" , function(){
    window.alert("Allow access your location");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition , showError)
    }else {
        window.alert("Geolocation is not supported by this browser.");
    }
});
const  showPosition = async(position)=>{
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat , long);
    const url = `https://api.weatherapi.com/v1/forecast.json?key=88f75ea22d674d35906140952242803&q=${lat,long}`;
    let data = await fetch(url);
    let res = await data.json();
    console.log(res);
    getForecast(res.location.name);
}
const showError = (error)=>{
    console.log(error)
    window.alert(error)
}






searchInput.addEventListener("keyup", function(){
    getForecast(searchInput.value);
})


const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = new Date().getDay();
  let months= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
let month = new Date().getMonth();
let dayName = new Date().getDate()




async function getForecast(city){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=88f75ea22d674d35906140952242803&q=${city}&days=7`);
    let res = await data.json();
    console.log(res);
    displayCurrentDay(res.current);
    getCityName(res);
    getTime(res);
    displayDay2(res.forecast.forecastday[1]);
    displayDay3(res.forecast.forecastday[2]);
    getUpcomingForecast(res.forecast.forecastday);
}
getForecast("cairo")

 function displayCurrentDay(current){
    console.log(current);
    let cartona = `
    <div class="current-day rounded-4  ">
                        <div class="day d-flex justify-content-between align-items-center pt-3 ps-2 pe-2 shadow-sm rounded-top-4">
                            <p class="fs-5">${days[day]}</p>
                            <p class="fs-5">${dayName} ${months[month]}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <ul class="data p-2 d-flex flex-column gap-1">
                                <li class="temp fs-1 ">${current.temp_c}°</li>
                                <li class="temo fs-4" >${current.condition.text} </li>
                                <li>Wind: ${current.wind_kph} Km/h</li>
                                   <li> Pressure: ${current.pressure_mb}Mb</li>
                                   <li> Humidity: ${current.humidity}%</li>
                            </ul>
                            <div class="d-flex justify-content-center align-items-center w-50 h-100">
                                <img src=${current.condition.icon} class="w-75" alt="">
                            </div>
                        </div>
                    </div>
    `
    document.getElementById("current").innerHTML = cartona
}
function getCityName(res){
let cartona = `
<h2 class="fs-1">${res.location.name}</h2>
`
document.querySelector(".cityName").innerHTML = cartona;
}

function getTime(res){
let container =`
<h2 class="fs-2">${res.location.localtime.slice(10,)}</h2>
`
document.querySelector(".hour").innerHTML = container;
}


function displayDay2(day2){
    console.log(day2);
    let container = `<div class="day3 rounded-4 d-flex justify-content-between align-items-center flex-column ">
                        <div class="content w-100">
                            <div class="day shadow w-100 py-2">
                                <h3 class="text-center ">${days[day + 1]}</h3>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-3">
                                <ul class="data w-75 group p-2 d-flex flex-column gap-1">
                                    <li class="temp fs-1 ">${day2.day.maxtemp_c}°</li>
                                    <li class="fst-italic fs-4">${day2.day.condition.text}</li>
                                    <li>Wind: ${day2.day.maxwind_kph} Km/h</li>
                                       <li> Sunrise: ${day2.astro.sunrise}</li>
                                       <li> Sunset: ${day2.astro.sunset}</li>
                                       
                                </ul>
                                <div class="d-flex justify-content-center align-items-end w-50 h-100">
                                    <img src=${day2.day.condition.icon} class="w-100" alt="">
                                </div>
                        </div>
                    </div>
                 </div>   `
    document.getElementById("day2").innerHTML = container;                
}

function displayDay3(day3){
   console.log(day3);
   let container = `
       <div class="day3 rounded-4 d-flex justify-content-between align-items-center flex-column ">
                        <div class="content w-100">
                            <div class="day shadow w-100 py-2">
                                <h3 class="text-center">${days[day + 2]}</h3>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mt-3">
                                <ul class="data w-75 group p-2 d-flex flex-column gap-1">
                                    <li class="temp fs-1 ">${day3.day.maxtemp_c}°</li>
                                    <li class="fst-italic fs-4">${day3.day.condition.text}</li>
                                    <li>Wind: ${day3.day.maxwind_kph} Km/h</li>
                                       <li> Sunrise: ${day3.astro.sunrise}</li>
                                       <li> Sunset: ${day3.astro.sunset}</li>
                                       
                                </ul>
                                <div class="d-flex justify-content-center align-items-end w-50 h-100">
                                    <img src=${day3.day.condition.icon} class="w-100" alt="">
                                </div>
                        </div>
                    </div>
                 </div>  
   `
   document.getElementById("day3").innerHTML = container

}

function getUpcomingForecast(res){
    console.log(res[1])
    let container = `
     <div class="item p-2 d-flex justify-content-between align-items-center  ">
                        <div class="d-flex flex-column">
                            <span class="fs-5">${res[1].hour[0].time.slice(10,)} AM</span>
                            <span class="fw-medium" >${res[1].hour[0].temp_c}°</span>
                        </div>
                        <span class="fst-italic" >${res[1].hour[0].condition.text}</span>
                    </div>
                    <div class="item p-2 d-flex justify-content-between align-items-center ">
                        <div class="d-flex flex-column">
                            <span class="fs-5">${res[1].hour[2].time.slice(10,)} AM</span>
                            <span class="fw-medium" >${res[1].hour[2].temp_c}°</span>
                        </div>
                        <span class="fst-italic" >${res[1].hour[2].condition.text}</span>
                    </div>
                    <div class="item p-2 d-flex justify-content-between align-items-center  ">
                        <div class="d-flex flex-column">
                            <span class="fs-5">${res[1].hour[4].time.slice(10,)} AM</span>
                            <span class="fw-medium" >${res[1].hour[4].temp_c}°</span>
                        </div>
                        <span class="fst-italic" >${res[1].hour[4].condition.text}</span>
                    </div>
                    <div class="item p-2 d-flex justify-content-between align-items-center ">
                        <div class="d-flex flex-column">
                            <span class="fs-5">${res[1].hour[6].time.slice(10,)} AM</span>
                            <span class="fw-medium" >${res[1].hour[6].temp_c}°</span>
                        </div>
                        <span class="fst-italic" >${res[1].hour[6].condition.text}</span>
                    </div>
                   
    `
    document.querySelector(".cards").innerHTML = container
}


async function chinaWeather(){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=88f75ea22d674d35906140952242803&q=beijing`);
    let res = await data.json();
    console.log(res);
    displayChina(res)
    
}
function displayChina(res){
    let container = `
    <div class="d-flex largecity p-3 rounded-4 justify-content-between align-items-center">
                                <div class="data d-flex flex-column">
                                    <h5 class="fw-normal opacity-75">China</h5>
                                    <h6 class="fw-semibold">Beijing</h6>
                                    <span class="fst-italic fw-medium">${res.current.condition.text}</span>
                                    <span class="fw-bold">${res.current.temp_c}°</span>

                                </div>
                                <div class="image w-25">
                                    <img src=${res.current.condition.icon} class="w-100" alt="">
                                </div>
                            </div>  
    `
    document.getElementById("city2").innerHTML = container
}
chinaWeather()



async function parisWeather(){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=88f75ea22d674d35906140952242803&q=paris`);
    let res = await data.json();
    console.log(res);
    displayparis(res)
    
}
function displayparis(res){
    let container = `
    <div class="largecity d-flex rounded-4 p-3 justify-content-between align-items-center">
                                <div class="data d-flex flex-column">
                                    <h5 class="fw-normal opacity-75">France</h5>
                                    <h6 class="fw-semibold">Paris</h6>
                                    <span class="fst-italic fw-medium">${res.current.condition.text}</span>
                                   <span  class="fw-bold">${res.current.temp_c}°</span>

                                </div>
                                <div class="image w-25">
                                    <img src=${res.current.condition.icon} class="w-100" alt="">
                                </div>
                            </div>  
    `
    document.getElementById("city1").innerHTML = container
}
parisWeather()