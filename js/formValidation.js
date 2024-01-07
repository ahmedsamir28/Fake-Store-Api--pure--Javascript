// Start Form Validation Ui

const loginAction_Button = document.querySelector('.login-action-button') 
const registerAction_Button = document.querySelector('.register-action-button') 

const loginActive = () => {
    if (login_userName.classList.contains("success") && loginPassword.classList.contains("success")) {
        loginAction_Button.removeAttribute("disabled")
    } else {
        loginAction_Button.setAttribute("disabled", "disabled")
    }
}

const registerActive = () => {  
    if (register_userName.classList.contains("success") && email.classList.contains("success") && registerPassword.classList.contains("success") && passwordRepeat.classList.contains("success")) {
        registerAction_Button.removeAttribute("disabled")
    } else {
        registerAction_Button.setAttribute("disabled", "disabled")
    }
}

//Login username
const login_userName =  document.querySelector('.login-username')
const login_userMessage = document.querySelector('.login-user-message')

login_userName.addEventListener("keyup", (eo) => {
    login_userName .classList.add("error")
    login_userMessage.style.display = "block"
        if (login_userName.value.length > 2) {
            login_userName.classList.add("success")
            login_userMessage.style.display = "none"
            login_userName.nextElementSibling.style.opacity = "1"
        } else {
            login_userName.classList.remove("success")
            login_userMessage.style.display = "block"
            login_userName.nextElementSibling.style.opacity = "0"
        }
    
        loginActive()
})

//Register username
const register_userName =  document.querySelector('.register-username')
const register_userMessage = document.querySelector('.register-user-message')

register_userName.addEventListener("keyup", (eo) => {
    register_userName .classList.add("error")
    register_userMessage.style.display = "block"
        if (register_userName.value.length > 2) {
            register_userName.classList.add("success")
            register_userMessage.style.display = "none"
            register_userName.nextElementSibling.style.opacity = "1"
        } else {
            register_userName.classList.remove("success")
            register_userMessage.style.display = "block"
            register_userName.nextElementSibling.style.opacity = "0"
        }
    
        registerActive()
})

//EX: Email@gmail.com
const email  = document.querySelector('.email')
const emailMessage = document.querySelector('.email-message')

email.addEventListener("keyup", (eo) => {
    email.classList.add("error")
    emailMessage.style.display = "block"
    const RegexEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (RegexEmail.test(email.value)) {
        email.classList.add("success")
        emailMessage.style.display = "none"
        email.nextElementSibling.style.opacity = "1"
    } else {
        email.classList.remove("success")
        emailMessage.style.display = "block"
        email.nextElementSibling.style.opacity = "0"
    }

    registerActive()
})

//Login Password
//EX: @Password 1354
const loginPassword = document.querySelector('.login-password')
const login_passwordMessage = document.querySelector('.login-password-message')
const pattern = /^[^\s]{5,}$/


loginPassword.addEventListener("keyup", (eo) => {
    loginPassword.classList.add("error")
    login_passwordMessage.style.display = "block"
        const RegexPassword = pattern;
    
        if (RegexPassword.test(loginPassword.value)) {
            loginPassword.classList.add("success")
            login_passwordMessage.style.display = "none"
            loginPassword.nextElementSibling.style.opacity = "1"
        } else {
            loginPassword.classList.remove("success")
            login_passwordMessage.style.display = "block"
            loginPassword.nextElementSibling.style.opacity = "0"
        }
    
        loginActive()
})

//Register username
const registerPassword = document.querySelector('.register-password')
const register_passwordMessage = document.querySelector('.register-password-message')

registerPassword.addEventListener("keyup", (eo) => {
    registerPassword.classList.add("error")
    register_passwordMessage.style.display = "block"
        const RegexPassword =pattern;

        if (RegexPassword.test(registerPassword.value)) {
            registerPassword.classList.add("success")
            register_passwordMessage.style.display = "none"
            registerPassword.nextElementSibling.style.opacity = "1"
        } else {
            registerPassword.classList.remove("success")
            register_passwordMessage.style.display = "block"
            registerPassword.nextElementSibling.style.opacity = "0"
        }
    
        registerActive()
})

const passwordRepeat = document.querySelector('.password-repeat') 
const repeatMessage = document.querySelector('.repeat-message')

passwordRepeat.addEventListener("keyup", (eo) => {
    passwordRepeat.classList.add("error")
    repeatMessage.style.display = "block"

    if (passwordRepeat.value === registerPassword.value) {
        passwordRepeat.classList.add("success")
        repeatMessage.style.display = "none"
        passwordRepeat.nextElementSibling.style.opacity = "1"
    } else {
        passwordRepeat.classList.remove("success")
        repeatMessage.style.display = "block"
        passwordRepeat.nextElementSibling.style.opacity = "0"
    }

    registerActive()
})


// zoom effect
const  loginAccount = document.querySelector('#login-account')
const  registerAccount = document.querySelector('#register-account')

const box_loginForm = document.querySelector('.Box-login-Form')
const box_registerForm = document.querySelector('.Box-register-Form')

const loginForm = document.querySelector('.login-form')
const registerForm = document.querySelector('.register-form')

//login
loginAccount.addEventListener("click", (eo) => {
    box_loginForm.style.display = "flex"
    setTimeout(() => {
        loginForm.style.transform = "scale(1)"
    }, 100);
})

//register
registerAccount.addEventListener("click", (eo) => {
    box_registerForm.style.display = "flex"
    setTimeout(() => {
        registerForm.style.transform = "scale(1)"
    }, 100);
})


const closeLogin = document.querySelector(".close-login")
const closeRegister = document.querySelector(".close-register")

//login
closeLogin.addEventListener("click", (eo) => {
    loginForm.style.transform = "scale(0)"
    setTimeout(() => {
        box_loginForm.style.display = "none"
    }, 200);
})

//register
closeRegister.addEventListener("click", (eo) => {
    registerForm.style.transform = "scale(0)"

    setTimeout(() => {
        box_registerForm.style.display = "none"
    }, 200);
})

//login
loginAction_Button.addEventListener("click", (eo) => {
    loginForm.style.transform = "scale(0)"
    loginClicked()
    setTimeout(() => {
        box_loginForm.style.display = "none"
    }, 200);
    
})

//register
registerAction_Button.addEventListener("click", (eo) => {
    registerForm.style.transform = "scale(0)"
    registerClicked()
    setTimeout(() => {
        box_registerForm.style.display = "none"
    }, 200);
    
})

// End Form Validation Ui

// (ٍStart)==> Show login and logout based on user
const userInterfaceUi = () => {
    // Get the authentication token from local storage
    const token = localStorage.getItem("token");

    // Get the necessary DOM elements
    const loginDiv = document.getElementById("login-process");
    const logoutDiv = document.getElementById("logout-process");

    // If the token is null, the user is not logged in
    if (token == null) {
        // Show the login div and hide the logout div
        loginDiv.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");
    } else {
        // Hide the login div and show the logout div
        loginDiv.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
    }
}
userInterfaceUi();
// (End)==> Show login and logout based on user