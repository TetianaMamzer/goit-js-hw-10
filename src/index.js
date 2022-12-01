import './css/styles.css';
import countri from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const refs = {
  input: document.querySelector('input'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

 refs.input.addEventListener('input', debounce(onInpute, DEBOUNCE_DELAY));


function onInpute(e) {
 const name = e.target.value.trim();
 if (name === '') {
  clearInput();
  return;

 }
 countri.fetchCountries(name)
 .then(renderCountry)
 .catch(onCatch)
};

 function renderCountry(country) {
  clearInput();
  console.log(country)
 if (country.length >= 11) {

  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
return; 
} else if (country.length === 1) {
  
  const aboutCountries = country.map(({name, capital, population, flags, languages}) => {
    let lang = ''
    for (let key in languages) {
      lang = languages[key];
  }
    return `

    <div class="country-info">
    <ul class="country-list"><li class="country-name"><img src="${flags.svg}" alt="flag" width='20' height ='15' >${name.official}</li></ul>
    <p>Сapital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${lang}</p>
    </div>
    `;
  }).join("");
  refs.info.insertAdjacentHTML('beforeend', aboutCountries);
  return;
 } else {

  const listName = country.map(({name, flags}) => {
    return `
    <li><img src="${flags.svg}" alt="flag" width='20' height ='15' >${name.official}</li>
    `;
  }).join("");

 console.log(listName)
 refs.list.insertAdjacentHTML('beforeend', listName);
}
 };


 function onCatch(error) {
  if (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
 };

 function clearInput() {
  refs.list.innerHTML = "";
  refs.info.innerHTML = "";
 };