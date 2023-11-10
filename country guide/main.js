let container = document.querySelector('.container');

let searchBtn = document.querySelector("#search-btn");

let countryInp = document.querySelector("#country-inp");

let result = document.querySelector(".result");

// when you click
searchBtn.addEventListener('click', () => {

    // to remove all
    result.innerHTML = '';

    let flag = document.createElement("img");
    flag.className = 'flag-img';

    let Name = document.createElement('p');
    Name.className = 'country-name';

    let capital = document.createElement('p');
    let continent = document.createElement('p');
    let population = document.createElement('p');
    let currency = document.createElement('p');
    let common_languages = document.createElement('p');

    let p_div = document.createElement('div');
    p_div.className = 'info_div'; 
    p_div.append(capital, continent, population, currency, common_languages);

    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {

            // flag image
            flag.src = data[0].flags.svg;
            result.appendChild(flag);

            // country name 
            let country_Name = document.createTextNode(countryName);
            Name.appendChild(country_Name);
            result.appendChild(Name);

            // country inforamtion in p
            let continent_text = document.createTextNode(`Continent: ${data[0].continents[0]}`);
            continent.appendChild(continent_text);

            let population_text = document.createTextNode(`Population: ${data[0].population}`);
            population.appendChild(population_text);

            let capital_text = document.createTextNode(`Capital: ${data[0].capital[0]}`);
            capital.appendChild(capital_text);

            let currency_text = document.createTextNode(`Currency: ${data[0].currencies[Object.keys(data[0].currencies)].name}`);
            currency.appendChild(currency_text);

            let common_languages_text = document.createTextNode(`Common Language: ${Object.values(data[0].languages).toString().split(",").join(", ")}`);
            common_languages.appendChild(common_languages_text);

            // apendding to container div
            result.appendChild(p_div);
            container.appendChild(result);
        }).catch(() => {
            if (countryName === "") {
                result.innerHTML = `<h3>The input field cannot be empty</h3>`;
            } else {
                result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
            }
        });
});



