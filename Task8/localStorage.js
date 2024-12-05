"use strict";

const STORAGE_KEY = "selectedDishes";

export function getSelectedDishes() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
}

export function setSelectedDishes(dishes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
}

export function addDish(category, dishId) {
    const dishes = getSelectedDishes();
    dishes[category] = dishId;
    setSelectedDishes(dishes);
}

export function removeDish(category) {
    const dishes = getSelectedDishes();
    delete dishes[category];
    setSelectedDishes(dishes);
}

export function clearLocalStorage() {
    localStorage.removeItem("selectedDishes");
}
