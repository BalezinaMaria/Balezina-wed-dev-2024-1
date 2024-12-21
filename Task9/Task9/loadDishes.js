"use strict";
export function loadDishes() {
    let dishes = [];
    // Создаем новый XMLHttpRequest
    const xhr = new XMLHttpRequest();
    // Открываем GET-запрос
    xhr.open('GET', 
        'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes', false);
    // Обработчик загрузки данных
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                dishes = JSON.parse(xhr.responseText); // Парсим JSON-ответ
            } catch (e) {
                console.error('Ошибка парсинга данных:', e.message);
            }
        }
        else {
            console.error(`Ошибка загрузки: ${xhr.status} ${xhr.statusText}`);
        }
    };
    // Обработчик ошибок сети
    xhr.onerror = function () {
        console.error('Ошибка сети или проблема с сервером');
    };
    // Отправляем запрос
    xhr.send();
    return dishes; 
}
