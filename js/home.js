// Base URL for the fake store API
const baseUrl = 'https://fakestoreapi.com';
// DOM elements
const products = document.getElementById("products");
const cartTableBody = document.getElementById("tbody");
// Function to fetch all products and display them
const getAllProducts = () => {
    const url = `${baseUrl}/products`;
    fetch(url)
        .then(res => res.json())
        .then(res => {
            // Clear existing product display
            products.innerHTML = '';
            // Iterate through each product and render it
            res.forEach(product => {
                getHtmlProduct(product);
                userInterfaceUi(); // Note: Is this supposed to be userInterfaceUi() or userInterfaceUi, consider checking the function name.
            });
        })
        .catch(err => console.error(err));
};

// Initial call to fetch and display all products
getAllProducts();

// List of category elements
let categoryList = document.querySelectorAll('.categories .category');
// Event listener for category click
categoryList.forEach(el => {
    el.addEventListener('click', () => {
        const categoryName = el.textContent;
        // Fetch and display products based on selected category
        getProductsByCategory(categoryName);
        // Update styling for selected category
        categoryList.forEach(li => {
            li.classList.remove('text-icon');
            el.classList.add('text-icon');
        });
    });
});

// Function to fetch and display products based on category
const getProductsByCategory = (category) => {
    let url = '';
    if (category == 'all') {
        url = `${baseUrl}/products`;
    } else {
        url = `${baseUrl}/products/category/${category}`;
    }
    fetch(url)
        .then(res => res.json())
        .then(res => {
            // Clear existing product display
            products.innerHTML = '';
            // Iterate through each product and render it
            res.forEach(product => {
                getHtmlProduct(product);
            });
        });
};

// Function to generate HTML for a product
const getHtmlProduct = (product) => {
    let content = `
    <div class="product hidden p-2.5  bg-white border-2 border-gray-300">
        <div class="relative truncate cursor-pointer">
            <div class="image border  h-72" onclick="productClicked(${product.id})">
                <img class="w-full h-full" src=${product.image} alt="">
            </div>
            <button id="add-to-cart-${product.id}" onclick="addToCart(${product.id})" class="to-cart add-to-cart-${product.id} cursor-pointer absolute  bg-zinc-400 m-auto h-10  w-7/12 flex flex-row justify-center items-center">
                <i class="fa-solid fa-cart-plus text-xl  border-black border-r-2  pr-2 "></i>
                <h3 class="capitalize font-medium pl-2"  >add to cart</h3>
            </button>
        </div>
        <div class="h-320 pt-3 pl-2 bg-white " onclick="productClicked(${product.id})">
            <h3 class="mb-1 capitalize text-base text-zinc-500">${product.title}</h3>
            <div class="font-semibold">$ ${product.price}</div>
        </div>
    </div>
    `;
    // Append product HTML to the products container
    products.innerHTML += content;
};

const loginClicked = () => {
    // Get the username and password from input fields
    const userName = login_userName.value;
    const password = loginPassword.value;

    // Log the username and password
    console.log(userName, password);

    // Prepare the parameters for the POST request
    const params = {
        username: userName,
        password: password
    };

    // Prepare the request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    // Send the POST request to the login API
    const url = `${baseUrl}/auth/login`;
    fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
            console.log('Response:', res);
            //Store the token in local storage
            localStorage.setItem("token", res.token);

            // Show success message and update the UI
            showAlert('logged in successfully')
            userInterfaceUi()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const registerClicked = () => {
    // Get the username and password from input fields
    const userName = register_userName.value;
    const emailRegister = email.value;
    const password = registerPassword.value;

    // Log the username and password
    console.log(userName, emailRegister, password);

    // Prepare the parameters for the POST request
    const params = {
        username: userName,
        email: emailRegister,
        password: password
    };

    // Prepare the request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    // Send the POST request to the login API
    const url = `${baseUrl}/users`;
    fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
            console.log('Response:', res);
            // Show success message and update the UI
            showAlert('New User Registered Successfully')
            //Store the token in local storage
            localStorage.setItem("token", res.id);

            userInterfaceUi()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//Removes the token and from local storage
const logout = () => {
    // Remove the token and user from local storage
    localStorage.removeItem("token");
    // Show a success message
    showAlert('logged out successfully')
    // Set up the user interface
    userInterfaceUi();
};

//Redirects the user to the post details page
const productClicked = (productId) => {
    // Construct the URL with the postId parameter
    const url = `pageDetails.html?productId=${productId}`;
    // Redirect the user to the post details page
    window.location = url;
};

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("productId")

//Fetches the details of a post from the API and renders them on the page.
const getProductDetails = () => {
    const productDetail = document.getElementById("product-detail")
    // Fetch the post details from the API
    fetch(`${baseUrl}/products/${id}`)
        .then(res => res.json())
        .then(res => {
            productDetail.innerHTML = ''
            // Generate the HTML for the product details
            let productContent = `
        <div class="h-96 w-full ">
            <img class="w-full h-full" src=${res.image} alt="">
        </div>
        <div class=" py-14 px-10  flex flex-col gap-5 ">
            <h1 class="capitalize text-3xl font-semibold">${res.title}</h1>
            <hr>
            <span class="text-zinc-500 text-2xl">$ ${res.price}</span>
            <p class=" text-start tracking-wide text-sm text-zinc-600">
            ${res.description}
            </p>
            <hr>
            <button id="add-to-cart-${res.id}" onclick="addToCart(${res.id})" class="to-cart add-to-cart-${res.id} cursor-pointer hover:text-amber-500  bg-zinc-200 m-auto h-10 w-full flex flex-row justify-center items-center">
                <i class="fa-solid fa-cart-plus text-xl  border-black border-r-2  pr-2 "></i>
                <h3 class="capitalize font-medium pl-2"  >add to cart</h3>
            </button>
        </div>
        `;

            // Render the product detail on the page
            productDetail.innerHTML = productContent
        })
        .catch(err => console.log(err));
};

getProductDetails()


