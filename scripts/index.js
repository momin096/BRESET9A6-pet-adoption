
const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    displayCategories(data.categories);
}

const loadAllPets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayAllPets(data.pets);
}

const loadCategoryPets = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id == 1 ? 'cat' : id == 2 ? 'dog' : id == 3 ? 'rabbit' : id == 4 ? 'bird' : ''}`);
    const data = await response.json();
    document.getElementById('loading').classList.add('hidden');
    displayAllPets(data.data);
}

const loadCategoryPetsLoading = (id) => {
    document.getElementById('loading').classList.remove('hidden');
    setTimeout(() => {
        loadCategoryPets(id);
    }, 2000);
};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(item => {
        // create button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <div id="${item.id}" onclick="loadCategoryPetsLoading(${item.id})" class="flex gap-2 items-center justify-center border px-12 py-3 rounded-md ">
                <img class="w-8" src=${item.category_icon}/>
                <button   class="category-btn text-2xl font-semibold ">${item.category}s</button>
            </div>
        `;
        categoryContainer.append(buttonContainer);

    });
};

const displayAllPets = (data) => {
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';
    const likedPetsContainer = document.getElementById('liked-pets');

    if (data.length == 0) {
        document.getElementById('best-deal').innerHTML = '';
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
            <div>
                <h1>No Data Found</h1>
            </div>

        `;
    }
    else{
        document.getElementById('best-deal').innerHTML = `
            <h2 class="text-xl font-extrabold">Best Deal For you</h2>
            <button class="btn pet-btn-primary hover:text-gray-800">Sort by Price</button>
        `;
        petsContainer.classList.add('grid');
    }
    data.forEach(item => {
        const card = document.createElement('div');
        
        // console.log(item.petId)
        card.innerHTML = `
            <div class="card bg-base-100 border rounded-2xl px-3 py-3">
                <figure class="mb-2">
                    <img src=${item.image} alt="Shoes"  class="rounded-xl h-48 w-full object-cover" />
                </figure>
                <div class="">
                    <h2 class="text-xl font-bold">${item.pet_name}</h2>
                    <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/breed.svg" />
                            Breed: ${item.breed ? item.breed : 'No Data'}
                    </span>
                    <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/date.svg" />
                            Birth: ${item.date_of_birth ? item.date_of_birth : 'No Data'}
                    </span>
                    <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/gender.svg" />
                            Gender: ${item.gender ? item.gender : 'No Data'}
                    </span>
                    <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/dollar.svg" />
                            Price: ${item.price ? item.price : 'Up Coming'}$
                    </span>
                    <hr class="border-1 my-2">
                    <div class="card-actions flex justify-between">
                        <button class="border btn rounded-lg px-4 py-1"><img class="w-8" src="https://img.icons8.com/?size=100&id=CdM0CVTrcHP0&format=png&color=000000"/> </button>
                        <button class="text-2xl pet-text-primary font-bold border rounded-lg px-4 py-1">Adopt</button>
                        <button class="text-2xl pet-text-primary font-bold border rounded-lg px-4 py-1">Details</button>
                    </div>
                </div>
            </div>
        `;
        
        petsContainer.append(card);

    })
};

loadCategories();
loadAllPets();