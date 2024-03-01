import { ENDPOINT } from "./const.js";
import { customFetch } from "./utils.js";

const countryRow = document.querySelector(".country-row")

const query = new URLSearchParams( location.search );

let countryName = query.get( 'countryName' );

async function getCountry() {
  try {
    const { data } = await customFetch( `${ENDPOINT}name/${countryName}` );
    console.log( data );
  } catch ( err ) {

  }
}

getCountry()