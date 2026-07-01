

function getCart(){

    return JSON.parse(localStorage.getItem('cart')) || [];

}



function saveCart(cart){

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();

}



function addToCart(name, price, image){

    let cart = getCart();

    const existingItem = cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity += 1;

    }else{

        cart.push({
            name,
            price,
            image,
            quantity:1
        });

    }

    saveCart(cart);

    alert(name + ' added to cart');

}


function updateCartCount(){

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    const cartCount = document.querySelector('.cart-icon span');

    if(cartCount){

        cartCount.innerText = total;

    }

}

// ===============================
// LOAD CART COUNT ON PAGE LOAD
// ===============================

updateCartCount();
