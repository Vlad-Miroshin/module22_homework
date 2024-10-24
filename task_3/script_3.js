/*

Задание 3

Написать скрипт, который при открытии страницы будет делать следующее:
Если пользователь зашел в первый раз, вывести окно prompt с сообщением: «Добро пожаловать! Назовите, пожалуйста, ваше имя».
После того, как пользователь введет имя, записать имя, дату и время визита в localStorage.
Если пользователь открывает страницу не впервые (это можно узнать по наличию соответствующих записей в localStorage), вывести в alert сообщение вида: «Добрый день, *имя пользователя*! Давно не виделись. 
В последний раз вы были у нас *дата последнего посещения*» и перезаписать дату последнего посещения.
Дату можно вывести в любом удобочитаемом формате (не Timestamp, должен четко читаться день, месяц, год и время — часы и минуты).

*/

import {LastVisit, LastVisitStorage, formatDate, formatTime} from './classes.js';

const lastVisit = LastVisitStorage.getLastVisit();

document.addEventListener('DOMContentLoaded', ()=> {
    function onclick(selector, handler) {
        document.querySelector(selector).onclick = handler;
    }
  
    onclick('#btn-save', (event) => act_save(event));
    onclick('#btn-forget', () => act_forget());

    showState();
});

function showState() {
    const visitor_form = document.querySelector("#visitor_form");
    const visitor_message = document.querySelector("#visitor_message");
    const visitor_header = document.querySelector("#visitor_header");
    const visitor_text = document.querySelector("#visitor_text");

    if (!lastVisit.isEmpty()) {

        const dt = lastVisit.getDate();

        visitor_header.innerHTML = `Здравствуйте, ${lastVisit.getName()}!`;
        visitor_text.innerHTML = `В последний раз вы были у нас ${formatDate(dt)} г. в ${formatTime(dt)}`;

        
        visitor_form.classList.add('page__content--hidden');
        visitor_message.classList.remove('page__content--hidden');

        lastVisit.setNow();
        LastVisitStorage.save(lastVisit);

    } else {

        visitor_message.classList.add('page__content--hidden');
        visitor_form.classList.remove('page__content--hidden');
    }
}


function act_save(event) {
    event.preventDefault();

    const name = document.querySelector("#visitor_name").value;

    lastVisit.setVisit(name === '' ? 'Аноним' : name);
    LastVisitStorage.save(lastVisit);

    showState();
}
  
function act_forget() {
    lastVisit.clear();
    LastVisitStorage.save(lastVisit);

    showState();
}
  
  


