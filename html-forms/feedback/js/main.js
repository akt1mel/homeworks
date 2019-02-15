'use strict';


const form = document.getElementsByClassName('contentform')[0];
const message = document.getElementById('output');
const inputs = Array.from(form.getElementsByTagName('input'));
const outputs = Array.from(message.getElementsByTagName('output'));

function onInput(event) {
    if (event.currentTarget.name === 'zip') {
        event.currentTarget.value = event.currentTarget.value.replace(/\D/, '');
    }

    for (const output of outputs) {
        if (output.id === event.currentTarget.name) {
            output.value = event.currentTarget.value;
        }
    }
}

for (const input of inputs) {
    input.addEventListener('input', onInput);
}

const mes = form.getElementsByTagName('textarea')[0];
mes.addEventListener('input', onInput);


const subButton = document.querySelector('form > button');
const chanButton = document.querySelector('main > button');

const fieldsets = Array.from(form.getElementsByTagName('fieldset'));
for (const fieldset of fieldsets) {
    fieldset.addEventListener('input', enableSubmitButton);
}


function enableSubmitButton() {
    if(inputs.every(inp => inp.value !== '')){
        subButton.removeAttribute('disabled');
    }else {
        subButton.setAttribute('disabled', true);
    }
}

subButton.addEventListener('click', showMessageBlock);
chanButton.addEventListener('click', showForm);

function showMessageBlock(every) {
    every.preventDefault();
    form.classList.add('hidden');
    message.classList.remove('hidden');
}

function showForm() {
    form.classList.remove('hidden');
    message.classList.add('hidden');
}