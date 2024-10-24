document.addEventListener('DOMContentLoaded', ()=> {
    function onclick(selector, handler) {
        document.querySelector(selector).onclick = handler;
    }
  
    onclick('.sample__button', () => act_fetch());
});


const response_container = document.querySelector('#response_container');
const ul = document.querySelector('.response__list');

function act_fetch() {
    hideResponse();

    clearResponse();

    addItem(`Размер экрана - ширина: ${window.screen.width} px, высота: ${window.screen.height} px`);

    if ("geolocation" in navigator && navigator.geolocation) {
        addItem('Браузер поддерживает определение местоположения');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { coords } = position;
                addItem(`Местоположение - широта: ${coords.latitude} °, долгота: ${coords.longitude} °`);
            },
            () => {
                addItem('Информация о местоположении недоступна');
            }
        );        

      } else {
        addItem('Браузер не поддерживает определение местоположения');
    }    

    showResponse();
}

function clearResponse() {
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    };
}

function addItem(text) {
    const li = document.createElement("li");
    li.innerText = text;
    ul.appendChild(li);
}

function hideResponse() {
    response_container.classList.add('page__content--hidden');
}

function showResponse() {
    response_container.classList.remove('page__content--hidden');
}

function updateResponse(data) {
    hideResponse();

    clearResponse();

    data.forEach(element => {
        addItem(element);
    });

    showResponse();
}

function getData() {
    let d = [];

    d.push(`Размер экрана - ширина: ${window.screen.width}px, высота: ${window.screen.height}px`);

    if ("geolocation" in navigator && navigator.geolocation) {
        d.push('Браузер поддерживает определение местоположения');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { coords } = position;
                d.push(`Местоположение - широта: ${coords.latitude}, долгота: ${coords.longitude}`);
            },
            () => {
                d.push('Информация о местоположении недоступна');
            }
        );        

      } else {
        d.push('Браузер не поддерживает определение местоположения');
    }    

    return d;
}