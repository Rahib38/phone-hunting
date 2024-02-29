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
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>`
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
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
