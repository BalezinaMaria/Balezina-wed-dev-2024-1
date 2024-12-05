"use strict";

import {loadDishes} from "./loadDishes.js";
import {updateTotal} from "./formListener.js";
import {formControl} from "./formListener.js";

export const dishes = loadDishes();

function deleteButtons() {
    const deleteBtns = document.querySelectorAll(".delete-button");
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", (event) => {
            console.log(event);
            deleteBtn.closest(".food-point").remove();
            window.localStorage.removeItem(deleteBtn.closest(".food-point").getAttribute("data-category"));
            updateTotal();
        });
    });
}

function createDishElement(dish) {
    const dishContainer = document.createElement("div");
    dishContainer.className = "food-point";
    dishContainer.setAttribute ("data-id", dish.id);
    dishContainer.dataset.dish = dish.keyword;
    dishContainer.setAttribute("data-category", dish.category);

    dishContainer.innerHTML = ` 
    <img src ="${dish.image}" alt="${dish.name}"> 
        <p class="price">${dish.price}₽</p> 
        <p class"name">${dish.name}</p> 
        <div class="info"> 
            <p class="weight">${dish.count}</p> 
                <button class="delete-button">Удалить</button> 
            </div> 
    `;
    return dishContainer;
}

function display_dishes() {

    const section = document.querySelector(".food-grid")
    dishes.forEach(dish => {
        if (window.localStorage.getItem(dish.category) === `${dish.id}`) {
            console.log(window.localStorage.getItem(dish.category), dish.id);
            const dishElement = createDishElement(dish);
            section.appendChild(dishElement);
        }
    });
    deleteButtons();
    updateTotal();
    // setupAddButtons();
}

display_dishes();
formControl();