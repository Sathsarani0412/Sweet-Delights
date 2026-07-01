let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("grandTotal");
const cartCount = document.getElementById("cartCount");

const DELIVERY_CHARGE = 300;

let selectedPayment = "";



function loadCart() {

    cartItems.innerHTML = "";

    let subtotal = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty
            </p>
        `;

        subtotalEl.innerText = "Rs. 0";
        totalEl.innerText = "Rs. 0";

        return;
    }

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        cartItems.innerHTML += `

        <div class="order-item">

            <img src="${item.image}">

            <div class="item-details">

                <h4>${item.name}</h4>

                <p>Qty : ${item.quantity}</p>

                <div class="qty-buttons">

                    <button onclick="decreaseQty(${index})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${index})">
                        +
                    </button>

                </div>

            </div>

            <div class="item-right">

                <h3>Rs. ${itemTotal}</h3>

                <button
                class="remove-btn"
                onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;
    });

    subtotalEl.innerText = `Rs. ${subtotal}`;

    totalEl.innerText =
        `Rs. ${subtotal + DELIVERY_CHARGE}`;

    cartCount.innerText = cart.length;

    const payAmount =
        document.getElementById("payAmount");

    if(payAmount){

        payAmount.innerText =
            totalEl.innerText;
    }
}


function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}



function increaseQty(index){

    cart[index].quantity += 1;

    saveCart();
}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity -= 1;

    }else{

        removeItem(index);
        return;
    }

    saveCart();
}

function removeItem(index){

    cart.splice(index, 1);

    saveCart();
}



function goToPayment(){

    const name =
        document.getElementById("name").value;

    const phone =
        document.getElementById("phone").value;

    const address =
        document.getElementById("address").value;

    if(!name || !phone || !address){

        alert("Please fill all delivery details.");
        return;
    }

    document
        .getElementById("deliveryPage")
        .classList.add("hidden");

    document
        .getElementById("paymentPage")
        .classList.remove("hidden");

    document
        .getElementById("step2")
        .classList.add("active");
}



function showCardPayment(){

    selectedPayment = "Card Payment";

    document
        .getElementById("cardPaymentBox")
        .classList.remove("hidden");
}

function payNow(){

    const cardName =
        document.getElementById("cardName").value;

    const cardNumber =
        document.getElementById("cardNumber").value;

    const expiry =
        document.getElementById("expiry").value;

    const cvv =
        document.getElementById("cvv").value;

    if(!cardName || !cardNumber || !expiry || !cvv){

        alert("Please fill card details.");
        return;
    }

    showReview();
}


function cashOnDelivery(){

    selectedPayment = "Cash On Delivery";

    alert(
        "Your order will be dispatched soon. Delivery updates will be sent to your mobile number."
    );

    showReview();
}



function showReview(){

    document
        .getElementById("paymentPage")
        .classList.add("hidden");

    document
        .getElementById("reviewPage")
        .classList.remove("hidden");

    document
        .getElementById("step3")
        .classList.add("active");

    document
        .getElementById("paymentMethod")
        .innerText = selectedPayment;

    document
        .getElementById("reviewTotal")
        .innerText = totalEl.innerText;

    const reviewItems =
        document.getElementById("reviewItems");

    reviewItems.innerHTML = "";

    cart.forEach(item => {

        reviewItems.innerHTML += `

        <div class="review-item">

            <span>
                ${item.name}
                x ${item.quantity}
            </span>

            <strong>
                Rs. ${item.price * item.quantity}
            </strong>

        </div>

        `;
    });

}



async function confirmOrder(){

    try{

        const customer_name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const address =
            document.getElementById("address").value;

        const total =
            parseInt(
                totalEl.innerText.replace("Rs. ","")
            );

        const response =
            await fetch('/api/orders', {

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({

                customer_name,
                phone,
                address,
                total

            })

        });

        const data = await response.json();

        if(data.success){

            document
                .getElementById("reviewPage")
                .classList.add("hidden");

            document
                .getElementById("confirmedPage")
                .classList.remove("hidden");

            document
                .getElementById("step4")
                .classList.add("active");

            document
                .getElementById("confirmMessage")
                .innerText =
                `Your order #${data.orderId} has been placed successfully.`;

            localStorage.removeItem("cart");

            cart = [];

            loadCart();

        }else{

            alert("Failed to place order.");
        }

    }catch(error){

        console.log(error);

        alert("Server error.");
    }
}


async function loadCakes(){

    const response =
        await fetch('/api/cakes');

    return await response.json();
}

const searchInput =
    document.getElementById("searchInput");

const results =
    document.getElementById("searchResults");

if(searchInput){

    searchInput.addEventListener("keyup",
    async () => {

        const value =
            searchInput.value.toLowerCase();

        results.innerHTML = "";

        if(value === ""){

            results.style.display = "none";
            return;
        }

        const cakes = await loadCakes();

        const filtered = cakes.filter(cake =>

            cake.name
            .toLowerCase()
            .includes(value)

        );

        if(filtered.length === 0){

            results.innerHTML = `
                <p class="empty-cart">
                    No cakes found
                </p>
            `;

            results.style.display = "block";
            return;
        }

        filtered.forEach(cake => {

            results.innerHTML += `

            <div class="search-item">

                <img src="${cake.image}">

                <div>

                    <h4>${cake.name}</h4>

                    <p>Rs. ${cake.price}</p>

                </div>

            </div>

            `;
        });

        results.style.display = "block";

    });

}



loadCart();
