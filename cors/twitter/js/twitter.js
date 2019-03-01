'use strict';

const wallpaper = document.querySelector("[data-wallpaper]");
const username = document.querySelector("[data-username]");
const description = document.querySelector("[data-description]");
const pic = document.querySelector("[data-pic]");
const tweets = document.querySelector("[data-tweets]");
const followers = document.querySelector("[data-followers]");
const following = document.querySelector("[data-following]");


function addScript(src) {
    let elem = document.createElement("script");
    elem.src = src;
    document.head.appendChild(elem);
}

addScript('https://neto-api.herokuapp.com/twitter/jsonp?callback=updateProfile')

function updateProfile(profile) {
    wallpaper.src = profile.wallpaper;
    username.textContent = profile.username;
    description.textContent = profile.description;
    pic.src = profile.pic;
    tweets.textContent = profile.tweets;
    followers.textContent = profile.followers;
    following.textContent = profile.following;
}