document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if(input !== ''){
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=55461a3514fd21014ff794dc5c2840fa&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200){

      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        maxTemp: json.main.temp_max,
        minTemp: json.main.temp_min,
        humidity:json.main.humidity,
        feels:json.main.feels_like,
        sunset:json.sys.sunset,
        description:json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });

    } else{
      clearInfo();
      showWarning('Não encontramos essa localização');
    }
  } else{
    clearInfo();
  }
});

function showInfo(json){
  showWarning('');

  let d = new Date(json.sunset * 1000);
  let h = d.getHours();
  let m = d.getMinutes();

  let wSpeed = '';

  if(Math.floor(json.windSpeed.toFixed()*3.6)<10){
    wSpeed = `0${Math.floor(json.windSpeed.toFixed()*3.6)}`;
  } else{
    wSpeed = Math.floor(json.windSpeed.toFixed()*3.6);
  }

  document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed()}<sup>ºC</sup>`;
  document.querySelector('.tempDescription').innerHTML = `${json.description}`;
  document.querySelector('.tempMax').innerHTML = `Max: ${Math.floor(json.maxTemp.toFixed(1))}<sup>ºC</sup>`;
  document.querySelector('.tempMin').innerHTML = `Min: ${Math.floor(json.minTemp.toFixed(1))}<sup>ºC</sup>`;
  document.querySelector('.sunsetInfo').innerHTML = `${h}:${m}`;
  document.querySelector('.ventoInfo').innerHTML = `${wSpeed} <spam>km/h</spam>`;
  document.querySelector('.image img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
  document.querySelector('.fellsLikeInfo').innerHTML = `${json.feels} <sup>ºC</sup>`;
  document.querySelector('.humidityInfo').innerHTML = `${json.humidity} <span>%</span>`;

  setTimeout(()=>{
    document.querySelector('.resultado').style.display = 'block';
  }, 100
  )
  
};

function clearInfo(){
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
};


function showWarning(msg){
  document.querySelector('.aviso').innerHTML = msg;
};

