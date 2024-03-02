import { ENDPOINT, LIMIT } from "./const.js";
import { customFetch, getCountryCard } from "./utils.js";

const countriesRow = document.querySelector(".countries-row");
const searchInput = document.querySelector(".search-input");
const pagination = document.querySelector(".pagination");
const countriesNumber = document.querySelector(".countries-total");
const selectFilter = document.querySelectorAll(".dropdown-item");

let paginationItems;

let search = "";
let activePage = 1;
let filtered = "All";

async function getCountries() {
  try {
    countriesRow.innerHTML = "...Loading";

    let countries, totalCountries;

    const params = { page: activePage, limit: LIMIT };

    if (search) {
      const { data, total } = await customFetch(`${ENDPOINT}name/${search}`, {
        params,
      });
      countries = data;
      totalCountries = total;
    } else if (filtered !== "All") {
      const { data, total } = await customFetch(
        `${ENDPOINT}region/${filtered}`,
        {
          params,
        }
      );
      countries = data;
      totalCountries = total;
    } else {
      const { data, total } = await customFetch(`${ENDPOINT}all`, { params });
      countries = data;
      totalCountries = total;
    }

    countriesNumber.textContent = totalCountries;
    const pages = Math.ceil(totalCountries / LIMIT) || 0;

    if (pages > 1) {
      pagination.innerHTML = `<li class="page-item ${
        activePage === 1 ? "disabled" : ""
      }"><button class="page-link">&laquo;</button></li>`;

      if (activePage === pages) {
        for (let i = -2; i <= 0; i++) {
          let j = activePage + i;
          pagination.innerHTML += `<li class="page-item ${
            j === activePage ? "active" : ""
          }"><button class="page-link">${j}</button></li>`;
        }
      } else if (activePage === 1) {
        for (let i = 0; i <= 2; i++) {
          let j = activePage + i;
          pagination.innerHTML += `<li class="page-item ${
            j === activePage ? "active" : ""
          }"><button class="page-link">${j}</button></li>`;
        }
      } else {
        for (let i = -1; i <= 1; i++) {
          let j = activePage + i;
          pagination.innerHTML += `<li class="page-item ${
            j === activePage ? "active" : ""
          }"><button class="page-link">${j}</button></li>`;
        }
      }

      pagination.innerHTML += `<li class="page-item ${
        activePage === pages ? "disabled" : ""
      }"><button class="page-link">&raquo;</button></li>`;
    } else {
      pagination.innerHTML = "";
    }

    countriesRow.innerHTML = "";

    console.log(countries);

    countries.map((country) => {
      countriesRow.innerHTML += getCountryCard(country);
    });

    paginationItems = document.querySelectorAll(".page-link");

    paginationItems.forEach((item, i) => {
      if (i === 0) {
        item.addEventListener("click", () => {
          activePage = 1;
          getCountries();
        });
      } else if (i === paginationItems.length - 1) {
        item.addEventListener("click", () => {
          activePage = pages;
          getCountries();
        });
      } else {
        item.addEventListener("click", (e) => {
          activePage = +e.target.innerText;
          getCountries();
        });
      }
    });
  } catch (err) {
    countriesRow.innerHTML = "Error";
    pagination.innerHTML = "";
  }
}

getCountries();

searchInput.addEventListener("keyup", function () {
  search = this.value;
  getCountries();
});

selectFilter.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.target;
    filtered = e.target.innerText;
    // console.log(e.target.innerText);
    console.log(filtered);
    getCountries();
  });
});
