"use strict";

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

        // Получение значений выбранных блюд
        const selectedItems = {
            soup: document.getElementById("input-soup").value,
            mainCourse: document.getElementById("input-main-course").value,
            salad: document.getElementById("input-salad").value,
            dessert: document.getElementById("input-dessert").value,
            beverage: document.getElementById("input-beverage").value,
        };

        // Логика проверки на соответствие одному из вариантов ланча
        const { soup, mainCourse, salad, dessert, beverage } = selectedItems;

        if (!soup && !mainCourse && !salad && !dessert && !beverage) {
            showPopup("Ничего не выбрано. Выберите блюда для заказа");
        } else if (!beverage) {
            showPopup("Выберите напиток");
        } else if (soup && !mainCourse && !salad) {
            showPopup("Выберите главное блюдо/салат/стартер");
        } else if (salad && !soup && !mainCourse) {
            showPopup("Выберите суп или главное блюдо");
        } else if ((dessert || beverage) && !soup && !mainCourse && !salad) {
            showPopup("Выберите главное блюдо");
        } else {
            // Если все проверки пройдены, отправляем форму
            document.querySelector("form").submit();
        }
    });
}

