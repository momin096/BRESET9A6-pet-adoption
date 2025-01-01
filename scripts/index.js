const loadPage = () => {
    document.getElementById('loading').classList.remove('hidden');
    setTimeout(() => {
        loadCategories();
        loadAllPets(); f
    }, 1000)
}
const loadCategories = async () => {
    document.getElementById('loading').classList.add('hidden');
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
    else {
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
                        <button onclick="displayLikedPicture(${item.petId})" class="btn border  rounded-lg px-2 md:px-4"><img class="w-5 md:w-8" src="https://img.icons8.com/?size=100&id=CdM0CVTrcHP0&format=png&color=000000"/></button>
                        <button onclick="displayAdoptionModal()" id="${item.petId}" class="btn  text-xl md:text-2xl pet-text-primary font-bold border rounded-lg px-2 md:px-4 py-1">Adopt</button>
                        <button onclick="showDetails(${item.petId})" class="btn text-xl md:text-2xl pet-text-primary font-bold border rounded-lg px-2 md:px-4 py-1">Details</button>
                    </div>
                </div>
            </div>
        `;

        petsContainer.append(card);
        

    })
};

const showDetails = async (petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();

    const { image, breed, date_of_birth, gender, pet_details, price, vaccinated_status, pet_name } = data.petData;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <dialog id="my_modal" class="modal ">
            <div class="modal-box max-h-screen w-auto max-w-2xl ">
                <figure class="mb-2 flex justify-center h-5/6 items-center">
                    <img src=${image} alt="Pets"  class="rounded-xl w-full object-cover" />
                </figure>
                <div class="">
                    <h2 class="text-xl font-bold">${pet_name}</h2>
                    <div class="grid grid-cols-2 gap-x-3">
                        <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/breed.svg" />
                            Breed: ${breed ? breed : 'No Data'}
                        </span>
                        <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/date.svg" />
                            Birth: ${date_of_birth ? date_of_birth : 'No Data'}
                        </span>
                        <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/gender.svg" />
                            Gender: ${gender ? gender : 'No Data'}
                        </span>
                        <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/dollar.svg" />
                            Price: ${price ? price : 'Up Coming'}$
                        </span>    
                        <span class="flex items-center gap-1 text-gray-500">
                            <img src="./icons/gender.svg" />
                            Vaccinated status: ${vaccinated_status ? vaccinated_status : 'N/A'} 
                        </span>    

                    </div>
                
                <hr class="border-2 my-3">
                <p class="font-bold">Details Information</p>
                <p class="text-gray-600 font-light">${pet_details}</p>
                <div class="my-2">
                    <form id="click-form" method="dialog flex">
                        <!-- if there is a button, it will close the modal -->
                        <button  class="btn w-full pet-text-primary modal-border bg-[#0e79814d]">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    `;

    my_modal.showModal();
}

const displayAdoptionModal = () => {
    
    const adoptionModalContainer = document.getElementById('adoption-modal-container');
    adoptionModalContainer.innerHTML = `
        <dialog id="adoption_modal" class="modal">
            <div class="modal-box text-center">
                <div class="justify-center inline-block w-28"> 
                    <img class="w-full" src="./icons/handshake.gif" /> 
                </div>
                <h3 class="text-4xl font-bold">Congrats!</h3>
                <p class="py-4">Adoption Progress is Start For Your Pet</p>
                <div id="count-down" class="text-6xl font-bold">  
                </div>
            </div>
        </dialog>
    `;
    const countDown = document.getElementById('count-down');
    let count = 3;

    const countStart = setInterval(() => {
        countDown.textContent = count;
        
        if(count === 0){
            clearInterval(countStart)
        }
        
        count --;

    }, 1000);

    adoption_modal.showModal();
    setTimeout(() => {
        closeAdoptionModal();
    }, 4000);

}

const closeAdoptionModal = () =>{
    const adoptionModalContainer = document.getElementById('adoption-modal-container');
    adoptionModalContainer.innerHTML = '';
}

const displayLikedPicture = async (petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();


    const likedPetsContainer = document.getElementById('liked-pets');
    const pics = document.createElement('div');
    pics.classList = "p-1 md:p-2 rounded-xl border";
    pics.innerHTML = `
        <img class="rounded-lg" src=${data.petData.image} alt="pet"/>
    `;
    likedPetsContainer.append(pics);
}


loadPage();