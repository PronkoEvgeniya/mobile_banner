const transCollection = document.querySelectorAll('[data-i18n]');
const langs = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh'];
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const param = window.location.search.slice(-2);
let selectLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
  if (langs.includes(param)) {
    selectLang = param;
  } else if (langs.includes(userLang)) {
    selectLang = userLang;
  }
  fetch(`../assets/localizations/${selectLang}.json`)
    .then((response) => response.json())
    .then((data) => {
      transCollection.forEach((elem) => (elem.textContent = data[elem.dataset.i18n]));
    });
});
