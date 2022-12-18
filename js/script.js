let dataSet;
fetch("../data.json")
  .then((res) => res.json())
  .then((data) => {
    dataSet = data;
    displayData(data);
  });

function displayData(data) {
  const cardContainer = document.getElementById("homepage-content");
  data.forEach((element) => {
    const { id, price, img, name } = element;

    const divContainer = document.createElement("div");
    divContainer.classList.add("card", "bg-base-100", "shadow-2xl");
    divContainer.innerHTML = `
     
            <figure class="p-4">
              <img
                src="${img}"
                class="rounded-md"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <div class="flex justify-between">
                <h2 class="card-title">${name}</h2>
                <div>
                  <span
                    ><i
                      class="fa-sharp fa-solid fa-heart mr-2 text-slate-400"
                    ></i
                  ></span>
                  <span
                    ><i class="fa-regular fa-square-minus text-red-600"></i
                  ></span>
                </div>
              </div>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <h2 class="card-title">Price: $${price}</h2>
              <div class="card-actions justify-between">
                <button onclick="handleBuyNow('${id}')" class="btn btn-primary btn-outline">
                  <i class="fa-solid fa-bag-shopping mr-2"></i>
                  Buy Now
                </button>
                <label onclick="handleModal('${id}')" for="my-modal-3" class="btn btn-secondary btn-outline"
                  ><i class="fa-solid fa-circle-info mr-2"></i> See
                  Details</label
                >
                
              </div>
            </div>
          
    `;
    cardContainer.appendChild(divContainer);
  });
}
function handleModal(id) {
  const product = dataSet.find((item) => item.id === id);
  console.log(product);
  const { price, name, img } = product;
  const modalContainer = document.getElementById("modal-info");
  modalContainer.innerHTML = `
  <div>
  <img
  class="w-full h-[400px] rounded-3xl"
  src="${img}"
  alt=""
/>
<h1 class="text-2xl font-bold">
  <span class="text-violet-600">Product:</span>${name}
</h1>
<p class="text-xl text-gray-600">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Necessitatibus ullam maxime ab accusantium eos eaque quidem?
  Suscipit praesentium dicta architecto?
</p>
<h1 class="text-2xl font-bold text-violet-600">Features:</h1>
<p class="text-xl text-gray-600">
  features 1,features 2,features 3
</p>
<h1 class="text-2xl font-bold">
  <span class="text-violet-600">Price:</span> $${price}
</h1>
</div>
  `;
}
let count = 0;
let newPrice = 0;
let tax = 0;
function handleBuyNow(id) {
  count = count + 1;

  const product = dataSet.find((item) => item.id == id);
  const { price, name, img } = product;
  newPrice = newPrice + product.price;
  tax = newPrice * 0.1;
  totalPrice = newPrice + tax;

  const cartContainer = document.getElementById("cart-items-container");
  const div = document.createElement("div");
  div.classList.add(
    "border-2",
    "border-orange-400",
    "p-2",
    "bg-slate-500",
    "text-white",
    "rounded-lg",
    "flex",
    "justify-between",
    "items-center",
    "mb-2"
  );
  div.innerHTML = `
  <img
              class="w-[15%] h-[70px] rounded-md"
              src="${img}"
              alt=""
            />
            <p class="text-gray text-xl">${name}</p>
            <h1 class="text-2xl border-2 rounded-md px-4 py-1">1</h1>
            <i
              class="fa-solid fa-trash text-2xl text-orange-400 cursor-pointer"
            ></i>
  `;
  cartContainer.appendChild(div);
  document.getElementById("badge-count").innerText = count;
  document.getElementById("product-count").innerText = count;
  document.getElementById("price").innerText = newPrice.toFixed(2);
  document.getElementById("tax").innerText = tax.toFixed(2);
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}
function handleClear() {
  document.getElementById("cart-items-container").innerHTML = " ";
  document.getElementById("cart-cart").innerHTML = " ";
}
