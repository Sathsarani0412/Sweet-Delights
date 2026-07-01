async function loadCakes(){

    const response = await fetch('/get-cakes');

    const cakes = await response.json();

    displayCakes(cakes);

}




function displayCakes(cakes){

    const cakesGrid = document.getElementById('cakesGrid');

    cakesGrid.innerHTML = '';

    cakes.forEach(cake => {

        cakesGrid.innerHTML += `

        <div class="cake-card">

            <div class="cake-image">

                <img src="${cake.image}">

            </div>

            <div class="cake-content">

                <h3>${cake.name}</h3>

                <p class="description">
                    ${cake.description}
                </p>

                <p class="price">
                    Rs. ${cake.price}
                </p>

                <button onclick="addToCart('${cake.name}', ${cake.price}, '${cake.image}')">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Add to Cart

                </button>

            </div>

        </div>

        `;

    });

}




loadCakes();




const searchInput = document.getElementById('searchInput');

if(searchInput){

    searchInput.addEventListener('keyup', async () => {

        const keyword = searchInput.value;

        const response = await fetch(`/search-cakes?keyword=${keyword}`);

        const cakes = await response.json();

        displayCakes(cakes);

    });

}



const sidebarSearch = document.getElementById('sidebarSearch');

if(sidebarSearch){

    sidebarSearch.addEventListener('keyup', async () => {

        const keyword = sidebarSearch.value;

        const response = await fetch(`/search-cakes?keyword=${keyword}`);

        const cakes = await response.json();

        displayCakes(cakes);

    });

}
