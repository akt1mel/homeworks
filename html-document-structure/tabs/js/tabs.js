'use strict';

const content = document.querySelector('.tabs-content');
const nav = document.querySelector('.tabs-nav');

Array.from(content.children).forEach(article => {
    const tab = nav.firstElementChild.cloneNode(true);
    nav.appendChild(tab);
    const navTab = nav.lastElementChild;
    navTab.firstElementChild.textContent = article.dataset.tabTitle;
    navTab.firstElementChild.classList.add(article.dataset.tabIcon);
    article.classList.add('hidden');

});

nav.removeChild(nav.firstElementChild);

Array.from(nav.children).forEach(currentTab => currentTab.addEventListener('click', showContent));

function showContent(event) {
    Array.from(nav.children).forEach(currentNav => currentNav.classList.remove('ui-tabs-active'));
    event.currentTarget.classList.add('ui-tabs-active');
    Array.from(content.children).forEach(article => {
        article.classList.add('hidden');
        if (event.target.textContent === article.dataset.tabTitle) {
            article.classList.remove('hidden');
        }
    })
}

nav.firstElementChild.classList.add('ui-tabs-active');
content.children[0].classList.remove('hidden');