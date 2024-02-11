let counter = document.getElementById("counter")
let shoppingCart = document.querySelector(".shopping-cart")
let productCart = document.querySelector(".product-cart")
let productCartDisplay = document.querySelector(".product-cart div")
let cartProducts = document.querySelector(".cart-Products")
var cartItem = []

// add or remove products from cart
function addToCart(id) {
    let choosenItem = products.find((element) => element.id == id);
    let addBtn = document.getElementById(id)
    let removeBtn = document.getElementById(id + "0000")
    choosenItem.number = 1
    if (localStorage.getItem("login")) {
      addBtn.style.display = "none"
      removeBtn.style.display = "inline-block"
      cartItem.push(choosenItem)
      localStorage.setItem("cartItem", JSON.stringify(cartItem))
      counter.innerHTML = `${cartItem.length}`
      cartProduct("NO", choosenItem)
    } else {
    signInButton.click()
   }
  }
  
  function removeItems(id) {
    let choosenItem = products.find((element) => element.id == id);
    let addBtn = document.getElementById(id)
    let removeBtn = document.getElementById(id + "0000")
    removeBtn.style.display = "none"
    addBtn.style.display = "inline-block"
    let index = cartItem.indexOf(choosenItem)
    cartItem.splice(index, 1)
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
    counter.innerHTML = `${cartItem.length}`
    let removedItem = document.getElementById(choosenItem.id + "kk")
    removedItem.remove()
  }

  if(localStorage.getItem('cartItem')){
    let item= JSON.parse(localStorage.getItem('cartItem')) 
    cartItem = [...item]
    counter.innerHTML = `${cartItem.length}`
    if (cartItem.length != 0 ) {
      cartProduct("cartItem")
    }
  }

  // product cart
function cartProduct(index, value="") {
  if (value != "") {
    productCartDisplay.innerHTML += `
    <div id="${value.id}kk">
    <div class="cart-product" style="padding-top: 8px">
    <div class="product-content d-flex justify-content-between ms-1 me-1">
        <span style="color: black" class="fs-5">${value.product}</span>
        <div>
            <span style="margin-right: 4px; color: black;" class="fs-5">${value.number}</span>
            <a href="#"><i class="fas fa-plus text-success" onClick="plusBtn(${value.id})"></i></a>
            <a href="#" style="margin-left: 4px"><i class="fas fa-minus text-danger" onClick="minusBtn(${value.id})"></i></a>
        </div>
    </div>
  </div>
  </div>
    `
  } else if (index == "cartItem") {
    cartItem.map(choosenItem => {
      productCartDisplay.innerHTML += `
      <div id="${choosenItem.id}kk">
      <div class="cart-product" style="padding-top: 8px">
      <div class="product-content d-flex justify-content-between ms-1 me-1">
          <span style="color: black" class="fs-5">${choosenItem.product}</span>
          <div>
              <span style="margin-right: 4px; color: black;" class="fs-5">${choosenItem.number}</span>
              <a href="#"><i class="fas fa-plus text-success" onClick="plusBtn(${choosenItem.id})"></i></a>
              <a href="#" style="margin-left: 4px"><i class="fas fa-minus text-danger" onClick="minusBtn(${choosenItem.id})"></i></a>
          </div>
      </div>
    </div>
    </div>
      `
    })
  }
   else {
    let edited = document.getElementById(cartItem[index].id +"kk")
    edited.innerHTML = `
    <div class="cart-product" style="padding-top: 8px">
    <div class="product-content d-flex justify-content-between ms-1 me-1">
        <span style="color: black" class="fs-5">${cartItem[index].product}</span>
        <div>
            <span style="margin-right: 4px; color: black;" class="fs-5">${cartItem[index].number}</span>
            <a href="#"><i class="fas fa-plus text-success" onClick="plusBtn(${cartItem[index].id})"></i></a>
            <a href="#" style="margin-left: 4px"><i class="fas fa-minus text-danger" onClick="minusBtn(${cartItem[index].id})"></i></a>
        </div>
    </div>
  </div>
    `
  }
}


shoppingCart.addEventListener("click", () => {
  if (productCart.style.display == "block") {
    productCart.style.display = "none"
  } else {
    productCart.style.display = "block"
  }
})

// add or minus from product card

function plusBtn(id) {
  let choosenItem = cartItem.find((element) => element.id == id) 
  let index = cartItem.indexOf(choosenItem)
  cartItem.splice(index, 1)
  choosenItem.number += 1
  localStorage.setItem("cartItem", JSON.stringify(cartItem))
  cartItem.splice(index, 0, choosenItem)
  localStorage.setItem("cartItem", JSON.stringify(cartItem))
  cartProduct(index)
  cartProductsShow(index)
}

function minusBtn(id) {
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
    try {
      let addBtn = document.getElementById(id)
      let removeBtn = document.getElementById(id + "0000")
      addBtn.style.display = "inline-block"
      removeBtn.style.display = "none"
      removedItem.remove()
      calculatePrice()
    } catch {
      let anotherRemoveItem = document.getElementById(choosenItem.id + "a")
      removedItem.remove()
      anotherRemoveItem.remove()
      calculatePrice()
    }
    counter.innerHTML = `${cartItem.length}`
  }
}


