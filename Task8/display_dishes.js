"use strict";
import {setupAddButtons} from "./take_dishes.js";
import {loadDishes} from "./loadDishes.js";

export const dishes = loadDishes();

function createDishElement(dish) {
    const dishContainer = document.createElement("div");
    dishContainer.className = "food-point";
    dishContainer.setAttribute ("data-id", dish.id);
    dishContainer.dataset.dish = dish.keyword;

    dishContainer.innerHTML = `
    <img src ="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class"name">${dish.name}</p>
        <div class="info">
            <p class="weight">${dish.count}</p>
                <button class="add-button">Добавить</button>
            </div>
    `;
    return dishContainer;
}

function display_dishes() {
    /*распределяем блюда по категориям и сортируем внутри каждой категории */
    const categorizedDishes = {
        "soup": [],
        "main-course": [],
        "salad": [],
        "drink": [],
        "dessert": []
    };
    /*распределяем блюда по категориям */
    dishes.forEach(dish => {
        if (categorizedDishes[dish.category]) {
            categorizedDishes[dish.category].push(dish);
        }
    });
    /*сортируем каждую категорию по имени */
    Object.keys(categorizedDishes).forEach(category => {
        categorizedDishes[category].sort((dish1, dish2) => 
            dish1.name.localeCompare(dish2.name));
    });
    /*получаем секции для отображения блюд */
    const foodGrid = document.querySelectorAll(".food-grid");
    const foodGrids = {
        "soup": foodGrid[0],
        "main-course": foodGrid[1],
        "salad": foodGrid[2],
        "drink": foodGrid[3],
        "dessert": foodGrid[4]
    };

    Object.keys(categorizedDishes).forEach(category => {
        const section = foodGrids[category];
        if (section) {
            categorizedDishes[category].forEach(dish => {
                const dishElement = createDishElement(dish);
                section.appendChild(dishElement);
            });
        } 
    });
    setupAddButtons();
}


document.addEventListener("DOMContentLoaded", () => {
    window.localStorage.clear();
    display_dishes();
});

