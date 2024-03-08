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


const searchTest = document.querySelector('#search-test');
const searchResultsContainer = document.querySelector('#search-results');

searchTest.addEventListener('input', async (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm.length === 0) {
        searchResultsContainer.innerHTML = ''; // Xóa danh sách kết quả nếu không có kết quả
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${APP_ID}`);
        const data = await response.json();
        
        // Xóa nội dung của phần tử chứa danh sách kết quả
        searchResultsContainer.innerHTML = '';

        // Tạo các phần tử HTML để hiển thị kết quả tìm kiếm
        data.forEach(city => {
            const cityElement = document.createElement('div');
            cityElement.classList.add('city-result');
            cityElement.innerHTML = `
                <p>${city.name} - ${city.country}</p>
            `;
            searchResultsContainer.appendChild(cityElement);
        });
        searchBox.style.backgroundColor = 'transparent';
    } catch (error) {
        console.error('Error fetching data:', error);
        // Xử lý lỗi nếu có
    }
});


// Lắng nghe sự kiện click cho phần tử chứa danh sách kết quả
searchResultsContainer.addEventListener('click', async (e) => {
    const cityNameText = e.target.textContent.trim().split(' - ')[0];
    console.log(cityNameText);
 
        
        
        try {
            // Gửi yêu cầu API để lấy dữ liệu thời tiết của thành phố đã click
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameText}&appid=${APP_ID}&units=metric&lang=vi`);
            const data = await response.json();
            console.log('[Weather Data]', data);
            
            // Hiển thị thông tin thời tiết của thành phố đã click
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
          
            
            weathericon.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE ;
            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm')||DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm')||DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windspeed.innerHTML = (data.wind.speed*3.6).toFixed(2) || DEFAULT_VALUE;

            // Xóa nội dung của phần tử chứa danh sách kết quả
            searchResultsContainer.innerHTML = '';
        } catch (error) {
            console.error('Error fetching data:', error);
            // Xử lý lỗi nếu có
        }
    }
);








///TẾT
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear()+1;

const newYearTime = new Date(`January 29 ${currentYear}`);

function countDown(){
    const currentTime = new Date();
    const difference = newYearTime - currentTime;
    
    const daysLeft = Math.floor(difference/1000/60/60/24);
    const hoursLeft = Math.floor(difference/1000/60/60)%24;
    const minutesLeft = Math.floor(difference/1000/60/60)%60;
    const secondsLeft = Math.floor(difference/1000)%60;


    days.innerHTML = daysLeft +'<small> Ngày</small>';
    hours.innerHTML = hoursLeft +'<small> Tiếng</small>';
    minutes.innerHTML = minutesLeft +'<small> Phút</small>';
    seconds.innerHTML = secondsLeft +'<small> Giây</small>';
}
setInterval(countDown,1000)
///TẾT