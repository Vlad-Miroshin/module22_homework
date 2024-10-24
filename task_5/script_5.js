/*

Задание 5

Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». При нажатии на кнопку нужно отправить запрос с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. 

Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом<

Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с введенным id не существует, вывести сообщение: «Пользователь с указанным id не найден».

*/

document.addEventListener('DOMContentLoaded', ()=> {
    function onclick(selector, handler) {
        document.querySelector(selector).onclick = handler;
    }
  
    onclick('#btn_fetch', (event) => act_fetch(event));
});


const response_container = document.querySelector('#response_container');
const ul = document.querySelector('.response__list');

function act_fetch(event) {
    event.preventDefault();

    let id = document.querySelector("#user_id").value;
    if (!id) {
        id = '1'; // default user id
    }

    const url = `https://jsonplaceholder.typicode.com/users/${id}/todos`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateResponse(data, id);
        });
}

function clearResponse() {
    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    };
}

function addItem(text, className = '') {
    const li = document.createElement("li");
    li.innerText = text;

    if (className) {
        li.classList.add(className);
    }

    ul.appendChild(li);
}

function hideResponse() {
    response_container.classList.add('page__content--hidden');
}

function showResponse() {
    response_container.classList.remove('page__content--hidden');
}

function updateResponse(data, id) {
    hideResponse();

    clearResponse();

    if (!data || data.length === 0) {
        addItem(`Пользователь с id=${id} не найден `);
    } else {
        data.forEach(element => {
            addItem(element.title, element.completed ? 'response__list--completed' : '');
        });
    }

    showResponse();
}
