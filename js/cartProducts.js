let price = document.getElementById("price")
let totalPrice = 0;
let favSection = document.querySelector('.product-container');
let nxtBtn = document.querySelector('.nxt-btn');
let preBtn = document.querySelector('.pre-btn');
// cartPage
function removeItemsFromCart(id) {
    let choosenItem = products.find((element) => element.id == id);
    let index = cartItem.indexOf(choosenItem)
    cartItem.splice(index, 1)
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
    counter.innerHTML = `${cartItem.length}`
    let removedItem = document.getElementById(choosenItem.id + "a")
    let removedCartItem = document.getElementById(choosenItem.id + "kk")
    removedItem.remove()
    removedCartItem.remove()
    calculatePrice()
  }

  if(localStorage.getItem('cartItem')){
    let item= JSON.parse(localStorage.getItem('cartItem')) 
    cartItem = [...item]
    counter.innerHTML = `${cartItem.length}`
    if (cartItem.length != 0 ) {
      cartProductsShow("cartItem")
    }
  }
function minusCartBtn(id) {
    let choosenItem = cartItem.find((element) => element.id == id) 
    let index = cartItem.indexOf(choosenItem)
    cartItem.splice(index, 1)
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
    choosenItem.number -= 1
    if (choosenItem.number >= 1) {
      cartItem.splice(index, 0, choosenItem)
      localStorage.setItem("cartItem", JSON.stringify(cartItem))
      cartProduct(index)
      cartProductsShow(index)
    } else {
      let removedItem = document.getElementById(choosenItem.id + "kk")
      let cartRemovedItem = document.getElementById(choosenItem.id + "a")
      removedItem.remove()
      cartRemovedItem.remove()
      counter.innerHTML = `${cartItem.length}`
    }
    calculatePrice()
  }

function cartProductsShow(index) {
    if (index =="cartItem") {
      cartItem.map((element) => {
        cartProducts.innerHTML += `
        <div class="cart-page-product d-flex" id="${element.id}a">
                  <div class="img" style="background-color: azure; border-radius: 12px; margin-right: 40px;">
                  <figure>
                      <img src="${element.image}" style="width: 150px; height: 150px;">
                  </figure>
                  </div>
                  
                  <div class="cart-product-content">
                      <h5 class="card-title fs-4 bottom">product : ${element.product}</h5>
                      <h5 class="card-title fs-4 bottom">category : ${element.category}</h5>
                      <h5 class="card-title fs-4 bottom">Price : ${element.price}$</h5>
                      <div class="number d-flex">
                          <span style="margin-right: 10px; color: black;" class="fs-4">${element.number}</span>
                          <a href="#"><i class="fas fa-plus text-success fs-5" style="margin-top: 10px" onClick="plusBtn(${element.id})"></i></a>
                          <a href="#"><i class="fas fa-minus text-danger fs-5" style="margin: 10px 0 0 10px" onClick="minusCartBtn(${element.id})"></i></a>
                          <button class="btn btn-danger" style="margin-left: 120px" id="${element.id}0000" onClick='removeItemsFromCart(${element.id})'>Remove</button>
                      </div>
                  </div>
              </div>
          
        `
        calculatePrice()
      })
    } else {
      let choosenCartProduct = document.getElementById(cartItem[index].id +'a')
      choosenCartProduct.innerHTML = `
                <div class="img" style="background-color: azure; border-radius: 12px; margin-right: 40px;">
                <figure>
                    <img src="${cartItem[index].image}" style="width: 150px; height: 150px;">
                </figure>
                </div>
                
                <div class="cart-product-content">
                    <h5 class="card-title fs-4 bottom">product : ${cartItem[index].product}</h5>
                    <h5 class="card-title fs-4 bottom">category : ${cartItem[index].category}</h5>
                    <h5 class="card-title fs-4 bottom">Price : ${cartItem[index].price}$</h5>
                    <div class="number d-flex">
                        <span style="margin-right: 10px; color: black;" class="fs-4">${cartItem[index].number}</span>
                        <a href="#"><i class="fas fa-plus text-success fs-5" style="margin-top: 10px" onClick="plusBtn(${cartItem[index].id})"></i></a>
                        <a href="#"><i class="fas fa-minus text-danger fs-5" style="margin: 10px 0 0 10px" onClick="minusCartBtn(${cartItem[index].id})"></i></a>
                        <button class="btn btn-danger" style="margin-left: 120px" id="${cartItem[index].id}0000" onClick='removeItemsFromCart(${cartItem[index].id})'>Remove</button>
                    </div>
                </div>        
      `
      calculatePrice()
    }
  }

function calculatePrice() {
    totalPrice = 0
    cartItem.map((element) => {
        let productPrice = element.price * element.number
        totalPrice += productPrice
    }) 
    price.innerHTML = `${totalPrice}` 
}

// favorite section
let savedWhislist = []
if (localStorage.getItem("whislist")) {
  savedWhislist = [...JSON.parse(localStorage.getItem("whislist"))]
  savedWhislist.map((element) => {
    favSection.innerHTML += `
    <div class="product-card" id="${element.id}w">
    <div class="product-image">
        <img src="${element.image}" class="product-thumb" width="200px" height="200px">
    </div>
    <div class="product-info">
        <h4 class="product-brand">Product: ${element.product}</h4>
        <span class="product-short-description">category: ${element.category}</span>
        <i class="fas fa-heart whislist-heart" onClick=removeFromWhislist(${element.id})></i>
    </div>
</div>
    `
  })
  let containerDimensions = favSection.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn.addEventListener('click', () => {
      favSection.scrollLeft += containerWidth;
  })

  preBtn.addEventListener('click', () => {
      favSection.scrollLeft -= containerWidth;
  })
} else {
  nxtBtn.style.display = "none"
  preBtn.style.display = "none"
}

function removeFromWhislist(id) {
  let choosenItem = savedWhislist.find((element) => element.id == id)
  let whislistedProduct = document.getElementById(id + "w")
  let index = savedWhislist.indexOf(choosenItem)
  savedWhislist.splice(index, 1)
  whislistedProduct.remove()
  localStorage.setItem("whislist", savedWhislist)
  
}