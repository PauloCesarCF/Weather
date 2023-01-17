const form = document.querySelector('.form-temp');
const buttonSearchCity = document.querySelector('.search-city');
const city = document.querySelector('.city');

form.addEventListener('submit', e => {
    e.preventDefault()
})

const showImageBackground = async () => {
    const body = document.querySelector('body');

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const getNumberRandom = randomNumber(numbers)

    const getImage = await fetch(`https://api.unsplash.com/search/photos?client_id=vxJ9jiqcDmrTxrGN_tQX5jWqLiN2_5S7Or73VjnMtJM&query=${city.value}`)
    const ImageJson = await getImage.json()
    const image = ImageJson.results[getNumberRandom].urls.full

    body.style.backgroundImage = `url(${image})`
    body.style.backgroundPosition = 'center center'
    body.style.backgroundSize = 'cover'

}

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

    if (temp.cod === '400' | temp.cod === '404') {
        section.innerHTML = `<p>Não foi possível encontrar a cidade citada`
        return
    }
    section.innerHTML = ShowTemp(temp)
    showImageBackground()
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
