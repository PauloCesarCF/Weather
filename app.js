const form = document.querySelector('.form-temp');
const buttonSearchCity = document.querySelector('.search-city');
const city = document.querySelector('.city');

form.addEventListener('submit', e => {
    e.preventDefault()
})

const ShowTemp = (temp) => {

    const responseAPI = {
        tempNow: temp.weather,
        description: temp.weather[0].description,
        icon: temp.weather[0].icon,
        temp_now: temp.main.temp,
        temp_max: temp.main.temp_max,
        temp_min: temp.main.temp_min,
        clouds: temp.clouds,
        country: temp.sys,
        name: temp.name
    }

    return (`
        <div>
            <img src='imgs/localitaion.svg' />
            <p>${responseAPI.name} ${responseAPI.temp_now}°C</p>
        </div>
        <p>${responseAPI.description} <img src=https://openweathermap.org/img/wn/${responseAPI.icon}.png /></p>
        <p>Maxima: ${responseAPI.temp_max}°C</p>
        <p>Minima: ${responseAPI.temp_min}°C</p>
    `)
}

const renderTemp = temp => {
    const section = document.querySelector('section')

    section.innerHTML = temp.cod === '400' | temp.cod === '404' ? `<p>Não foi possível encontrar a cidade citada</p>` : ShowTemp(temp)
};

const getResponseAPI = async () => {
    const local = city.value;
    const loader = document.querySelector('.containerLoader')

    loader.style.display = 'block'

    const api = {
        units: 'metric',
        key: '2b135a19f86417fbfcded25071e3fb00',
        lang: 'pt_br'
    };

    const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&units=${api.units}&lang=${api.lang}&appid=${api.key}`)
    const json = await get.json()
    renderTemp(json);

    loader.style.display = 'none'
}

function randomNumber(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

buttonSearchCity.addEventListener('click', () => getResponseAPI())
