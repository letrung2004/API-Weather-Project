

document.addEventListener('DOMContentLoaded', () => {
    const APP_ID = '146ef5532661016489d9a6177b6b5d92';
    const cityNameSelected = document.querySelector('#citySelected');
    const DEFAULT_VALUE='--';

    
    cityNameSelected.addEventListener('change', (e) => {
        const selectedCity = e.target.value;
        console.log('[cityname]', selectedCity);
        weatherData(selectedCity);
    });
    

    function weatherData(cityName){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APP_ID}&units=metric`;

        fetch(apiUrl)
        .then(async res=>{
            const data=await res.json();
            console.log('[cityname]',data);
            updateWeatherData(data);
        }) .catch(error => console.error('Error fetching weather data:', error));
    }

    function updateWeatherData(data){
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.weather').textContent=data.weather[0].description;
        document.querySelector('.weather-icon').src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector('.temperature').textContent=data.main.temp;
        document.querySelector('.sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        document.querySelector('.sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        document.querySelector('.humidity').textContent=`${data.main.humidity}`;
        document.querySelector('.windSpeed').textContent=`${data.wind.speed}`;
    }
});
