function getCurrentUser(){
    return localStorage.getItem("currentUser");
}

function getCart(){
    let user = getCurrentUser();

    let allCarts = JSON.parse(localStorage.getItem("carts")) || {};

    return allCarts[user] || [];
}

function saveCart(cart){
    let user = getCurrentUser();

    let allCarts = JSON.parse(localStorage.getItem("carts")) || {};

    allCarts[user] = cart;

    localStorage.setItem("carts", JSON.stringify(allCarts));
}

function addToCart(name, price){

    let cart = getCart();

    cart.push({name, price});

    saveCart(cart);

    alert(name + " added to cart!");
}


function renderCart(){

    let cart = getCart();

    let container = document.getElementById("cartList");
    let totalEl = document.getElementById("total");

    if(!container || !totalEl) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        container.innerHTML += `
            <div class="item">
                <span>${item.name}</span>
                <span>₱${item.price}</span>
            </div>
        `;
        total += item.price;
    });

    totalEl.innerText = "Total: ₱" + total;
}


document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});


function checkout(){

    let cart = getCart();

    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let user = getCurrentUser();

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        user: user,
        items: cart,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order placed successfully!");

    saveCart([]);

    renderCart();
}