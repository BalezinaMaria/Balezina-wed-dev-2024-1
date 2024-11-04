function getDishesCategory(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.category;
        }
    }
    return undefined;
}

function getDishesPrice(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.price;
        }
    }
    return undefined;
}

function updateTotal() {
    let allPoints = document.querySelectorAll(".food-point");
    let totalSum = 0;
    allPoints.forEach(point => {
        if (point.classList.contains("selected")) {
            totalSum += getDishesPrice(point.getAttribute("data-dish"));
        }
    });
    let orderCoast = document.querySelector(".order-item-coast");
    orderCoast.innerHTML = `
    <p><b>Стоимость заказа</b></p>
    <p class="coast">${totalSum}₽;</p>
    `;
}


function addToOrder(dish) {
    let orderItemsNot = document.querySelector(".order-items-not");
    let orderItems = document.querySelector(".order-items");
    orderItemsNot.style.display = "none";
    orderItems.style.display = "block";


    if (dish.category === "soup") {
        let order_category = document.querySelector(".order-item-soup");
        order_category.innerHTML = `
        <p><b>Суп</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        /*скрытое поле для формы заказа с ключевым словом, чтобы информация передалась при отправке формы*/
        let input_form = document.getElementById("input-soup");
        input_form.value = dish.keyword;

    } else if (dish.category === "main_course") {
        let order_category = document.querySelector(".order-item-main-course");
        order_category.innerHTML = `
        <p><b>Главное блюдо</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let input_form = document.getElementById("input-main-course");
        input_form.value = dish.keyword;

    } else if (dish.category === "beverages") {
        let order_category = document.querySelector(".order-item-beverages");
        order_category.innerHTML = `
        <p><b>Напиток</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let input_form = document.getElementById("input-beverage");
        input_form.value = dish.keyword;
    } else if (dish.category === "salad") {
        let order_category = document.querySelector(".order-item-salad");
        order_category.innerHTML = `
        <p><b>Салат или стартер</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let input_form = document.getElementById("input-salad");
        input_form.value = dish.keyword;
    } else if (dish.category === "dessert") {
        let order_category = document.querySelector(".order-item-dessert");
        order_category.innerHTML = `
        <p><b>Десерт</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let input_form = document.getElementById("input-dessert");
        input_form.value = dish.keyword;
    }
    /*идем по всем элементам и убираем selected у всех блюд одной категории */
    document.querySelectorAll(".food-point").forEach(point => {
        if (getDishesCategory(point.getAttribute("data-dish"))=== dish.category) {
            point.classList.remove("selected");
        }
    });
    /*добавляем selected к текущему блюду*/
    document.querySelector(`[data-dish="${dish.keyword}"]`).classList.add("selected");

    updateTotal();
}

function removeActiveClassFromButtons(buttons) {
    buttons.forEach(button => {
        button.classList.remove("active");
    });
}

function sortFoodItems(foodGrid, kind) {
    let foodItems = foodGrid.querySelectorAll(".food-point");
    foodItems.forEach(foodItem => {
        let keyword = foodItem.getAttribute("data-dish");
        dishes.forEach((dish) => {
            if (dish.keyword === keyword) {
                if (dish.kind !== kind) {
                    foodItem.style.display = "none";
                }
            }
        });
    });
}


function unSortFoodItems(foodGrid) {
    let foodItems = foodGrid.querySelectorAll(".food-point");
    foodItems.forEach(foodItem => {
        foodItem.style.display = "flex";
    });
}

function listenerCategoryButtons(categoryButtons, foodGrids) {
    categoryButtons.forEach((button) => {
        button.addEventListener("click", event => {
            if (button.classList.contains("active")) {
                button.classList.remove("active");
                unSortFoodItems(foodGrids);

            } else {
                removeActiveClassFromButtons(categoryButtons);
                button.classList.add("active");
                unSortFoodItems(foodGrids);
                sortFoodItems(foodGrids,
                    button.getAttribute("data-kind"));
            }
        });
    });
}

function setupCategoryButtons() {
    let foodGrids = document.querySelectorAll(".food-grid");
    let categoryButtonsSoup = document.getElementById("buttons_soup")
        .querySelectorAll(".category_item");
    let categoryButtonsMain = document.getElementById("buttons_main")
        .querySelectorAll(".category_item");
    let categoryButtonsSalad = document.getElementById("buttons_salad")
        .querySelectorAll(".category_item");
    let categoryButtonsBeverages = document.getElementById("buttons_beverages")
        .querySelectorAll(".category_item");
    let categoryButtonsDessert = document.getElementById("buttons_dessert")
        .querySelectorAll(".category_item");
    listenerCategoryButtons(categoryButtonsSoup, foodGrids[0]);
    listenerCategoryButtons(categoryButtonsMain, foodGrids[1]);
    listenerCategoryButtons(categoryButtonsSalad, foodGrids[2]);
    listenerCategoryButtons(categoryButtonsBeverages, foodGrids[3]);
    listenerCategoryButtons(categoryButtonsDessert, foodGrids[4]);
}


function setupAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", event => {
            const dish_keyword = event.target.closest(".food-point").getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dish_keyword);
            addToOrder(dish);
        });
    });
    setupCategoryButtons();
}
