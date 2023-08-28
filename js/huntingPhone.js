const huntingPhone = async (searchUrPhone, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchUrPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phone, isShowAll) => {

    const phoneContainer = document.getElementById('allPhoneContainer');
    phoneContainer.textContent = '';

    const showAllPhone = document.getElementById('showAllContainer');
    if (phone.length > 12 && !isShowAll) {
        showAllPhone.classList.remove('hidden');
    }
    else {
        showAllPhone.classList.add('hidden')
    }

    /* display specific numbers of phones */
    if (!isShowAll) {
        phone = phone.slice(0, 12);
    }

    const phones = phone.forEach(phone => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `<div id="cardContainer" class="card-one bg-green-100 p-3">
        <div class="img bg-gray-300 lg:py-8 md:py-5 py-4">
          <img class="w-2/5 mx-auto" src="${phone.image}" alt="" />
        </div>


    <div class="h-52">
            <h1 class="text-[#403F3F] font-bold lg:text-2xl text-xl text-center py-6">
            ${phone.phone_name}
        </h1>

        <h1 class="text-[#403F3F] font-bold text-lg text-center py-2">
        Brand: ${phone.brand}
        </h1>

        <div class="lg:text-base md:text-lg text-sm text-[#706F6F] text-center mb-3">
            <h1>${phone.slug}</h1>
        </div>

        <div class="flex justify-center">
            <button
            onclick="showDetails('${phone.slug}')" 
            class="bg-blue-500 py-2 px-6 text-white font-medium text-lg rounded-md"
            >
            Show Details
            </button>
        </div>
    </div>


      </div>`
        phoneContainer.appendChild(cardDiv);
    });
    loadingSpinners(false);
}

const afterClickSearch = (isShowAll) => {

    loadingSpinners(true);
    // const searchButton = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchField');
    const searchValue = searchInput.value;
    huntingPhone(searchValue, isShowAll);
    console.log(searchValue);
}

/* phone details button click */
const showDetails = async (id) => {
    console.log('clicked show details', id);
    // load phone details data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    // console.log(phoneDetails);
    showDetailsModals(phoneDetails)
}

/* Show details modal */
const showDetailsModals = (phone) => {
    console.log(phone);
    const show_detail_modals = document.getElementById('show_detail_modal');
    show_detail_modals.showModal();

    const phoneImage = document.getElementById('imageInModal');
    phoneImage.innerHTML = `<img class="w-2/6" src="${phone.image}" alt="" />`;

    const phoneName = document.getElementById('phoneNameInModal');
    const phoneStorage = document.getElementById('phoneStorageInModal');
    const phoneDisplay = document.getElementById('phoneDisplayModal');
    const phoneCheap = document.getElementById('phoneCheap');
    const phoneMemory = document.getElementById('phoneMemory');
    const phoneSlug = document.getElementById('phoneUrl');
    const phoneRelease = document.getElementById('release');
    const phoneBrand = document.getElementById('brand');
    const phoneGps = document.getElementById('gps');

    phoneName.innerHTML = `${phone.name}`;
    phoneStorage.innerHTML = `<span class="text-black font-bold">Storage:</span> ${phone.mainFeatures?.storage || 'No Data'}`;
    phoneDisplay.innerHTML = `<span class="text-black font-bold">Display:</span> ${phone.mainFeatures?.displaySize || 'No Data'}`;
    phoneCheap.innerHTML = `<span class="text-black font-bold">ChipSet:</span> ${phone.mainFeatures?.chipSet || 'No Data'}`;
    phoneMemory.innerHTML = `<span class="text-black font-bold">Memory:</span> ${phone.mainFeatures?.memory || 'No Data'}`;
    phoneSlug.innerHTML = `<span class="text-black font-bold">Slug:</span> ${phone.slug || 'No Data'}`;
    phoneRelease.innerHTML = `<span class="text-black font-bold">Release:</span> ${phone.releaseDate || 'No Data'}`;
    phoneBrand.innerHTML = `<span class="text-black font-bold">Brand:</span> ${phone.brand || 'No Data'}`;
    phoneGps.innerHTML = `<span class="text-black font-bold">GPS:</span> ${phone.others?.GPS || 'No Data'}`;
}

// loading spinners toggled
const loadingSpinners = (isToggled) => {
    const spinners = document.getElementById('loadingSpinner');
    if (isToggled) {
        spinners.classList.remove('hidden')
    }
    else {
        spinners.classList.add('hidden')
    }
}

// showAll button clicked
const showAll = () => {
    afterClickSearch(true)
}

huntingPhone('iphone');