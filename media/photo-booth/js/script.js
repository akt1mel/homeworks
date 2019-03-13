'use strict';

const app = document.querySelector('.app'),
    controls = document.querySelector('.controls'),
    btnTakePhoto = controls.querySelector('#take-photo'),
    errors = document.querySelector('#error-message'),
    listImages = document.querySelector('.list'),
    video = document.createElement('video'),
    audio = document.createElement('audio'),
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

app.appendChild(video);
audio.setAttribute('hidden', 'true');
audio.src = './audio/click.mp3';//

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream => {
    video.srcObject = stream;
    video.play();
    controls.style.display = 'flex';
    btnTakePhoto.addEventListener('click', takePhoto);
}).catch(error => {
    errors.textContent = `Ошибка: ${error.message}`;
    errors.style.display = 'flex';
});

function takePhoto() {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    let dataUrl = canvas.toDataURL();
    let figure = createElement('figure', {}, [
        createElement('img', {src: dataUrl}),
        createElement('figcaption', {}, [
            createElement('a', {
                href: dataUrl,
                download: 'snapshot.png'
            }, [
                createElement('i', {
                    class: 'material-icons'
                }, 'file_download')
            ]),
            createElement('a', {}, [
                createElement('i', {
                    class: 'material-icons'
                }, 'file_upload')
            ]),
            createElement('a', {}, [
                createElement('i', {
                    class: 'material-icons'
                }, 'delete')
            ])
        ])
    ]);

    figure.addEventListener('click', event => {
        switch (event.target.textContent) {
            case 'file_download':
                event.target.style.display = 'none';
                break;
            case 'file_upload':
                uploadPhoto(event.target);
                break;
            case 'delete':
                listImages.removeChild(figure);
                break;
        }
    });

    listImages.insertBefore(figure, listImages.firstChild);

    audio.play();
}

//Загрузка фото в фотопоток
function uploadPhoto(event) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth', true);
    let formData = new FormData();
    canvas.toBlob(blob => {
        formData.append('image', blob);
        xhr.send(formData);
    });

    event.style.display = 'none';
}


//Создание элемента с заданными параметрами
function createElement(tagName, attributes, children) {
    const element = document.createElement(tagName);
    if (typeof attributes === 'object') {
        Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    }
    if (typeof children === 'string') {
        element.textContent = children;
    } else if (children instanceof Array) {
        children.forEach(child => element.appendChild(child));
    }
    return element;
}