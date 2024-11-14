// Define a variable to store the count of items in the cart
let itemCount = 0;

// Function to update the cart icon with the item count
function updateCartIcon() {
    let cartIconCount = document.querySelector("#cart-icon-count");
    cartIconCount.textContent = itemCount; // Update the text content of the cart icon
}

// Function to add an item to the cart
function addItemToCart() {
    // Add the item to the cart
    itemCount++;
    // Update the cart icon
    updateCartIcon();
}

// Function to remove an item from the cart
function removeItemFromCart() {
    // Remove the item from the cart
    if (itemCount > 0) {
        itemCount--;
    }
    // Update the cart icon
    updateCartIcon();
}

//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let CloseCart = document.querySelector("#close-the-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

CloseCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //Remove Items 
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Adding to cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
    //Making Buy Button function
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buybuttonClicked);
}

//Buy Button
function buybuttonClicked() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    if (cartContent.children.length === 0) {
        alert('Your cart is empty. Please add items to your cart before placing an order.');
    } else {
        // Open checkout modal when the Buy Now button is clicked
        document.getElementById("checkout-modal").style.display = "block";
    }
}

//Remove cart item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    Updatetotal();
    removeItemFromCart(); // Call removeItemFromCart to decrement the item count
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    Updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-name')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    var customization = shopProducts.querySelector('.product-customization').value;
    var color = shopProducts.querySelector('.product-customization.color').value; // Capture color
    addproductToCart(title, price, productImg, customization, color); // Pass customization and color here
    Updatetotal();
    addItemToCart(); // Call addItemToCart to increment the item count
}

function addproductToCart(title, price, productImg, customization, color) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("products-title");

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="products-title">${title}</div>
            <div class="cart-price">${price}</div>
            <div class="cart-customization">Size: ${customization}</div>
            <div class="cart-color">Color: ${color}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--Remove from cart-->
        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);

    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);

    Updatetotal();
}

// Update Total
function Updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    //When price consists cents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

// Open checkout modal when clicking the cart icon
document.querySelector("#cart-icon").addEventListener("click", function () {
    cart.classList.add("active");
});

// Close checkout modal when clicking the close button
document.querySelector(".checkout-close").addEventListener("click", function () {
    document.getElementById("checkout-modal").style.display = "none";
});
