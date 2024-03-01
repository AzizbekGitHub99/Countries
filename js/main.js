import { ENDPOINT, LIMIT } from "./const.js";
import { customFetch, getCountryCard } from "./utils.js";

const countriesRow = document.querySelector( '.countries-row' );
const searchInput = document.querySelector( '.search-input' );
const pagination = document.querySelector( '.pagination' );
const countriesNumber = document.querySelector( '.countries-total' );

let paginationItems;

let search = '';
let activePage = 1;

async function getCountries() {
  try {
    countriesRow.innerHTML = "...Loading";

    let countries, totalCountries;

    const params = { page: activePage, limit: LIMIT }

    if ( search ) {
      const { data, total } = await customFetch( `${ENDPOINT}name/${search}`, { params } );
      countries = data;
      totalCountries = total;
    } else {
      const { data, total } = await customFetch( `${ENDPOINT}all`, { params } )
      countries = data;
      totalCountries = total;
    }

    countriesNumber.textContent = totalCountries;
    const pages = Math.ceil( totalCountries / LIMIT );

    pagination.innerHTML = `<li class="page-item ${activePage === 1 ? 'disabled' : ''}"><button class="page-link">Previous</button></li>`

    for ( let i = 1; i <= pages; i++ ) {
      pagination.innerHTML += `<li class="page-item ${i === activePage ? 'active' : ''}"><button class="page-link">${i}</button></li>`
    }

    pagination.innerHTML += `<li class="page-item ${activePage === pages ? 'disabled' : ''}"><button class="page-link">Next</button></li>`

    countriesRow.innerHTML = "";

    console.log( countries );

    countries.map( country => {
      countriesRow.innerHTML += getCountryCard( country )
    } )

    paginationItems = document.querySelectorAll( '.page-link' );

    paginationItems.forEach( ( item, i ) => {
      if ( i === 0 ) {
        item.addEventListener( 'click', () => { getPage( '-' ) } )
      } else if ( i === paginationItems.length - 1 ) {
        item.addEventListener( 'click', () => { getPage( '+' ) } )
      } else {
        item.addEventListener( 'click', () => { getPage( i ) } )
      }
    } )

  } catch ( err ) {
    countriesRow.innerHTML = "Error";
    pagination.innerHTML = "";
  }
}

getCountries();


function getPage( i ) {
  if ( i === '+' ) {
    activePage++;
  } else if ( i === '-' ) {
    activePage--;
  } else {
    activePage = i;
  }
  getCountries();
}


searchInput.addEventListener( 'keyup', function () {
  search = this.value;
  getCountries();
} )
