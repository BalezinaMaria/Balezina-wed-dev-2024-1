
export function showPopupAroundModal(message, action) {
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    const popup = document.createElement("div");
    popup.classList.add("popup");
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    const closeButton = document.createElement("button");
    closeButton.textContent = "Окей";
    closeButton.classList.add("popup-button");
    closeButton.addEventListener("click", () => {
        if (action === "refresh") {
            window.location.reload();
        }
        else {
            document.body.removeChild(overlay);
        }
    });
    popup.appendChild(messageParagraph);
    popup.appendChild(closeButton);
    overlay.appendChild(popup);

    document.body.appendChild(overlay);
}


async function sendForm(formData, order_id) {
    const api = "https://edu.std-900.ist.mospolytech.ru";
    const api_key = "f3c7705f-bfab-4af2-846b-aafbaee9a067";
    const url = `${api}/labs/api/orders/${order_id}?api_key=${api_key}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        showPopupAroundModal("Заказ успешно изменен!", "refresh");

    } catch (error) {
        showPopupAroundModal(`Ошибка при оформлении заказа: ${error}`, "error");
    }
}

async function sendDelete(order_id) {
    const api = "https://edu.std-900.ist.mospolytech.ru";
    const api_key = "f3c7705f-bfab-4af2-846b-aafbaee9a067";
    const url = `${api}/labs/api/orders/${order_id}?api_key=${api_key}`;
    try {
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        showPopupAroundModal("Заказ успешно удален!", "refresh");

    } catch (error) {
        showPopupAroundModal(`Ошибка при удалении заказа: ${error}`, "error");
    }
}

function modalCloser(){
    const firstCloseButton = document.querySelector(".close");
    const secondCloseButton = document.querySelector(".modal-close");
    const modalWindow = document.querySelector(".modal");
    console.log(firstCloseButton, secondCloseButton);
    firstCloseButton.addEventListener("click", (event) =>{
        modalWindow.remove();
    });
    secondCloseButton.addEventListener("click", (event) =>{
        event.preventDefault();
        modalWindow.remove();
    });
}

function faEyeListener(order, button, dishes){
    const dateString = order.created_at;
    const date = new Date(dateString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    button.addEventListener("click", (event) => {
        const modalWindow = document.createElement("div");
        modalWindow.classList.add("modal");
        modalWindow.innerHTML = `
            <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Просмотр заказа</h2>
            <p><strong>Дата оформления:</strong> ${formattedDate}</pborder-radius: 10px;>
            <h3>Доставка</h3>
            <p><strong>Имя получателя:</strong> ${order.full_name}</p>
            <p><strong>Адрес доставки:</strong> ${order.delivery_address}</p>
            <p><strong>Время доставки:</strong> ${order.delivery_type === "now" ? order.delivery_time.slice(0, -3) : "Как можно скорее<br>(c 07:00 до 23:00)"}</p>
            <p><strong>Телефон:</strong> ${order.phone}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <h3>Комментарий</h3>
            <p>${order.comment === null ? "Комментарий не указан" : order.comment}</p>
            <h3>Состав заказа</h3>
            <ul>
                ${order.soup_id === null ? "" : `<li>Суп: ${getNameById(order.soup_id, dishes)} (${getPriceById(order.soup_id, dishes)}₽)</li>`}
                ${order.main_course_id === null ? "" : `<li>Основное блюдо: ${getNameById(order.main_course_id, dishes)} (${getPriceById(order.main_course_id, dishes)}₽)</li>`}
                ${order.salad_id === null ? "" : `<li>Салат или стартер: ${getNameById(order.salad_id, dishes)} (${getPriceById(order.salad_id, dishes)}₽)</li>`}
                ${order.drink_id === null ? "" : `<li>Напиток: ${getNameById(order.drink_id, dishes)} (${getPriceById(order.drink_id, dishes)}₽)</li>`}
                ${order.dessert_id === null ? "" : `<li>Десерт: ${getNameById(order.dessert_id, dishes)} (${getPriceById(order.dessert_id, dishes)}₽)</li>`}
            </ul>
            <div class="modal-container">
                <a class="modal-close">Oк</a>
            </div>
        </div>
        `;
        document.body.appendChild(modalWindow);
        modalCloser();
    });
}

function faEditListener(order, button, dishes){
    const dateString = order.created_at;
    const date = new Date(dateString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    button.addEventListener("click", (event) => {
        const modalWindow = document.createElement("div");
        modalWindow.classList.add("modal");
        modalWindow.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Редактирование заказа</h2>
            <form class="form-modal">
              <label for="name">Имя получателя:</label><br>
              <input type="text" id="name" name="full_name" value="${order.full_name}"><br>
        
              <label for="address">Адрес доставки:</label><br>
              <input type="text" id="address" name="delivery_address" value="${order.delivery_address}"><br>
                <legend>Тип доставки:</legend>
                <div class="time">
                    <input type="radio" name="delivery_type" id="asap" value="now" ${order.delivery_type === "now" ? "checked" : ""}>
                    <label for="asap">Как можно скорее</label>
                </div>
                <div class="time">
                    <input type="radio" name="delivery_type" id="point-time" value="by_time" ${order.delivery_type === "by_time" ? "checked" : ""}>
                    <label for="point-time">К указанному времени</label>
                </div>
              <label for="time">Время доставки:</label><br>
              <input type="time" id="time" name="delivery_time" value="${order.delivery_type === "by_time" ? order.delivery_time : "" }"><br>
        
              <label for="phone">Телефон:</label><br>
              <input type="tel" id="phone" name="phone" value="${order.phone}"><br>
        
              <label for="email">Email:</label><br>
              <input type="email" id="email" name="email" value="${order.email}"><br>
        
              <label for="comment">Комментарий:</label><br>
              <textarea id="comment" name="comment">${order.comment === null ? "" : order.comment}</textarea><br>
        
            <h3>Состав заказа</h3>
            <ul>
                ${order.soup_id === null ? "" : `<li>Суп: ${getNameById(order.soup_id, dishes)} (${getPriceById(order.soup_id, dishes)}₽)</li>`}
                ${order.main_course_id === null ? "" : `<li>Основное блюдо: ${getNameById(order.main_course_id, dishes)} (${getPriceById(order.main_course_id, dishes)}₽)</li>`}
                ${order.salad_id === null ? "" : `<li>Салат или стартер: ${getNameById(order.salad_id, dishes)} (${getPriceById(order.salad_id, dishes)}₽)</li>`}
                ${order.drink_id === null ? "" : `<li>Напиток: ${getNameById(order.drink_id, dishes)} (${getPriceById(order.drink_id, dishes)}₽)</li>`}
                ${order.dessert_id === null ? "" : `<li>Десерт: ${getNameById(order.dessert_id, dishes)} (${getPriceById(order.dessert_id, dishes)}₽)</li>`}
            </ul>
            <div class="modal-container">
                <button class="modal-close">Oтмена</button>
                <button class="modal-submit">Сохранить</button>
            </div>
            </form>
          </div>
        `;
        document.body.appendChild(modalWindow);
        modalCloser();
        const modalSubmitButton = document.querySelector(".modal-submit");
        modalSubmitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const formModal = document.querySelector(".form-modal");
            const formData = new FormData(formModal);
            sendForm(formData, order.id).then();
        });
    });
}

