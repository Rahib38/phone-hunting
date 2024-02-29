const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones, isShowAll)
}
const displayPhones = (phones, isShowAll) =>{

        const phoneContainer = document.getElementById("phone-container");
        phoneContainer.textContent = '';
        const showBtn = document.getElementById('show-btn');
        if(phones.length > 12 && !isShowAll){
            showBtn.classList.remove("hidden")
        }else{
            showBtn.classList.add('hidden');
        }
 
        if(!isShowAll){
            phones = phones.slice(0, 12);
        }
        
    phones.forEach(phone => {
        // console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact   p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `<figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}') "
             class="btn btn-primary">See More Details</button>
          </div>
        </div>`
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

const handleShowDetail = async(id) =>{
    console.log('clicked show details', id);
    const res = await fetch( `https://openapi.programming-hero.com/api/phone/${id}`);
    
    const data = await res.json();
    console.log(data)
    const phone =data.data;
    showPhoneDetails(phone);
    
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('show_phone_name')
    phoneName.innerText =  phone.name;

    const showDetailsContainer = document.getElementById('phoneDetailsContainer');
    showDetailsContainer.innerHTML= `
    <img class="text-center" src="${phone.image}" alt=""/>
     <p><span class="text-xl font-semibold">Storage: </span>${phone?.mainFeatures.storage}</p>
     <p><span class="text-xl font-semibold">Display Size: </span>${phone?.mainFeatures.displaySize}</p>
     <p><span class="text-xl font-semibold">Chipset: </span>${phone?.mainFeatures.chipSet}</p>
     <p><span class="text-xl font-semibold">Memory: </span>${phone?.mainFeatures.memory}</p>
     <p><span class="text-xl font-semibold">Slug: </span>${phone?.slug}</p>
     <p><span class="text-xl font-semibold">Release data: </span>${phone?.releaseDate
     }</p>
     <p><span class="text-xl font-semibold">Brand: </span>${phone?.brand}</p>

    `
    


    show_details_modal.showModal()
}

const handleSearch = (isShowAll)  =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-filed");
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById("loading-spiner");
    
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const seeMore = () =>{
    handleSearch(true);
}
