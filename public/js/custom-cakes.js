let currentStep = 1;

let customCake = {

    flavour: "Chocolate",
    size: "",
    shape: "",
    theme: "",
    extras: [],
    note: "",
    image: "/images/cakes/chocolate truffle cake.png",
    basePrice: 4500
};



function updatePrice(){

    let total = customCake.basePrice;

 

    if(customCake.size === "1 KG"){
        total += 1000;
    }

    if(customCake.size === "2 KG"){
        total += 2000;
    }

    if(customCake.size === "3 KG"){
        total += 3000;
    }

  

    customCake.extras.forEach(extra => {
        total += extra.price;
    });

    document.getElementById("totalPrice")
    .innerText = `Rs. ${total}`;

    return total;
}



function nextStep(){

    if(currentStep < 5){

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.remove("active-page");

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.add("hidden");

        document
        .getElementById(`step${currentStep}`)
        .classList.remove("active");

        currentStep++;

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.remove("hidden");

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.add("active-page");

        document
        .getElementById(`step${currentStep}`)
        .classList.add("active");

        if(currentStep === 5){
            loadReview();
        }
    }
}



function prevStep(){

    if(currentStep > 1){

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.remove("active-page");

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.add("hidden");

        document
        .getElementById(`step${currentStep}`)
        .classList.remove("active");

        currentStep--;

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.remove("hidden");

        document
        .getElementById(`stepPage${currentStep}`)
        .classList.add("active-page");

        document
        .getElementById(`step${currentStep}`)
        .classList.add("active");
    }
}



function selectFlavour(card,name,image,price){

    document
    .querySelectorAll(".flavour-card")
    .forEach(card => {
        card.classList.remove("active");
    });

    card.classList.add("active");

    customCake.flavour = name;
    customCake.image = image;
    customCake.basePrice = price;

    document
    .getElementById("previewImage")
    .src = image;

    updateSummary();
}



function selectSize(card,size){

    document
    .querySelectorAll("#stepPage2 .option-card")
    .forEach(card => {
        card.classList.remove("active-option");
    });

    card.classList.add("active-option");

    customCake.size = size;

    updateSummary();
}



function selectShape(card,shape){

    let shapeCards = document.querySelectorAll(
        "#stepPage2 .options-grid:nth-child(4) .option-card"
    );

    shapeCards.forEach(card => {
        card.classList.remove("active-option");
    });

    card.classList.add("active-option");

    customCake.shape = shape;

    updateSummary();
}



function selectTheme(card,theme){

    document
    .querySelectorAll("#stepPage3 .option-card")
    .forEach(card => {
        card.classList.remove("active-option");
    });

    card.classList.add("active-option");

    customCake.theme = theme;

    updateSummary();
}



function toggleExtra(name,price){

    let found =
    customCake.extras.find(
        extra => extra.name === name
    );

    if(found){

        customCake.extras =
        customCake.extras.filter(
            extra => extra.name !== name
        );

    }else{

        customCake.extras.push({
            name,
            price
        });
    }

    updateSummary();
}



function updateSummary(){

    document.getElementById("summaryFlavour")
    .innerText =
    customCake.flavour;

    document.getElementById("summarySize")
    .innerText =
    customCake.size || "Not selected";

    document.getElementById("summaryShape")
    .innerText =
    customCake.shape || "Not selected";

    document.getElementById("summaryTheme")
    .innerText =
    customCake.theme || "Not selected";

    document.getElementById("summaryExtras")
    .innerText =
    customCake.extras.length > 0
    ? customCake.extras.map(extra => extra.name).join(", ")
    : "None";

    updatePrice();
}



function loadReview(){

    customCake.note =
    document.getElementById("requestNote").value;

    let total = updatePrice();

    document.getElementById("reviewContent")
    .innerHTML = `

    <div class="review-row">
        <strong>Flavour:</strong>
        ${customCake.flavour}
    </div>

    <div class="review-row">
        <strong>Size:</strong>
        ${customCake.size || "Not selected"}
    </div>

    <div class="review-row">
        <strong>Shape:</strong>
        ${customCake.shape || "Not selected"}
    </div>

    <div class="review-row">
        <strong>Theme:</strong>
        ${customCake.theme || "Not selected"}
    </div>

    <div class="review-row">
        <strong>Extras:</strong>
        ${
            customCake.extras.length > 0
            ? customCake.extras.map(e => e.name).join(", ")
            : "None"
        }
    </div>

    <div class="review-row">
        <strong>Special Note:</strong>
        ${customCake.note || "None"}
    </div>

    <div class="review-row">
        <strong>Total:</strong>
        Rs. ${total}
    </div>
    `;
}



function addCustomCakeToCart(){

    let total = updatePrice();

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({

        name:
        `${customCake.flavour} Custom Cake`,

        image: customCake.image,

        price: total,

        quantity: 1
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Custom Cake Added To Cart!");

    window.location.href="/order";
}

// CHAT

function openChat(){

    document
    .getElementById("chatPopup")
    .classList.remove("hidden");
}

function closeChat(){

    document
    .getElementById("chatPopup")
    .classList.add("hidden");
}

function sendMessage(){

    const input =
    document.getElementById("chatInput");

    if(input.value.trim() === "") return;

    const body =
    document.getElementById("chatBody");

    body.innerHTML += `
        <div class="message user">
            ${input.value}
        </div>
    `;

    setTimeout(() => {

        body.innerHTML += `
            <div class="message support">
                Thank you! Our cake designer
                will contact you soon.
            </div>
        `;

        body.scrollTop = body.scrollHeight;

    },1000);

    input.value = "";

    body.scrollTop = body.scrollHeight;
}

// INITIAL LOAD

updateSummary();
