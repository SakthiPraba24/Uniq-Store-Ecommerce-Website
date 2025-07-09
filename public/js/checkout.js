document.addEventListener('DOMContentLoaded', function () {
    const checkoutForm = document.getElementById('checkout-form');

    // Fetch cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Render the cart summary
    if (cartItems.length > 0) {
        const cartSummary = document.createElement('div');
        cartSummary.classList.add('cart-summary');
        cartSummary.innerHTML = '<h2>Order Summary</h2>';

        let totalPrice = 0;

        cartItems.forEach(item => {
            if (item) {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-summary-item');
                itemElement.innerHTML = `
                    <div style="margin-right: 10px;">
                        <img src="img/${item.image}" width="50" alt="${item.name}">
                    </div>
                    <div style="flex: 1;">
                        <strong>${item.name}</strong><br>
                        ${item.quantity} x $${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div>
                        <strong>$${item.price.toFixed(2)}</strong>
                    </div>
                `;
                itemElement.style.display = "flex";
                itemElement.style.alignItems = "center";
                itemElement.style.marginBottom = "10px";

                cartSummary.appendChild(itemElement);
                totalPrice += item.price;
            }
        });

        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-summary-total');
        totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
        cartSummary.appendChild(totalElement);

        checkoutForm.insertBefore(cartSummary, checkoutForm.firstChild);
    }

    // Handle form submission
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const validCartItems = cartItems.filter(item => item && typeof item.price === "number");
        const totalPrice = validCartItems.reduce((total, item) => total + item.price, 0);

        if (validCartItems.length === 0) {
            alert("Your cart is empty or contains invalid items.");
            return;
        }

        const orderData = {
            customerName: document.getElementById("customerName").value,
            customerEmail: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            paymentMethod: document.getElementById("payment-method").value,
            cartItems: validCartItems,
            totalPrice,
        };

        console.log("Submitting order data:", orderData);

        try {
            const response = await fetch("/api/orders/place-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                window.location.href = "success.html";
            } else {
                const result = await response.json();
                alert("Error placing order: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while placing the order.");
        }
    });
});
