// script for the details page

const name = new URLSearchParams(window.location.search).get('name')
const container = document.querySelector('.country-row');

const renderCountry = async () => {
    const res = await fetch(`https://restcountries.com/v2/name/${name}`)
    const country = await res.json();
    console.log(country)
    console.log(country[0].borders[2])

    // const borderCountries = country[0].borders.forEach(async (border, index) => {
    //     const borderCount = await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
    //     const data = await borderCount.json()
    //     console.log(data)
    // })

    let template = ``
    
    template += `
    <div class="col-12 col-md-6">
        <img src=${country[0].flags.png} alt="country-image" class="img-fluid"> 
    </div>
    <div class="col-12 col-md-6">
        <div class="py-3">
            <h4 class="font-800">${country[0].name}</h4>
            <div class="row py-2">
                <div class="col-12 col-md-6">
                    <p class="font-600 fw-bold mb-1">Native Name: <span class="font-300">${country[0].nativeName}</span></p>
                    <p class="font-600 fw-bold mb-1">Population: <span class="font-300">${country[0].population}</span></p>
                    <p class="font-600 fw-bold mb-1">Region: <span class="font-300">${country[0].region}</span></p>
                    <p class="font-600 fw-bold mb-1">Sub Region: <span class="font-300">${country[0].subregion}</span></p>
                    <p class="font-600 fw-bold mb-1">Capital: <span class="font-300">${country[0].capital}</span></p>
                </div>
                <div class="col-12 col-md-6">
                    <p class="font-600 fw-bold mb-1">Top Level Domain: <span class="font-300">${country[0].topLevelDomain}</span></p>
                    <p class="font-600 fw-bold mb-1">Currencies: <span class="font-300">${country[0].currencies[0].name}</span></p>
                    <p class="font-600 fw-bold mb-1">Language: <span class="font-300">${country[0].languages[0].name}</span></p>
                </div>
            </div>
            <div class="py-4">
                <span class="font-600 fw-bold mb-1">Border Countries:</span>
            </div>
        </div>
    </div>
    `

    container.innerHTML = template;
}

renderCountry();






