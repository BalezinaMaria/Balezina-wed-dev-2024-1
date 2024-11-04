function display_dishes() {
    /*метод сортировки, сравнивающий name; localeCompare - сравнивает строки и упорядычивает по алфавиту*/
    const sorted_dishes = dishes.sort((a,b) => a.name.localeCompare(b.name));
    /*поиск всех элементов с классом .food-grid
    документ-модель, в которой все элеенты представляются как объекты*/
    let foodGrids = document.querySelectorAll(".food-grid");

    sorted_dishes.forEach(dish => {
        let dishCard=document.createElement("div");
        dishCard.classList.add("food-point");
        dishCard.setAttribute("data-dish", dish.keyword);
        /*innerHTML позволяет вставить код внутрь карточки*/
        dishCard.innerHTML = `
        <img src ="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class"name">${dish.name}</p>
        <div class="info">
            <p class="weight">${dish.count}</p>
                <button class="add-button">Добавить</button>
            </div>
        `;
        /*распределение карточек по категориям*/ 
        if (dish.category === "soup") {
            foodGrids[0].append(dishCard);
        } else if (dish.category === "main_course") {
            foodGrids[1].append(dishCard);
        } else if (dish.category === "salad") {
            foodGrids[2].append(dishCard);
        } else if (dish.category === "beverages") {
            foodGrids[3].append(dishCard);
        } else if (dish.category === "dessert") {
            foodGrids[4].append(dishCard);
        }
    });
    setupAddButtons();
}
display_dishes();