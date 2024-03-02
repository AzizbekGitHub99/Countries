function customFetch(url, options) {
  return new Promise(async (resolve, reject) => {
    const params = new URLSearchParams(options?.params);

    const res = await fetch(`${url}?${params}`, {
      ...options,
      body: JSON.stringify(options?.body),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      resolve(data);
    } else {
      reject("Error");
    }
  });
}

function getCountryCard({ name, flags, population, region, capital }) {
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div class="card">
        <img height="200px" src=${flags.png} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${name.common}</h5>
          <p class="card-text">
            Population: ${population}
          </p>
          <p class="card-text">
            Region: ${region}
          </p>
          <p class="card-text">
            Capital: ${capital[0]}
          </p>
          <a class="btn btn-secondary" href="country.html?countryName=${name.common}">See more</a>
        </div>
      </div>
    </div>
  `;
}
function getCountryPage({
  name,
  flags,
  altSpellings,
  population,
  region,
  subregion,
  capital,
  tld,
  currencies,
  languages,
  maps
}) {
  console.log(maps.googleMaps);
  return `
    <div class="country row gx-5">
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="p-3">
          <img
            src=${flags.png}
            class="img-fluid"
            alt="..."
          />
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="p-3">
          <h3>${name.common}</h3>
          <div class="country__info row">
            <ul class="col-lg-6 col-md-12 col-sm-12">
              <li>Native Name: <b>${
                altSpellings[2] || altSpellings[1]
              }</b> </li>
              <li>Population: <b>${population}</b></li>
              <li>Region: <b>${region}</b> </li>
              <li>Sub Region: <b>${subregion}</b>  </li>
              <li>Capital: <b>${capital[0]}</b> </li>
            </ul>
            <ul class="col-lg-6 col-md-12 col-sm-12">
              <li>Top Level Domain: <b>${tld[0]}</b> </li>
              <li>Currencies: <b>${Object.values(currencies)[0].name} ( ${Object.values(currencies)[0].symbol} )</b> </li>
              <li>Languages: <b>${Object.values(languages).toString(", ")}</b> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="p-3">
        <a type="button" href=${maps.googleMaps} target="_blank" class="btn btn-outline-secondary">See on map</a>
        </div>
      </div>
    </div>
  `;
}

export { customFetch, getCountryCard, getCountryPage };
