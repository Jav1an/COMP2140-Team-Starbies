

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
        "Cold Brew": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Vanilla Sweet Cream Cold Brew": {
            "Tall": "$750.00 JMD",
            "Venti": "$850.00 JMD",
            "Grande": "$950.00 JMD"
        }, 
        "Caramel Frappuccino Coffee": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Caramel Frappuccino Creame": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Mocha Frappuccino": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "StrawBerries & Creame": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Matcha Frappuccino": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "White Chocolate Mocha": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Vanilla Bean Crème": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Dulce De Leche (Frappuccino- Creme)": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Strawberry Açai": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Pineapple Passion Refresher": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Iced Shaken Tea": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Mango Dragonfruit": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Pineapple Passion Refresher Lemonade": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Strawberry Açai Frozen Refresher": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Dragon Drink": {
            "Tall": "$700.00 JMD",
            "Venti": "$800.00 JMD",
            "Grande": "$900.00 JMD"
        }, 
        "Shaken Iced Hibiscus Tea Lemonade": {
            "Tall": "$750.00 JMD",
            "Venti": "$850.00 JMD",
            "Grande": "$950.00 JMD"
        }, 
        "Shaken Iced Green Tea Lemonade": {
            "Tall": "$750.00 JMD",
            "Venti": "$850.00 JMD",
            "Grande": "$950.00 JMD"
        }, 
        "Shaken Iced Black Tea Lemonade": {
            "Tall": "$750.00 JMD",
            "Venti": "$850.00 JMD",
            "Grande": "$950.00 JMD"
        }, 
        "Iced Black Tea Latte": {
            "Tall": "$750.00 JMD",
            "Venti": "$850.00 JMD",
            "Grande": "$950.00 JMD"
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
                    clearCart();
                })
                .catch((err) => console.error('Error:', err));
            });
        } else {
            console.error('Pay Now button not found');
        }
    });
    
