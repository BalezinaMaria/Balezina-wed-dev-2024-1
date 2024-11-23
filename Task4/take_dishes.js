

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
    ["soup", "main_course", "beverages"].forEach(category => {
        if (!selectedDishes[category]) {
            const orderCategory =
            document.querySelector(`.order-item-${category.replace("_", "-")}`);
            orderCategory.innerHTML = `<p>${getEmptyMessage(category)}</p>`;
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
    }

    updateTotal();
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
}

