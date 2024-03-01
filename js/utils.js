function customFetch( url, options ) {
  return new Promise( async ( resolve, reject ) => {
    const params = new URLSearchParams( options?.params )

    const res = await fetch( `${url}?${params}`, { ...options, body: JSON.stringify( options?.body ), headers: { 'Content-Type': 'application/json' } } );

    if ( res.ok ) {
      const data = await res.json();
      resolve( data )
    } else {
      reject( "Error" );
    }
  } )
}

function getCountryCard( { name, flags, population, region, capital, maps } ) {
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
          <p class="card-text">
            On map: <a href=${maps.googleMaps} target="_blank">Click here</a>
          </p>
          <a class="btn btn-primary" href="country.html?countryName=${name.common}">See more</a>
        </div>
      </div>
    </div>
  `
}
function getCountryPage( { name, flags } ) {
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div class="card">
        <img height="200px" src=${flags.png} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${name.common}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
          <a class="btn btn-primary" href="country.html?countryName=${name.common}">See more</a>
        </div>
      </div>
    </div>
  `
}

export { customFetch, getCountryCard }