"use strict";

export function displayMessage(content) {
    const background = document.createElement("div");
    background.className = "notification-overlay";
    const container = document.createElement("div");
    container.className = "notification-container";
    const messageText = document.createElement("div");
    messageText.className = "notification-text";
    messageText.textContent = content;
    const closeButton = document.createElement("button");
    closeButton.textContent = "Окей";
    closeButton.addEventListener("click", () => {
        background.remove();
    });

    container.append(messageText);
    container.append(closeButton);
    background.append(container)
    document.body.appendChild(background);
}

export function validateForm() {
    document.getElementById("form-button").addEventListener("click", (e) => {
        e.preventDefault();

        const formInputs = {
            soup: document.querySelector("#input-soup").value.trim(),
            main: document.querySelector("#input-main-course").value.trim(),
            salad: document.querySelector("#input-salad").value.trim(),
            dessert: document.querySelector("#input-dessert").value.trim(),
            drink: document.querySelector("#input-beverage").value.trim(),
        };

        const hasSelection = Object.values(formInputs).some(value => value !== "");

        if (!hasSelection) {
            displayMessage("Ничего не выбрано. Выберите блюда для заказа");
            return;
        }
        if (formInputs.dessert && !(formInputs.main || formInputs.salad || formInputs.soup || formInputs.drink)) {
            displayMessage("Выберите главное блюдо");
            return;
        }
        if (!formInputs.drink) {
            displayMessage("Выберите напиток");
            return;
        }
        if (!formInputs.main && !formInputs.salad && formInputs.soup) {
            displayMessage("Выберите главное блюдо/салат/стартер");
            return;
        }
        if (!formInputs.main && !formInputs.soup && formInputs.salad) {
            displayMessage("ыберите суп или главное блюдо");
            return;
        }
        if (!formInputs.main && !formInputs.soup && (formInputs.dessert || formInputs.drink)) {
            displayMessage("Выберите главное блюдо");
            return;
        }
        document.querySelector("form").submit();
    });
}
