let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};

//Close Cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

//Add to Cart

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready()
}

// Making Function
function ready(){
    // Remove item from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Quantity Change 
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    loadCartItems()
}


document.addEventListener('DOMContentLoaded', function () {
    var products = {
        "Iced Cappuccino with Cold Foam": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        },
        "Caramel Macchiato": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }
    };

    var sizeSelect = document.querySelector('select');
    sizeSelect.addEventListener('change', function() {
        var size = this.value;
        // Now you can use the 'size' variable just like you would with the buttons
        // For example, let's log the prices of the products for this size
        console.log('Prices for ' + size + ':');
        for (var product in products) {
            console.log(product + ': ' + products[product][size]);
        }
    });
});


document.getElementById('productBox').addEventListener('click', function (event) {
        // Check if the click target is not the cart icon
        if (!event.target.classList.contains('add-cart')) {
            // Redirect to the product details page
            window.location.href = 'productdetails.html';
        }
});

document.getElementById('addToCart').addEventListener('click', function (event) {
        // Prevent the click event from propagating to the parent container
        event.stopPropagation();
        // Add the item to the cart (you can add your cart logic here)
        addProductToCart(title,price,productImg);
});



//Remove Cart Item
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

// Quantity Change 

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
}

// Add Cart Function 

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product img")[0].src
    addProductToCart(title,price,productImg);
    updatetotal();
    saveCartItems();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i =0; i< cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have already added this item to the cart");
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img" />
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input 
        type="number"
        name=""
        id=""
        value="1"
        class="cart-quantity"
        />
    </div>

    <i class="fas fa-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
    saveCartItems();
}




// Update Total 
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    // if price contain some cents
    total = Math.round(total* 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText=  "$" + total;
        // Save Total to Local Storage
        localStorage.setItem("cartTotal", total);
    }

    // To let the items stay in the cart

    function saveCartItems() {
        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartBoxes = cartContent.getElementsByClassName("cart-box");
        var cartItems = [];

        for (var i=0; i< cartBoxes.length; i++) {
            cartBox = cartBoxes[i];
            var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
            var priceElement = cart.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

            var item = {
                title: titleElement.innerText,
                price: priceElement.innerText,
                quantity: quantityElement.value,
                productImg: productImg,
            };
            cartItems.push(item);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }


    function clearCart(){
        var cartContent = document.getElementsByClassName("cart-content")[0];
        cartContent.innerHTML = "";
        updatetotal();
        localStorage.removeItem("cartItems");
    }

    // Loads In Cart
    function loadCartItems() {
        var cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            cartItems = JSON.parse(cartItems);

            for (var i = 0; i < cartItems.length; i++){
                var item = cartItems[i];
                addProductToCart(item.title, item.price, item.productImg);

                var cartBoxes = document.getElementsByClassName("cart-box");
                var cartBox = cartBoxes[cartBoxes.length - 1];
                var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
                quantityElement.value = item.quantity;
            }
        }
        var cartTotal  = localStorage.getItem("cartTotal");
        if(cartTotal) {
            document.getElementsByClassName("total-price")[0].innerText = 
            "$" + cartTotal;
        }
    }





let menu = document.querySelector('#menu-bars');
let navigationbar = document.querySelector('.navigationbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navigationbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navigationbar.classList.remove('active');
}

document.getElementById('search-icon').onclick = () =>{
    document.getElementById('search-form').classList.toggle('active');
}

document.getElementById('close').onclick = () =>{
    document.getElementById('search-form').classList.remove('active');
}


var swiper = new Swiper('.home-slider', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 6500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});





document.addEventListener('DOMContentLoaded', function () {
    var products = {

        "Iced Cappuccino with Cold Foam": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        },
        "Caffe Mocha": {
            "Tall": "$770.00 JMD",
            "Venti": "$880.00 JMD",
            "Grande": "$990.00 JMD"
        },
        "Caramel Macchiato": {
            "Tall": "$770.00 JMD",
            "Venti": "$880.00 JMD",
            "Grande": "$990.00 JMD"
        },
        "White Chocolate Mocha": {
            "Tall": "$770.00 JMD",
            "Venti": "$880.00 JMD",
            "Grande": "$990.00 JMD"
        }, 
        "Iced Toasted Vanilla Shaken Espresso": {
            "Tall": "$770.00 JMD",
            "Venti": "$880.00 JMD",
            "Grande": "$990.00 JMD"
        }, 
}
      
    // Add event listeners to your buttons
    document.querySelectorAll('.size-button').forEach(function(button) {
        button.addEventListener('click', function(e) {
            var size = e.target.innerText;
            var productBox = e.target.closest('.product-box');
            var productTitle = productBox.querySelector('.product-title').innerHTML.replace(/<br>/g, '').replace(/<[^>]*>/g, '').replace(/\s/g, ' ').trim();
            var priceElement = productBox.querySelector('.price');
  
            // Update the price based on the selected size
            var newPrice = products[productTitle][size];
  
            priceElement.innerText = newPrice;
        });
    });
});

    document.addEventListener('DOMContentLoaded', function () {
        const payBtn = document.querySelector('.btn-buy');
    
        if (payBtn) {
            payBtn.addEventListener('click', function () {
                console.log('Pay Now button clicked');
    
                fetch('/stripe-checkout', {
                    method: 'post',
                    headers: new Headers({'Content-Type': 'application/Json'}),
                    body: JSON.stringify({
                        items: JSON.parse(localStorage.getItem('cartItems')),
                    }), 
                })
                .then((res) => res.json())
                .then((url) => {
                    console.log('Redirecting to:', url);
                    location.href = url;
                })
                .catch((err) => console.error('Error:', err));
            });
        } else {
            console.error('Pay Now button not found');
        }
    });
    




// document.getElementById('sign-out').addEventListener('click', function() {
//     // Clear the user's session
//     // Redirect to the sign-in page
// });
// localStorage.removeItem('userId');
// window.location.href = 'signin.html';



// Check if the element with ID 'explore-menu' exists
var exploreMenuButton = document.getElementById('explore-menu');

if (exploreMenuButton) {
    // If the element exists, add the click event listener
    exploreMenuButton.addEventListener('click', function() {
        // Save the current page URL to localStorage
        localStorage.setItem('origin', window.location.href);

        // Check if the current page is the dashboard.html
        if (window.location.pathname.includes("dashboard.html")) {
            // If it is, redirect to menu.html
            window.location.href = 'menu.html';
        } else {
            // If not, redirect to signin.html
            window.location.href = 'signin.html';
        }
    });
}

document.getElementById('ordernow1').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo1').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow2').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo2').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow3').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo3').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow4').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo4').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow5').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo5').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow6').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo6').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow7').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo7').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow8').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo8').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('ordernow9').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});

document.getElementById('dietaryinfo9').addEventListener('click', function() {
    // Save the current page URL to localStorage
    localStorage.setItem('origin', window.location.href);
    // Redirect to the login page
    window.location.href = 'signin.html';
});