function faDeleteListener(order, button){
    button.addEventListener("click", (event) => {
        const modalWindow = document.createElement("div");
        modalWindow.classList.add("modal");
        modalWindow.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Удаление заказа</h2>
            <p>Вы уверены, что хотите удалить заказ?</p>
            <div class="modal-container">
                <button class="modal-close">Oтмена</button>
                <button class="modal-delete">Удалить</button>
            </div>
          </div>
        `;
        document.body.appendChild(modalWindow);
        modalCloser();
        const modalDeleteButton = document.querySelector(".modal-delete");
        modalDeleteButton.addEventListener("click", (event) => {
            sendDelete(order.id).then();
        });
    });
}

function getNameById(id, data) {
    const foundItem = data.find(item => item.id === id);
    return foundItem ? foundItem.name : null;
}

function getPriceById(id, data) {
    const foundItem = data.find(item => item.id === id);
    return foundItem ? foundItem.price : null;
}

function getStringNames(order, dishes) {
    let resultString = "";
    if (order.soup_id !== null) {
        resultString += getNameById(order.soup_id, dishes) + ", ";
    }
    if (order.main_course_id !== null) {
        resultString += getNameById(order.main_course_id, dishes) + ", ";
    }
    if (order.salad_id !== null) {
        resultString += getNameById(order.salad_id, dishes) + ", ";
    }
    if (order.drink_id !== null) {
        resultString += getNameById(order.drink_id, dishes) + ", ";
    }
    if (order.dessert_id !== null) {
        resultString += getNameById(order.dessert_id, dishes) + ", ";
    }
    return resultString;
}

function getAllPrice(order, dishes) {
    let resultString = 0;
    if (order.soup_id !== null) {
        resultString += getPriceById(order.soup_id, dishes);
    }
    if (order.main_course_id !== null) {
        resultString += getPriceById(order.main_course_id, dishes);
    }
    if (order.salad_id !== null) {
        resultString += getPriceById(order.salad_id, dishes);
    }
    if (order.drink_id !== null) {
        resultString += getPriceById(order.drink_id, dishes);
    }
    if (order.dessert_id !== null) {
        resultString += getPriceById(order.dessert_id, dishes);
    }
    return resultString;
}

async function getOrders() {
    const api = "https://edu.std-900.ist.mospolytech.ru";
    const api_key = "f3c7705f-bfab-4af2-846b-aafbaee9a067";
    const url = `${api}/labs/api/orders?api_key=${api_key}`;
    try {
        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

async function getDishes() {
    const api = "https://edu.std-900.ist.mospolytech.ru";
    const api_key = "f3c7705f-bfab-4af2-846b-aafbaee9a067";
    const url = `${api}/labs/api/dishes`;
    try {
        const response = await fetch(url, {
            method: "GET"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

function displayOrders() {
    let cntRow = 1;
    getDishes().then(dishes => {
        getOrders().then(orders => {
            orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            orders.forEach(order => {
                const dateString = order.created_at;
                const date = new Date(dateString);
                const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

                const tableBlock = document.createElement("tr");
                tableBlock.innerHTML = `
                    <td>${cntRow}</td>
                    <td>${formattedDate}</td>
                    <td>${getStringNames(order, dishes).slice(0, -2)}</td>
                    <td class="cost">${getAllPrice(order, dishes)}₽</td>
                    <td>${order.delivery_type === "by_time" ? order.delivery_time.slice(0, -3) : "Как можно скорее<br>(c 07:00 до 23:00)"}</td>
                    <td>
                        <span class="fas fa-eye" data-id="${order.id}" title="Посмотреть">👀</span>
                        <span class="fas fa-edit" data-id="${order.id}" title="Редактировать">✏️</span>
                        <span class="fas fa-trash-alt" data-id="${order.id}" title="Удалить">🗑️</span>
                    </td>
                `;
                document.querySelector(".table-orders").appendChild(tableBlock);
                cntRow += 1;
                const faEyeButton = document.querySelectorAll(".fa-eye");
                const faEditButton = document.querySelectorAll(".fa-edit");
                const faDeleteButton = document.querySelectorAll(".fa-trash-alt");
                faEyeButton.forEach(faEye => {
                    if (faEye.getAttribute("data-id") === order.id.toString()) {
                        faEyeListener(order, faEye, dishes);
                    }
                });
                faEditButton.forEach(faEdit => {
                    if (faEdit.getAttribute("data-id") === order.id.toString()) {
                        faEditListener(order, faEdit, dishes);
                        console.log(faEdit.getAttribute("data-id"), order.id);
                    }
                });
                faDeleteButton.forEach(faDelete => {
                    if (faDelete.getAttribute("data-id") === order.id.toString()) {
                        faDeleteListener(order, faDelete);
                    }
                });
            });
        });
    });
}

displayOrders();