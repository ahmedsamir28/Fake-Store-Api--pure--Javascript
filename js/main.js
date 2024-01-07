// Start Nav-menu 
let navBar = document.getElementById('bar')
navBar.addEventListener('click', () => {    /*  step - 3*/
    navBar.classList.toggle("change");
})
/* nav-menu */
let links = document.getElementById("links")
navBar.addEventListener('click', () => {
    links.classList.toggle("navmenu");
})

let links_tag = document.querySelectorAll('.links li a')
links_tag.forEach(el => {
    el.addEventListener('click', () => {
        links_tag.forEach(li => {
            li.classList.remove('active')
            this.classList.add('active')
        })
    })
})
// End nav-menu


let loadMore = document.querySelector('#load-more');

// const removeBtn = () => {  
//     loadMore.style.display = 'none'
// }

// Wait for the DOM to be fully loaded

// document.addEventListener('DOMContentLoaded',  () =>{
//     // load more when click on button
//     let currentItem = 4;

//     loadMore.onclick = () => {
//         let boxes = [...document.querySelectorAll('.product')];

//         for (let i = currentItem; i < currentItem + 4; i++) {
//             if (boxes[i]) {
//                 boxes[i].style.display = 'inline-block';
//             }
//         }

//         currentItem += 4;

//         if (currentItem >= boxes.length) {
//             loadMore.textContent = 'No more products';
//             loadMore.disabled = true; // Disable the button when there are no more items
//         }
//     };
// });

/***********************************************************************************************************************/ 

//Start show alert

// Get references to the alert and close button
const alertElementSuccess = document.getElementById('myAlert-success');
const closeBtnSuccess = document.getElementById('closeBtn-success');
const textAlertSuccess = document.getElementById('text-alert-success')

const alertElementDanger = document.getElementById('myAlert-danger');
const closeBtnDanger = document.getElementById('closeBtn-danger');
const textAlertDanger= document.getElementById('text-alert-danger')

// Function to show the alert  with a transition effect
function showAlert(message) {
    alertElementSuccess.style.display = 'block';
    textAlertSuccess.innerHTML = ''
    textAlertSuccess.textContent = message
    setTimeout(() => {
        alertElementSuccess.style.opacity = '1';
    }, 10);

    //Automatically hide the alert success after 2 seconds
    setTimeout(hideAlert, 1500);
}
function showAlertDanger(message) {
    alertElementDanger.style.display = 'block';
    textAlertDanger.innerHTML = ''
    textAlertDanger.textContent = message
    setTimeout(() => {
        alertElementDanger.style.opacity = '1';
    }, 10);

    //Automatically hide the alert success after 2 seconds
    setTimeout(hideAlertDanger, 1500);
}

// Function to hide the alert  with a transition effect
function hideAlert() {
    alertElementSuccess.style.opacity = '0';
    setTimeout(() => {
        alertElementSuccess.style.display = 'none';
    }, 500);
}
function hideAlertDanger() {
    alertElementDanger.style.opacity = '0';
    setTimeout(() => {
        alertElementDanger.style.display = 'none';
    }, 500);
}

// Add click event listener to the close button
closeBtnSuccess.addEventListener('click', hideAlert);
closeBtnDanger.addEventListener('click', hideAlertDanger);

//End show alert

// Get the button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll =  () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 500) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Function to scroll smoothly to the top
const scrollToTop = ()=>{
    // Scroll to the top with smooth behavior
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
