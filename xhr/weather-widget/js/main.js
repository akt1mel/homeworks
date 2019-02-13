const request = new XMLHttpRequest();

request.addEventListener('load', onLoad);
request.addEventListener('error', onError);
request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();

function onLoad() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  } else {
    console.log(`Ответ ${request.status}: ${request.statusText}`);
  }
}

function onError() {
  console.log('Произошла ошибка при загрузке данных');
}