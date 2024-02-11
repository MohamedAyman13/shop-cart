let productSection = document.querySelector("#products-section")
let productSearch = document.querySelector("#search")
let selectOption = document.querySelector('#search-select')
let filterlist = []
var whislistArray = []



// products in the page
function websiteProduct(array) {
  productSection.innerHTML = ""
  array.map((element) => {
    productSection.innerHTML += `
    <div class="card col-lg-4 col-md-6 col-sm-12">
    <img src="${element.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${element.product}</h5>
      <h5 class="card-title">category: ${element.category}</h5>
      <h5 class="card-title">Price: ${element.price}$</h5>
      <button class="btn btn-primary productbtn" id="${element.id}" onClick="addToCart(${element.id})">Add To Cart</button>
      <button class="btn btn-danger" style="display: none" id="${element.id}0000" onClick='removeItems(${element.id})'>Remove from cart</button>
      <i class="fas fa-heart heart-icon-style" id="${element.id}00" onClick="addToWhislist(${element.id})"></i>
    </div>
  </div>`
});
}
websiteProduct(products)

// product search
productSearch.addEventListener("input", e => {
  let text = e.target.value.toLowerCase()
  if (selectOption.value === "product") {
    filterlist = products.filter(element => {
      if(element.product.toLowerCase().includes(text)) {
        return element.product
      }
    })
    if (this.value =="") {
      websiteProduct(products)
    }
    else {
      if (filterlist == "") {
        productSection.innerHTML = ""
      }
      else {
        websiteProduct(filterlist)
      }
    }
  } else if (selectOption.value === "category") {
    filterlist = products.filter(element => {
      if(element.category.toLowerCase().includes(text)) {
        return element.category
      }
    })
    if (this.value =="") {
      websiteProduct(products)
    }
    else {
      if (filterlist == "") {
        productSection.innerHTML = ""
      }
      else {
        websiteProduct(filterlist)
      }
    }
  }
})

if(localStorage.getItem('cartItem')){
  let item= JSON.parse(localStorage.getItem('cartItem')) 
  cartItem = [...item]
  counter.innerHTML = `${cartItem.length}`
  for(let i =0;i<item.length;i++){
      let addBtn = document.getElementById(item[i].id)
      addBtn.style.display = "none"
      let removeBtn = document.getElementById(item[i].id + "0000")
      removeBtn.style.display = "inline-block"
  }
}

// whislist in the website
function addToWhislist(id) {
  let choosenItem = products.find((element) => element.id == id);
  let heart = document.getElementById(id + "00")
  if(localStorage.getItem("login")) {
    if (heart.style.color == "red") {
      heart.style.color = "#8080809a"
      let index = whislistArray.indexOf(choosenItem)
      whislistArray.splice(index, 1)
      localStorage.setItem("whislist", JSON.stringify(whislistArray))
    } else {
      heart.style.color = "red"
      whislistArray.push(choosenItem)
      localStorage.setItem("whislist", JSON.stringify(whislistArray))
    }
  } else {
    signInButton.click()
  }
}
if(localStorage.getItem('whislist')){
  let whis= JSON.parse(localStorage.getItem('whislist')) 
  whislistArray = [...whis]
  for(let i =0;i<whis.length;i++){
      let x=document.getElementById(whis[i].id+'00')
      x.style.color='red'
  }
}

