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
  languages
}) {
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19189938.68788181!2d42.59312076257847!3d9.096849335041732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166d5a3f9dba8565%3A0x17c208f02f120efa!2z0K3RgNC40YLRgNC10Y8!5e0!3m2!1sru!2s!4v1709404795579!5m2!1sru!2s"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  `;
}

export { customFetch, getCountryCard, getCountryPage };
