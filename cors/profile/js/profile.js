'use strict';

const name = document.querySelector("[data-name]");
const description = document.querySelector("[data-description]");
const pic = document.querySelector("[data-pic]");
const position = document.querySelector("[data-position]");
const technologies = document.querySelector("[data-technologies]");
const content = document.querySelector('.content');

function addScript(src) {
    let elem = document.createElement("script");
    elem.src = src;
    document.head.appendChild(elem);
}

addScript('https://neto-api.herokuapp.com/profile/me?callback=updateProfile');

function updateProfile(profile) {
    name.textContent = profile.name;
    description.textContent = profile.description;
    pic.src = profile.pic;
    position.textContent = profile.position;
    let id = profile.id;
    addScript(`https://neto-api.herokuapp.com/profile/${id}/technologies?callback=userTechnologies`);
}

function userTechnologies(data) {
    for (let item of data) {
        let spanTag = document.createElement('span');
        technologies.appendChild(spanTag)
        spanTag.classList.add('devicons');
        spanTag.classList.add(`devicons-${item}`);
    }
    content.setAttribute('style', 'display : initial');
}