// ===============================
// LOAD FEATURED CAKES
// ===============================

async function loadFeaturedCakes(){

    const response = await fetch('/get-cakes');

    const cakes = await response.json();

    const cakesGrid = document.getElementById('featuredCakes');

    if(!cakesGrid) return;

    cakesGrid.innerHTML = '';

    cakes.slice(0,4).forEach(cake => {

        cakesGrid.innerHTML += `

        <div class="cake-card">

            <div class="cake-image">

                <img src="${cake.image}">

            </div>

            <div class="cake-content">

                <h3>${cake.name}</h3>

                <p class="description">
                    ${cake.description || ''}
                </p>

                <div class="cake-bottom">

                    <p>Rs. ${cake.price}</p>

                    <button onclick="addToCart('${cake.name}', ${cake.price}, '${cake.image}')">

                        <i class="fa-solid fa-cart-shopping"></i>

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

loadFeaturedCakes();


// ===============================
// HOME SEARCH
// ===============================

const homeSearch = document.getElementById('homeSearch');

if(homeSearch){

    homeSearch.addEventListener('keyup', async () => {

        const keyword = homeSearch.value;

        const response = await fetch(`/search-cakes?keyword=${keyword}`);

        const cakes = await response.json();

        const cakesGrid = document.getElementById('featuredCakes');

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
                        ${cake.description || ''}
                    </p>

                    <div class="cake-bottom">

                        <p>Rs. ${cake.price}</p>

                        <button onclick="addToCart('${cake.name}', ${cake.price}, '${cake.image}')">

                            <i class="fa-solid fa-cart-shopping"></i>

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    });

}