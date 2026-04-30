// ================= ADD TO CART =================
window.addToCart = function(name, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
    showCheckoutPopup();
};


// ================= POPUP =================
function showCheckoutPopup(){

    const old = document.getElementById("checkout-popup");
    if(old) old.remove();

    const popup = document.createElement("div");
    popup.id = "checkout-popup";

    popup.innerHTML = `
        <div class="popup-box">
            <h3>Added to Cart ✔</h3>
            <p>What do you want to do?</p>

            <button onclick="location.href='cart.html'">Go to Cart</button>
            <button onclick="location.href='cart.html'">Buy Now</button>
            <button onclick="this.parentElement.parentElement.remove()">Continue Shopping</button>
        </div>
    `;

    document.body.appendChild(popup);
}


// ================= CHECKOUT (ORDERS SAVE) =================
window.checkout = function(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let user = localStorage.getItem("currentUser") || "guest";

    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let total = cart.reduce((sum, i) => sum + i.price, 0);

    orders.push({
        user: user,
        items: cart,
        total: total,
        date: new Date().toLocaleString(),
        type: "product"
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Checkout successful!");
    window.location.href = "receipt.html";
};


// ================= BOOKING (SAVE FIXED) =================
window.bookService = function(serviceName, inputId){

    let user = localStorage.getItem("currentUser") || "guest";
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    let datetime = new Date().toLocaleString();

    if(inputId){
        let input = document.getElementById(inputId);
        if(input && input.value){
            datetime = input.value;
        }
    }

    bookings.push({
        user: user,
        service: serviceName,
        datetime: datetime,
        status: "pending"
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert(serviceName + " booked successfully!");
};


// ================= MAIN SYSTEM =================
document.addEventListener("DOMContentLoaded", function(){

    // ================= CART =================
    const cartItems = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    if(cartItems){

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = 0;

        cartItems.innerHTML = "";

        if(cart.length === 0){
            cartItems.innerHTML = "<p>Your cart is empty</p>";
        } else {
            cart.forEach(item => {
                total += item.price;

                cartItems.innerHTML += `
                    <div class="item">
                        <span>${item.name}</span>
                        <span>₱${item.price}</span>
                    </div>
                `;
            });
        }

        if(totalEl) totalEl.innerText = cart.length ? "Total: ₱" + total : "";
    }


    // ================= CATEGORY SYSTEM (FIXED) =================
    const params = new URLSearchParams(window.location.search);
    const item = params.get("item");

    const title = document.getElementById("title");
    const content = document.getElementById("content");

    if(content){

        function renderProducts(categoryTitle, products){

            if(title) title.innerText = categoryTitle;

            content.innerHTML = "";

            products.forEach(p => {

                const card = document.createElement("div");
                card.className = "product-card";

                card.innerHTML = `
                    <img src="${p.img}">
                    <h3>${p.name}</h3>
                    <p>₱${p.price}</p>
                    <button>Add to Cart</button>
                `;

                card.querySelector("button").onclick = () => {
                    addToCart(p.name, p.price);
                };

                content.appendChild(card);
            });
        }


        // ================= PRODUCTS RESTORED =================
        if(item === "biketire"){
            renderProducts("Bike Tire", [
                {img:"roadtire.jpg", name:"Road Tire 26\"", price:500},
                {img:"mountain.jpg", name:"Mountain Tire 29\"", price:650},
                {img:"fat.jpg", name:"Fat Tire", price:800},
                {img:"hybrid.jpg", name:"Hybrid Tire", price:700},
                {img:"urban.jpg", name:"Urban Tire", price:550}
            ]);
        }

        else if(item === "brakeset"){
            renderProducts("Brake Set", [
                {img:"hydraulic.jpg", name:"Hydraulic Brake", price:1200},
                {img:"mechanical.jpg", name:"Mechanical Brake", price:800},
                {img:"discbrake.jpg", name:"Disc Brake", price:950},
                {img:"racingbrake.jpg", name:"Racing Brake", price:1500},
                {img:"standard.jpg", name:"Standard Brake", price:700}
            ]);
        }

        else if(item === "bikechain"){
            renderProducts("Bike Chain", [
                {img:"steel.jpg", name:"Steel Chain", price:300},
                {img:"heavyduty.jpg", name:"Heavy Duty Chain", price:450},
                {img:"rustfree.jpg", name:"Rust Free Chain", price:500},
                {img:"speedchain.jpg", name:"Speed Chain", price:650},
                {img:"pro.jpg", name:"Pro Chain", price:700}
            ]);
        }

        else if(item === "handlebar"){
            renderProducts("Handlebar", [
                {img:"racinghandlebar.jpg", name:"Racing Handlebar", price:700},
                {img:"comforthandlebar.jpg", name:"Comfort Handlebar", price:550},
                {img:"mountainhandlebar.jpg", name:"Mountain Handlebar", price:800},
                {img:"foldablehandlebar.jpg", name:"Foldable Handlebar", price:900},
                {img:"progrip.jpg", name:"Pro Grip Handlebar", price:650}
            ]);
        }
    }


    // ================= CAROUSEL =================
    const slides = document.getElementById("slides");

    if(slides){

        let i = 0;

        setInterval(() => {
            i = (i + 1) % slides.children.length;
            slides.style.transform = `translateX(-${i * 100}%)`;
        }, 3000);
    }
});


// ================= ADMIN / SUPERADMIN FIX =================
document.addEventListener("DOMContentLoaded", function(){

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    let report = document.getElementById("reportList");

    if(report){

        let productOrders = orders.filter(o => o.type === "product");

        report.innerHTML = `
            <h3>🛒 Orders</h3>
            ${
                productOrders.length
                ? productOrders.map(o => `
                    <div style="padding:10px;border-bottom:1px solid #eee">
                        👤 ${o.user}<br>
                        🛒 ${o.items.length} items<br>
                        💰 ₱${o.total}<br>
                        📅 ${o.date}
                    </div>
                `).join("")
                : "No orders yet"
            }

            <hr>

            <h3>🛠 Bookings</h3>
            ${
                bookings.length
                ? bookings.map(b => `
                    <div style="padding:10px;border-bottom:1px solid #eee">
                        👤 ${b.user}<br>
                        🛠 ${b.service}<br>
                        📅 ${b.datetime}<br>
                        📌 ${b.status}
                    </div>
                `).join("")
                : "No bookings yet"
            }
        `;
    }
});