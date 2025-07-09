// DOM References
const openShopping = document.querySelector(".shopping"),
      checkoutButton = document.querySelector(".closeShopping"),
      close = document.querySelector(".close"),
      body = document.querySelector("body"),
      list = document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity");

let listCards = []; // Stores cart items
let products = [];  // Products fetched from the backend

// Open and Close Cart Functionality
openShopping.addEventListener("click", () => {
    body.classList.add("active");
});

close.addEventListener("click", () => {
    body.classList.remove("active");
});

// Checkout Button: Save Cart to LocalStorage and Redirect
checkoutButton.addEventListener('click', () => {
    localStorage.setItem('cartItems', JSON.stringify(listCards));
    window.location.href = 'checkout.html';
});

// Fetch Products from Backend
async function fetchProducts() {
    try {
        const response = await fetch('/api/products'); // API Endpoint
        products = await response.json(); // Fetch products and store them
        renderProducts(products); // Render fetched products
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

// Render Products Dynamically
function renderProducts(products) {
    products.forEach((product, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="img/${product.image}" alt="${product.name}">
            <div class="title">${product.name}</div>
            <div class="price">${product.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    });
}

// Add Product to Cart
function addToCart(key) {
    if (!listCards[key]) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity += 1;
    }
    reloadCart();
}

// Reload Cart: Updates UI with Cart Items
function reloadCart() {
    listCard.innerHTML = ""; // Clear existing cart items
    let totalPrice = 0;
    let totalQuantity = 0;

    listCards.forEach((item, key) => {
        if (item) {
            totalPrice += item.price * item.quantity;
            totalQuantity += item.quantity;

            let cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <div><img src="img/${item.image}" alt="${item.name}"></div>
                <div class="cardTitle">${item.name}</div>
                <div class="cardPrice">${item.price.toLocaleString()}</div>
                <div>
                    <button style="background-color:rgb(177, 67, 187);" onclick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button style="background-color:rgb(177, 67, 187);" onclick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
                </div>
                <button style="background:none;" class="removeButton" onclick="removeItem(${key})">X</button>
            `;
            listCard.appendChild(cartItem);
        }
    });

    // Update Total Price and Quantity
    total.textContent = totalPrice.toLocaleString();
    quantity.textContent = totalQuantity;
}

// Change Quantity of Items in Cart
function changeQuantity(key, quantity) {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCart();
}

// Remove Item from Cart
function removeItem(key) {
    delete listCards[key];
    reloadCart();
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts(); // Fetch and render products on page load
});

    
    

  
