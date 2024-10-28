function setupAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", event => {
            const dish_keyword = event.target.closest(".food-point").getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dish_keyword);
            addToOrder(dish);
        });
    });
}

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

