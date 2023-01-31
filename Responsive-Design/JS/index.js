let dataSet;
fetch("../JS/data.json")
    .then((res) => res.json())
    .then((data) => {
        dataSet = data;
        disolayData(data);
    })

function disolayData (data) {
    const cartContainer = document.getElementById("homPage-content");
    data.forEach(element => {
        const {id, price, img, name} = element;
        const divContainer = document.createElement("div");
        divContainer.classList.add("card", "bg-slate-700", "shadow-xl");
        divContainer.innerHTML = `
        <div class="p-4">
        <figure><img src="${img}" class="rounded-lg h-[400px]" alt="Shoes" /></figure>
      </div>
      <div class="card-body">
        <div id="card-titale-card-icons" class="flex justify-between">
          <h2 class="card-title">${name}</h2>
        <div>
          <span><i class="fa-solid fa-heart mr-2 cursor-pointer"></i></span>
          <span><i class="fa-regular fa-square-minus text-red-600 cursor-pointer"></i></span>
        </div>
        </div>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <h2 class="card-title">Price: $${price}</h2>
        <div class="flex justify-between">
          <label onclick ="handleModal('${id}')" for="my-modal" class="btn btn-outline btn-warning w-[46%]"><i class="fa-solid fa-circle-info mr-2"></i>SEE DETAILS</label>
          <button onclick ="handleBuyNow('${id}')" class="btn btn-outline btn-warning w-[46%]"><i class="fa-solid fa-bag-shopping mr-2"></i>BUY NOW</button>
        </div>
      </div>
        `;
        cartContainer.appendChild(divContainer);
    });
};

function handleModal (id) {
    const product = dataSet.find(item => item.id === id);
    const {price, img, name} = product;
    const myModal = document.getElementById("modal-info");
    myModal.innerHTML = `
    <img src="${img}" class="rounded-lg" alt="">
    <h3 class="font-bold text-lg"><span class="text-primary">PRODUCT:</span> <span class="text-white">${name}</span></h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <h3 class=""><span class="text-primary font-bold text-lg">FEATURES:</span> <p>features01,features02,features03</p></h3>
    <h3 class=""><span class="text-primary font-bold text-lg">PRICE:</span> <span class="text-white">$${price}</span></h3>
    <div class="modal-action">
      <label for="my-modal" class="btn">Close</label>
    </div>
    `;
};


let count = 0;
let productPrice = 0;
let productTax = 0;
let totalPrice = 0;
function handleBuyNow (id) {
    count++;
    const product = dataSet.find(item => item.id === id);
    const {price, img, name} = product;
    productPrice = productPrice + price;
    productTax = productPrice * 0.1;
    totalPrice = productPrice + productTax;
    const cartItemContainer = document.getElementById("cart-item-container");
    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center", "border", "boredr-[2px]", "rounded-md", "bg-slate-700", "p-3", "mt-3");
    div.innerHTML = `
    <img src="${img}" class="w-[20%] rounded-md" alt="">
    <p>${name}</p>
    <kbd class="kbd border-yellow-600 text-white">${id}</kbd>
    <button onclick="sharpContent()"><i class="fa-sharp fa-solid fa-trash hover:text-stone-600 text-red-500 text-xl"></i></button>
    `;
    cartItemContainer.appendChild(div);

    document.getElementById("badge-count").innerText = count;
    document.getElementById("product-count").innerText = count;
    document.getElementById("product-price").innerText = productPrice.toFixed(2);
    document.getElementById("product-tax").innerText = productTax.toFixed(2);
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}
console.log(productPrice);

function cleareCart(){
    count = "";
    document.getElementById("cart-item-container").innerHTML ="";
    document.getElementById("badge-count").innerText ="0";

    document.getElementById("badge-count").innerText = "0";
    document.getElementById("product-count").innerText = "0";
    document.getElementById("product-price").innerText = "0";
    document.getElementById("product-tax").innerText = "0";
    document.getElementById("total-price").innerText = "0";
}

