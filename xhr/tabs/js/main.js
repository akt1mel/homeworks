const xhr = new XMLHttpRequest();

const tabs = document.querySelectorAll('nav a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');

console.log(tabs);

xhr.addEventListener('loadstart', () => preloader.classList.remove('hidden'));
xhr.addEventListener('load', onLoad);
xhr.addEventListener('loadend', () => preloader.classList.add('hidden'));
xhr.open("GET", tabs[0].href );
xhr.send();

for (let tab of tabs) {
    tab.addEventListener('click', changeTab);
}

function changeTab(event) {
    event.preventDefault();
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    event.currentTarget.classList.add('active');
    xhr.open('GET', event.currentTarget.href);
    xhr.send();
}


function onLoad() {
    content.innerHTML = xhr.responseText;
}

