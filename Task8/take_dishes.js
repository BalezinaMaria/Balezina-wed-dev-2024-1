"use strict";
import {dishes} from "./display_dishes.js"

function getDishesCategory(keyword) {
    const dish = dishes.find(d => d.keyword === keyword);
    return dish ? dish.category : undefined;
}

function getDishesPrice(keyword) {
    const dish = dishes.find(d =>d.keyword === keyword);
    return dish ? dish.price : undefined;
}

function updateOrderCategory (dish, category, displayName, inputId) {
    const inputForm = document.getElementById(inputId);
    inputForm.value = dish.keyword;

    // Снимаем выделение со всех блюд в этой категории
    document.querySelectorAll(".food-point").forEach(point => {
        const pointDish = 
        dishes.find(d => d.keyword === point.getAttribute("data-dish"));
        if (pointDish && pointDish.category === category) {
            point.classList.remove("selected");
        }
    });

    // Добавляем выделение для текущего блюда
    document.querySelector(
        `[data-dish="${dish.keyword}"]`).classList.add("selected");
}

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

function updateTotal() {
    let totalSum = 0;
    const selectedDishes = {};

    // Считаем общую стоимость и собираем выбранные блюда
    document.querySelectorAll(".food-point.selected").forEach(point => {
        const keyword = point.getAttribute("data-dish");
        const dish = dishes.find(d => d.keyword === keyword);
        if (dish) {
            totalSum += dish.price;
            selectedDishes[dish.category] = dish;
        }
    });

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
    const checkoutButton = document.querySelector(".checkout-button");

    if (!soup && !mainCourse && !salad && !dessert && !drink) {
        // ...
    } else if (!drink) {
        // ...
    } else if (soup && !mainCourse && !salad) {
        // ...
    } else if (salad && !soup && !mainCourse) {
        // ...
    } else if ((dessert || drink) && !soup && !mainCourse && !salad) {
        // ...
    } else {
        checkoutButton.style.pointerEvents = "auto";
        checkoutButton.style.backgroundColor = "#555555";
    }

    const totalCost = document.querySelector(".total-cost");
    const totalSumContainer = document.getElementById("total-sum");
    if (totalSum > 0) {
        totalCost.style.display = "flex";
        totalSumContainer.innerHTML = `
            Итого: ${totalSum}&#x20bd;
        `;
    }
}

function addToOrder(dish) {
    window.localStorage.setItem(dish.category, dish.id);
    //console.log(dish.category, dish.id);
    if (dish.category === "soup") {
        updateOrderCategory(dish, "soup", "Суп", "input-soup");
    } else if (dish.category === "main-course") {
        updateOrderCategory(dish, "main-course",
            "Главное блюдо", "input-main-course");
    } else if (dish.category === "drink") {
        updateOrderCategory(dish, "drink", "Напиток", "input-drink");
    } else if (dish.category === "salad") {
        updateOrderCategory(dish, "salad", "Салат или стартер", "input-salad");
    } else if (dish.category === "dessert") {
        updateOrderCategory(dish, "dessert", "Десерт", "input-dessert");
    }
    updateTotal();
}

function removeActiveClassFromButtons(buttons) {
    buttons.forEach(button => {
        button.classList.remove("active");
    });
}

function sortFoodItems(foodGrid, kind) {
    const foodItems = foodGrid.querySelectorAll(".food-point");
    foodItems.forEach(foodItem => {
        const keyword = foodItem.getAttribute("data-dish");
        const dish = dishes.find(d => d.keyword === keyword);
        if (dish && dish.kind !== kind) {
            foodItem.style.display = "none";
        } else {
            foodItem.style.display = "flex";
        }
    });
}

function unSortFoodItems(foodGrid) {
    const foodItems = foodGrid.querySelectorAll(".food-point");
    foodItems.forEach(foodItem => {
        foodItem.style.display = "flex";
    });
}

function listenerCategoryButtons(categoryButtons, foodGrid) {
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isActive = button.classList.contains("active");

            if (isActive) {
                button.classList.remove("active");
                unSortFoodItems(foodGrid);
            } else {
                removeActiveClassFromButtons(categoryButtons);
                button.classList.add("active");

                const kind = button.getAttribute("data-kind");
                sortFoodItems(foodGrid, kind);
            }
        });
    });
}

function setupCategoryButtons() {
    const foodGrids = document.querySelectorAll(".food-grid");

    const categoryMap = {
        buttons_soup: foodGrids[0],
        buttons_main: foodGrids[1],
        buttons_salad: foodGrids[2],
        buttons_drink: foodGrids[3],
        buttons_dessert: foodGrids[4],
    };

    Object.keys(categoryMap).forEach(buttonGroupId => {
        const categoryButtons = document.querySelectorAll(".category_item");

        const foodGrid = categoryMap[buttonGroupId];
        listenerCategoryButtons(categoryButtons, foodGrid);
    });
}


export function setupAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", event => {
            const dish_keyword = 
            event.target.closest(".food-point").getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dish_keyword);

            if (dish) {
                addToOrder(dish);
            }
        });
    });
    setupCategoryButtons();
}

