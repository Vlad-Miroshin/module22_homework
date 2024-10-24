/*

Задание 4

Создать Promise, в котором c задержкой в три секунды сгенерировать случайное целое число от 1 до 100. Для создания задержки использовать setTimeout. Если сгенерированное число четное — Promise выполнится успешно (resolve), если нечетное — выполнится с ошибкой (reject). После разрешения Promise обработать результат его выполнения и вывести сообщение в консоль:
«Завершено успешно. Сгенерированное число — number», если Promise завершился успешно. Вместо number подставить сгенерированное число
«Завершено с ошибкой. Сгенерированное число — number», если Promise завершился с ошибкой. Вместо number подставить сгенерированное число

*/

const DELAY_MILLISECONDS = 3000;

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function isEven(value) {
    return value % 2 === 0;
}

console.log(`Ожидание выполнения promise (${DELAY_MILLISECONDS} мсек)...`);

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const number = getRandomInt(1, 100);

        if (isEven(number)) {
            resolve(`Завершено успешно. Сгенерированное число — ${number}`);
        } else {
            reject(`Завершено с ошибкой. Сгенерированное число — ${number}`);
        }
    }, DELAY_MILLISECONDS);
  });
  
  promise.then((value) => {

    console.log(value);

  }).catch((value) => {

    console.log(value);

  });


