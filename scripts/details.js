// script for the details page

const name = new URLSearchParams(window.location.search).get('name')
const container = document.querySelector('.country-row');
var template2 = ''
const borderDiv = document.querySelector('.borderr')
const button = document.querySelector('button')
const themeBtn = document.querySelector('.theme')

const getCurrentTheme = () => {
    let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    localStorage.getItem('countries.theme') ? theme = localStorage.getItem('countries.theme') : null
    return theme;
}

const loadTheme = (theme) => {
    const root = document.querySelector(':root');
    if(theme === "light"){
        themeBtn.innerHTML = '<p class="text-darkblue font-16 pointer"><i class="fa-solid d-inline fa-moon icon-dark"></i> Dark Mode</p>'
    } else{
        themeBtn.innerHTML = '<p class="text-darkblue font-16 pointer"><i class="fa-solid d-inline fa-moon icon-light"></i> Light Mode</p>'
    }
    root.setAttribute('color-scheme', `${theme}`)
}

themeBtn.addEventListener('click', () => {
    let theme = getCurrentTheme();
    if(theme ==='dark'){
        theme = 'light'
    } else {
        theme = 'dark'
    }
    loadTheme(theme);
    localStorage.setItem('countries.theme', `${theme}`)
})

button.addEventListener('click', () => {
    history.back()
})

// function declaration to render country on page
const renderCountry = async () => {
    const res = await fetch(`https://restcountries.com/v2/name/${name}`)
    // Error handler
    if(!res.ok){
        let template = ''
        template += `
            <h4 class="font-800 text-danger">Error Loading data...</h4>
        `
        container.innerHTML = template;
    }
    const country = await res.json();

    // map border countries
    const borderCountries = country[0].borders.forEach(async (border) => {
        const borderCount = await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        const data = await borderCount.json()
        template2 += `
            <a href="./details.html?name=${data[0].name.common}" class="bg-white col-4 col-md-2 py-2 m-3 px-4 shadow-sm rounded text-darkblue">${data[0].name.common}</a>
        `
        console.log(data)
        console.log(template2);
        borderDiv.innerHTML = template2
    })

    // format population
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const population = (dollarUSLocale.format(country[0].population))
    console.log(country)

    let template = ``
    
    template += `
    <div class="col-12 col-md-6">
        <img src=${country[0].flags.png} alt="country-image" class="img-fluid"> 
    </div>
    <div class="col-12 col-md-6">
        <div class="py-3">
            <h4 class="font-800 text-darkblue">${country[0].name}</h4>
            <div class="row py-2">
                <div class="col-12 col-md-6 text-darkblue">
                    <p class="font-600 fw-bold mb-1">Native Name: <span class="font-300">${country[0].nativeName}</span></p>
                    <p class="font-600 fw-bold mb-1">Population: <span class="font-300">${population}</span></p>
                    <p class="font-600 fw-bold mb-1">Region: <span class="font-300">${country[0].region}</span></p>
                    <p class="font-600 fw-bold mb-1">Sub Region: <span class="font-300">${country[0].subregion}</span></p>
                    <p class="font-600 fw-bold mb-1">Capital: <span class="font-300">${country[0].capital}</span></p>
                </div>
                <div class="col-12 col-md-6 text-darkblue">
                    <p class="font-600 fw-bold mb-1">Top Level Domain: <span class="font-300">${country[0].topLevelDomain}</span></p>
                    <p class="font-600 fw-bold mb-1">Currencies: <span class="font-300">${country[0].currencies[0].name}</span></p>
                    <p class="font-600 fw-bold mb-1">Language: <span class="font-300">${country[0].languages[0].name}</span></p>
                </div>
            </div>
            <div class="py-4 text-darkblue">
                <span class="font-600 fw-bold mb-1 borderrr">Border Countries: </span> <span>${template2}</span>
            </div>
        </div>
    </div>
    `
    console.log(template)
    container.innerHTML = template;
}

// function expression to render the country on the page
window.addEventListener('DOMContentLoaded', () => {
    loadTheme(getCurrentTheme());
    renderCountry();
})

