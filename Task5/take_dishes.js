
function getDishesCategory(keyword) {
    const dish = dishes.find(d => d.keyword === keyword);
    return dish ? dish.category : undefined;
}

function getDishesPrice(keyword) {
    const dish = dishes.find(d =>d.keyword === keyword);
    return dish ? dish.price : undefined;
}

function updateOrderCategory (dish, category, displayName, inputId) {
    const orderCategory = 
    document.querySelector(`.order-item-${category.replace("_", "-")}`);
    orderCategory.innerHTML = `
        <p><b>${displayName}</b></p>
        <p>${dish.name} ${dish.price}₽</p>
    `;
    // Обновляем скрытое поле формы
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
    case "beverages":
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
    case "beverages":
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

    // Проверяем категории на наличие выбранных блюд
    ["soup", "main_course", "beverages", "salad", 
        "dessert"].forEach(category => {
        if (!selectedDishes[category]) {
            const orderCategory =
            document.querySelector(`.order-item-${category.replace("_", "-")}`);
            orderCategory.innerHTML = `
                <p><b>${getEmptyNameCategory(category)}</b></p>
                <p>${getEmptyMessage(category)}</p>
            `;
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

function addToOrder(dish) {
    let orderItemsNot = document.querySelector(".order-items-not");
    let orderItems = document.querySelector(".order-items");
    orderItemsNot.style.display = "none";
    orderItems.style.display = "block";

    if (dish.category === "soup") {
        updateOrderCategory(dish, "soup", "Суп", "input-soup");
    } else if (dish.category === "main_course") {
        updateOrderCategory(dish, "main_course", 
            "Главное блюдо", "input-main-course");
    } else if (dish.category === "beverages") {
        updateOrderCategory(dish, "beverages", "Напиток", "input-beverage");
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
        buttons_beverages: foodGrids[3],
        buttons_dessert: foodGrids[4],
    };

    Object.keys(categoryMap).forEach(buttonGroupId => {
        const categoryButtons = document
            .getElementById(buttonGroupId)
            .querySelectorAll(".category_item");

        const foodGrid = categoryMap[buttonGroupId];
        listenerCategoryButtons(categoryButtons, foodGrid);
    });
}


function setupAddButtons() {
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


