const APP_ID='ff9d41a8d57ab6aced6f4953c54247dd';
const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');

const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weathericon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windspeed = document.querySelector('.wind-speed');


searchInput.addEventListener('change',(e)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
    .then(async res=>{
        const data = await res.json();
        console.log('[Search Input]', data);
        cityName.innerHTML = data.name || DEFAULT_VALUE;
        weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
        weathericon.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`) || DEFAULT_VALUE
        temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE
    
        sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm')||DEFAULT_VALUE;
        sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm')||DEFAULT_VALUE;
        humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
        windspeed.innerHTML = (data.wind.speed*3.6).toFixed(2) || DEFAULT_VALUE
    })
})

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 22 ${currentYear}`);

function countDown(){
    const currentTime = new Date();
    const difference = newYearTime - currentTime;
    
    const daysLeft = Math.floor(difference/1000/60/60/24);
    const hoursLeft = Math.floor(difference/1000/60/60)%24;
    const minutesLeft = Math.floor(difference/1000/60/60)%60;
    const secondsLeft = Math.floor(difference/1000)%60;

    console.log(`days: ${daysLeft}`);
    console.log(`hours: ${hoursLeft}`);
    console.log(`minutes: ${minutesLeft}`);
    console.log(`seconds: ${secondsLeft}`);

    days.innerHTML = daysLeft +'<small> Ngày</small>';
    hours.innerHTML = hoursLeft +'<small> Tiếng</small>';
    minutes.innerHTML = minutesLeft +'<small> Phút</small>';
    seconds.innerHTML = secondsLeft +'<small> Giây</small>';
}
setInterval(countDown,1000)
