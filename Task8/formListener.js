"use strict";

import {loadDishes} from "./loadDishes.js";

export const dishes = loadDishes();

function getEmptyMessage(category) {
    switch (category) {
        case "soup":
            return "Блюдо не выбрано";
        case "main_course":
            return "Блюдо не выбрано";
        case "drink":
            return "Напиток не выбран";
        default:
            return "Ничего не выбрано";
    }
}

function getEmptyNameCategory(category) {
    switch (category) {
        case "soup":
            return "Суп";
        case "main_course":
            return "Главное блюдо";
        case "drink":
            return "Напиток";
        case "salad":
            return "Салат или стартер";
        case "dessert":
            return "Десерт";
    }
    return undefined;
}

export function updateTotal() {
    let totalSum = 0;
    const selectedDishes = {};

    const selectedItems = {
        soup: document.getElementById("input-soup").value,
        mainCourse: document.getElementById("input-main-course").value,
        salad: document.getElementById("input-salad").value,
        dessert: document.getElementById("input-dessert").value,
        drink: document.getElementById("input-drink").value,
    };

    // Считаем общую стоимость и собираем выбранные блюда
    document.querySelectorAll(".food-point").forEach(point => {
        const keyword = point.getAttribute("data-dish");
        console.log(keyword);
        const dish = dishes.find(d => d.keyword === keyword);
        if (dish) {
            totalSum += dish.price;
            console.log(totalSum);
            selectedDishes[dish.category] = dish;
        }
    });

    if (totalSum > 0) {
        const orderItems = document.querySelector(".order-items");
        const orderItemsNot = document.querySelector(".order-items-not");
        orderItems.style.display = "block";
        orderItemsNot.style.display = "none";
    }
    else {
        const notSelected = document.querySelector(".not-selected");
        const orderItems = document.querySelector(".order-items");
        const orderItemsNot = document.querySelector(".order-items-not");
        notSelected.style.display = "block";
        orderItems.style.display = "none";
        orderItemsNot.style.display = "block";
    }

    // Проверяем категории на наличие выбранных блюд
    ["soup", "main_course", "drink", "salad",
        "dessert"].forEach(category => {
        if (!selectedDishes[category]) {
            const orderCategory =
                document.querySelector(`.order-item-${category.replace("_", "-")}`);
            orderCategory.innerHTML = `
                <p><b>${getEmptyNameCategory(category)}</b></p>
                <p>${getEmptyMessage(category)}</p>
            `;
        }
        if (window.localStorage.getItem(category.replace("_", "-"))) {
            dishes.forEach(dish => {
               if (window.localStorage.getItem(category.replace("_", "-")) === `${dish.id}`) {
                   const orderCategory =
                       document.querySelector(`.order-item-${category.replace("_", "-")}`);
                   orderCategory.innerHTML = `
                    <p><b>${getEmptyNameCategory(category)}</b></p>
                    <p>${dish.name} ${dish.price}₽</p>
                    `;
                   document.getElementById(`input-${category.replace("_", "-")}`).value = dish.id;
               }
            });
        }
        else {
            document.getElementById(`input-${category.replace("_", "-")}`).value = null;
        }
    });

    // Обновляем блок с общей стоимостью
    const orderCostElement = document.querySelector(".order-item-coast");
    if (totalSum > 0) {
        orderCostElement.style.display = "block";
        orderCostElement.innerHTML = `
            <p><b>Стоимость заказа</b></p>
            <p class="coast">${totalSum}₽</p>
        `;
    } else {
        orderCostElement.style.display = "none";
    }
}

async function sendForm(formData) {
    const api = "https://edu.std-900.ist.mospolytech.ru";
    const api_key = "f3c7705f-bfab-4af2-846b-aafbaee9a067";
    const url = `${api}/labs/api/orders?api_key=${api_key}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        showPopup("Заказ успешно создан!");
        window.localStorage.clear();
        const notSelected = document.querySelector(".not-selected");
        const orderItems = document.querySelector(".order-items");
        const orderItemsNot = document.querySelector(".order-items-not");
        notSelected.style.display = "block";
        orderItems.style.display = "none";
        orderItemsNot.style.display = "block";
        document.querySelector(".food-grid").innerHTML = "";

    } catch (error) {
        showPopup(`Ошибка при оформлении заказа: ${error}`, "error");
    }
}

export function showPopup(message) {
    // Создание наложения
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    // Создание самого всплывающего окна
    const popup = document.createElement("div");
    popup.classList.add("popup");

    // Добавление текста уведомления
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;

    // Создание кнопки "Окей"
    const closeButton = document.createElement("button");
    closeButton.textContent = "Окей";
    closeButton.classList.add("popup-button");

    // Удаление всплывающего окна при нажатии на кнопку
    closeButton.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    // Сборка всплывающего окна
    popup.appendChild(messageParagraph);
    popup.appendChild(closeButton);
    overlay.appendChild(popup);

    // Добавление окна на страницу
    document.body.appendChild(overlay);
}

export function formControl() {
    const submitButton = document.getElementById("form-button");
    // Обработчик клика для кнопки отправки формы
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementById("order-form"));

        // Получение значений выбранных блюд
        const selectedItems = {
            soup: document.getElementById("input-soup").value,
            mainCourse: document.getElementById("input-main-course").value,
            salad: document.getElementById("input-salad").value,
            dessert: document.getElementById("input-dessert").value,
            drink: document.getElementById("input-drink").value,
        };

        // Логика проверки на соответствие одному из вариантов ланча
        const { soup, mainCourse, salad, dessert, drink } = selectedItems;

        if (!soup && !mainCourse && !salad && !dessert && !drink) {
            showPopup("Ничего не выбрано. Выберите блюда для заказа");
        } else if (!drink) {
            showPopup("Выберите напиток");
        } else if (soup && !mainCourse && !salad) {
            showPopup("Выберите главное блюдо/салат/стартер");
        } else if (salad && !soup && !mainCourse) {
            showPopup("Выберите суп или главное блюдо");
        } else if ((dessert || drink) && !soup && !mainCourse && !salad) {
            showPopup("Выберите главное блюдо");
        } else {
            sendForm(formData).then();
        }
    });
}
