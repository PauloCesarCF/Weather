const form = document.querySelector('.form-temp');
const buttonSearchCity = document.querySelector('.search-city');

form.addEventListener('submit', e => {
    e.preventDefault()
})

const NotFound = () => {
    return (
        '<p>Não foi possivel encontrar a cidade citada</p>'
    )
}

const ShowTemp = (temp) => {
    const tempo = temp.weather;
    const description = temp.weather[0].description;
    const icon = temp.weather[0].icon


    const principal = temp.main;
    const maxima = principal.temp_max;
    const minima = principal.temp_min;
    const nuvem = temp.clouds;
    const pais = temp.sys;
    const nome = temp.name;

    const flag = `https://countryflagsapi.com/png/${pais.country}`

    const img = document.createElement('img')
    img.src = flag

    return (`
        <div>
            <img src='imgs/localitaion.svg' />
            <p>${nome} ${principal.temp}°C</p>
        </div>
        <p>${description} <img src=https://openweathermap.org/img/wn/${icon}.png /></p>
        <p>Maxima: ${maxima}°C</p>
        <p>Minima: ${minima}°C</p>
    `)
}

const renderTemp = temp => {
    const section = document.querySelector('section')

    section.innerHTML = temp.cod === '400' | temp.cod === '404' ? NotFound() : ShowTemp(temp)
};

const getResponseAPI = async () => {
    const city = document.querySelector('.city');
    const body = document.querySelector('body');
    const local = city.value;
    const loader = document.querySelector('.containerLoader')

    loader.style.display = 'block'

    const api = {
        units: 'metric',
        key: '2b135a19f86417fbfcded25071e3fb00',
        lang: 'pt_br'
    };

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const getNumberRandom = randomNumber(numbers)

    const getImage = await fetch(`https://api.unsplash.com/search/photos?client_id=vxJ9jiqcDmrTxrGN_tQX5jWqLiN2_5S7Or73VjnMtJM&query=${city.value}`)
    const ImageJson = await getImage.json()
    console.log(ImageJson)
    const image = ImageJson.results[getNumberRandom].urls.full

    body.style.backgroundImage = `url(${image})`
    body.style.backgroundPosition = 'center center'
    body.style.backgroundSize = 'cover'

    const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&units=${api.units}&lang=${api.lang}&appid=${api.key}`)
    const json = await get.json()
    console.log(json);
    renderTemp(json);


    loader.style.display = 'none'
}

function randomNumber(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

buttonSearchCity.addEventListener('click', () => getResponseAPI())
