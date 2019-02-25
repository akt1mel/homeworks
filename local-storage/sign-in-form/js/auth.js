'use strict';

const signIn = document.querySelector('.sign-in-htm');
const signUp = document.querySelector('.sign-up-htm');

signIn.addEventListener('submit', function(event){
    event.preventDefault();
    const formData = {
        'email': document.querySelector('.sign-in-htm #email').value,
        'password': document.querySelector('.sign-in-htm #pass').value,
        'isPermanent': document.querySelector('.sign-in-htm #check').value
    };
    const output = document.querySelector('.sign-in-htm .error-message');
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', (e) => {
        let data = JSON.parse(xhr.response);
        if (data.error){
            output.value = data.message;
        }else{
            let outputMessage = 'Пользователь ' + data.name + ' успешно авторизован';
            output.value = outputMessage;
        }
    });
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(formData));
});

signUp.addEventListener('submit', function(event){
    event.preventDefault();
    const output = document.querySelector('.sign-up-htm .error-message');

    const formData = {
        'email': document.querySelector('.sign-up-htm [name="email"]').value,
        'password':  document.querySelector('.sign-up-htm [name="password"]').value,
        'passwordcopy':  document.querySelector('.sign-up-htm [name="passwordcopy"]').value,
        'name': document.querySelector('.sign-up-htm [name="name"]').value
    };
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', (e) => {
        let data = JSON.parse(xhr.response);
        if (data.error){
            output.value = data.message;
        }else{
            let outputMessage = 'Пользователь ' + data.name + ' успешно зарегистрирован';
            output.value = outputMessage;
        }
    });
    xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(formData));

});