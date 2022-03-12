// script for the index.html page

const container = document.querySelector('.country-row')
const search = document.querySelector('.search-input')
const region = document.querySelector('.region')

const renderCountries = async () => {
    let uri = 'https://restcountries.com/v3.1/all'

    const res = await fetch(uri)
    console.log(res)
    if(!res.ok){
        let template = ''
        template += `
            <h4 class="font-800 text-danger">Error Loading data...</h4>
        `
        container.innerHTML = template;
    }
    const countries = await res.json()
    

    let template = ``

    countries.forEach(country => {
        let dollarUSLocale = Intl.NumberFormat('en-US');
        const population = (dollarUSLocale.format(country.population))
        template += `
            <div class="col-12 col-md-4 col-lg-3 mb-3 rounded">
                <a href="/details.html?name=${country.name.common}">
                    <div class="card shadow-sm">
                        <img src=${country.flags.png} style="height: 25vh;" alt="" class="rounded-top img-fluid">
                        <div class="p-3 font-14 text-darkblue">
                            <p class="fw-bold font-16 mb-2">${country.name.common}</p>
                            <p class="font-600 fw-bold mb-1">Population: <span class="font-300">${population}</span></p>
                            <p class="font-600 fw-bold mb-1">Region: <span class="font-300">${country.region}</span></p>
                            <p class="font-600 fw-bold mb-1">Capital: <span class="font-300">${country.capital}</span></p>
                        </div>
                    </div>
                </a>
            </div>
        `
    })
    
    container.innerHTML = template;

    const searchCountry = (term) => {
        console.log(term)
        const filteredCountry = countries.filter(country => country.name.common.toLowerCase().includes(term))
        console.log(filteredCountry);
        let template2 = ``

        filteredCountry.forEach((country) => {
            let dollarUSLocale = Intl.NumberFormat('en-US');
            const population = (dollarUSLocale.format(country.population))
            template2 += `
            <div class="col-12 col-md-4 col-lg-3 mb-3 rounded">
                <a href="/details.html?name=${country.name.common}">
                    <div class="card shadow-sm">
                        <img src=${country.flags.png} style="height: 25vh;" alt="" class="rounded-top img-fluid">
                        <div class="p-3 font-14 text-darkblue">
                            <p class="fw-bold font-16 mb-2">${country.name.common}</p>
                            <p class="font-600 fw-bold mb-1">Population: <span class="font-300">${population}</span></p>
                            <p class="font-600 fw-bold mb-1">Region: <span class="font-300">${country.region}</span></p>
                            <p class="font-600 fw-bold mb-1">Capital: <span class="font-300">${country.capital}</span></p>
                        </div>
                    </div>
                </a>
            </div>
        `
        container.innerHTML = template2;
        })

    }
    
    search.addEventListener('keyup', () => {
        const term = search.value.toLowerCase().trim()
        searchCountry(term)
    })

    const searchRegion = async (term) => {
    let uri = `https://restcountries.com/v3.1/region/${term}`
    if(term === ''){
        uri = 'https://restcountries.com/v3.1/all'
    }

    const res = await fetch(uri)
    const countries = await res.json()

    let template3 = ``
    countries.forEach(country => {
        let dollarUSLocale = Intl.NumberFormat('en-US');
        const population = (dollarUSLocale.format(country.population))
        template3 += `
            <div class="col-12 col-md-4 col-lg-3 mb-3 rounded">
                <a href="/details.html?name=${country.name.common}">
                    <div class="card shadow-sm">
                        <img src=${country.flags.png} style="height: 25vh;" alt="" class="rounded-top img-fluid">
                        <div class="p-3 font-14 text-darkblue">
                            <p class="fw-bold font-16 mb-2">${country.name.common}</p>
                            <p class="font-600 fw-bold mb-1">Population: <span class="font-300">${population}</span></p>
                            <p class="font-600 fw-bold mb-1">Region: <span class="font-300">${country.region}</span></p>
                            <p class="font-600 fw-bold mb-1">Capital: <span class="font-300">${country.capital}</span></p>
                        </div>
                    </div>
                </a>
            </div>
        `
        container.innerHTML = template3;
    })

    }

    region.addEventListener('change', () => {
        const term = region.value.toLowerCase().trim()
        searchRegion(term)
    })

}




renderCountries()





