const transCollection = document.querySelectorAll('[data-i18n]');
const langs = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh'];
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const param = window.location.search.slice(-2);
const packMounth = document.querySelector('.pack-mounth');
const packAny = document.querySelector('.pack-any');
const continueBtn = document.querySelector('.continue_btn');
let selectLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
  if (langs.includes(param)) {
    selectLang = param;
  } else if (langs.includes(userLang)) {
    selectLang = userLang;
  }
  if (selectLang === 'ru' || selectLang === 'es' || selectLang === 'fr' || selectLang === 'nl') {
    document.querySelector('.title').style.padding = '100px 40px 0';
    document.querySelector('.title').style.fontSize = '25px';
  } else if (selectLang === 'ja') {
    document.querySelector('.links').style.fontSize = '8px';
    document.querySelector('.title').style.fontSize = '25px';
  }
  fetch(`../assets/localizations/${selectLang}.json`)
    .then((response) => response.json())
    .then((data) => {
      transCollection.forEach((elem) => (elem.textContent = data[elem.dataset.i18n]));
    });
});

document.addEventListener('click', () => {
  if (event.target.classList.contains('pack-mounth')) {
    packAny.classList.remove('pack-active');
    packMounth.classList.add('pack-active');
    continueBtn.setAttribute('href', 'https://apple.com/');
  } else if (event.target.classList.contains('pack-any')) {
    packMounth.classList.remove('pack-active');
    packAny.classList.add('pack-active');
    continueBtn.setAttribute('href', 'https://google.com/');
  }
});
