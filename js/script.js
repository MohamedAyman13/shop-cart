// register section
let firstName = document.querySelector("#first")
let lastName = document.querySelector('#last')
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let haveAccount = document.querySelector("#have-account")
let signUpButton = document.querySelector("#sign-up-button")
let notHaveAccount = document.querySelector("#not-have-account")

let register_btn = document.querySelector("#sign")
let signInButton = document.querySelector("#sign-in-button")

haveAccount.addEventListener("click", () => signInButton.click())
register_btn.addEventListener ("click" , function (e){
    e.preventDefault()
    if (firstName.value==="" || lastName.value=== "" || email.value==="" || password.value ===""){
        alert("please fill data")
    } else {
        localStorage.setItem("username" , firstName.value + " "+ lastName.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value); // 
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        password.value = ""

        setTimeout ( () => {
            signInButton.click()
        } , 500)
    }
})

// login phase

let signInEmail = document.querySelector("#email-sign-in")
let signInpassword = document.querySelector("#password-sign-in")
let loginBtn = document.querySelector("#login-button")

notHaveAccount.addEventListener("click", () => signUpButton.click())
loginBtn.addEventListener ("click" , function(e){
    e.preventDefault()
    if (signInEmail.value==="" || signInpassword.value===""){
        alert("please fill data ")
    } else {
        let getUser = localStorage.getItem("email")
        let getPassword = localStorage.getItem("password")
        if ( (getUser && getUser.trim() === signInEmail.value.trim() && getPassword && getPassword === signInpassword.value )  )
        {
            setTimeout ( () => {
                window.location = "index.html"
            } , 1000)
            localStorage.setItem("login", "success")
        } else {
            console.log(getUser.trim(), signInEmail.value.trim())
        }
    }
})

// main page script
let userInfo = document.querySelector ("#user_info")
let userD = document.querySelector ("#user")
let buttons = document.querySelector ("#buttons")
let cart = document.querySelector("#cart")
let logout = document.querySelector("#logout")

if (localStorage.getItem("login")){
    buttons.remove()
    userInfo.style.display ="block"
    userD.innerHTML = localStorage.getItem("username")
    userD.style.fontSize = "1.5rem"
    cart.style.visibility = "visible"
}
logout.addEventListener('click', ()=> {localStorage.clear()})

