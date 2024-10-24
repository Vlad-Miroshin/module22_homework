/*

Задание 2

Дан образец JSON-строки.
Задача — создать JS-объект, который при преобразовании в JSON будет возвращать в качестве результата такую же JSON-строку, как в образце. 
Получившуюся строку вывести в консоль.

{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}

*/

const sample = '{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}';

// Решение

const obj = {
    name: "Anton",
    age: 36,
    skills: ["Javascript", "HTML", "CSS"],
    salary: 80_000
};

// проверка

const jsonText = JSON.stringify(obj);

console.log(jsonText);
console.log(jsonText === sample ? 'Удовлетворяет требованиям' : 'fail');