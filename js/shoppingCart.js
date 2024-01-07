// Function to fetch single product data and add it to the cart
const addToCart = (productId) => {
    // Fetch the product data from the API
    fetch(`${baseUrl}/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const cart = getCartData(); // Retrieve the current cart data from local storage
            const addToCartButton = document.querySelector(`.add-to-cart-${productId}`);
            const existingProduct = cart.find(item => item.id === productId); // Check if the product is already in the cart
            if (existingProduct) {
                addToCartButton.setAttribute("disabled", "disabled");
                showAlertDanger("You have previously added this product to the cart"); // Show an alert if the product is already in the cart
            } else {
                addToCartButton.removeAttribute("disabled");
                showAlert("The product has been successfully added to your cart"); // Show a success alert
                cart.push(product); // Add the new product to the cart
                saveCartData(cart); // Save the updated cart data to local storage
            }
        })
        .catch(err => {
            console.log(err);
        });
}

// Function to remove a product from the cart
const removeFromCart = (productId) => {
    const cart = getCartData(); // Retrieve the current cart data from local storage
    const updatedCart = cart.filter(product => product.id !== productId); // Filter out the product to be removed
    saveCartData(updatedCart); // Save the updated cart data to local storage
}


// Function to save cart data to local storage
const saveCartData = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convert the cart data to a JSON string and save it to local storage
    cartLength(); // Update the displayed cart length
    updateCartUI(); // Update the cart UI on the page
}

// Function to retrieve cart data from local storage
const getCartData = () => {
    const cartData = localStorage.getItem('cart'); // Retrieve the cart data from local storage
    return cartData ? JSON.parse(cartData) : []; // Parse the JSON data or return an empty array if no data is found
}

// Function to update the cart UI
const updateCartUI = () => {
    const cartData = getCartData();

    cartTableBody.innerHTML = '';
    cartData.forEach(product => {
        // Generate HTML for each product in the cart
        const cartContent = `
            <tr class="product-cart bg-white border-2 h-20">
                <td class="align-middle h-20 text-zinc-600 p-8 flex items-center">
                    <img src=${product.image} alt="" class="  w-12 h-12 mr-3">
                    <h6 class="cart-hidden">${product.title}</h6> 
                </td>
                <td id="price-${product.id}" class="align-middle text-center text-zinc-600">$ ${product.price}</td>
                <td class="align-middle ">
                    <div class=" flex  justify-center items-center mx-auto" style="width: 100px;">
                        <button onclick="minus(${product.id})" class="py-1 px-2 bg-amber-300 hover:bg-amber-400 duration-100">
                            <i class="fa fa-minus"></i>
                        </button>
                        <input id="quantityInput-${product.id}"  type="text" class="w-10 outline-none p-1 bg-zinc-100 border-0 text-center" value="1">
                        <button onclick="plus(${product.id})" class="py-1 px-2 bg-amber-300 hover:bg-amber-400 duration-100">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </td>
                <td id="total-${product.id}" class="total-price align-middle text-center text-zinc-600">$ ${product.price}</td>
                <td class="align-middle text-center text-white">
                    <button class="border py-1 px-2 bg-red-600 hover:bg-red-700 remove-btn" id="remove-btn" onclick="removeBtn(${product.id})">
                        <i class="fa fa-times "></i>
                    </button>
                </td>
            </tr>
        `;

        // Render the product detail on the page
        cartTableBody.innerHTML += cartContent;
    });
}

// Example: Retrieving data from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    updateCartUI();
    subtotalUi()
});

const removeBtn = (productId) => { 
    removeFromCart(productId);
    subtotalUi()
    cartLength()
}

const plus = (productId) => {
    const quantityInput = document.getElementById(`quantityInput-${productId}`);
        quantityInput.value = parseInt(quantityInput.value) + 1;
        getQuantity(productId)
        subtotalUi()

}

const minus = (productId) => {
    const quantityInput = document.getElementById(`quantityInput-${productId}`);
    const newValue = Math.max(parseInt(quantityInput.value) - 1, 1); // Ensure quantity is never less than 1
    quantityInput.value = newValue;
    getQuantity(productId)
    subtotalUi()
}

const getQuantity = (productId) => {
    const totalPrice = document.getElementById(`total-${productId}`);
    const price = parseFloat(document.getElementById(`price-${productId}`).innerText.replace("$", ""));
    const quantityInput = document.getElementById(`quantityInput-${productId}`);
    let total = 0;

    total = price * parseInt(quantityInput.value);
    totalPrice.innerHTML = `$ ${total.toFixed(2)}`; // Display the total with two decimal places
}

const calculateSubtotal = () => {
    const ProductsCart = document.querySelectorAll('.product-cart');
    let subtotal = 0;

    ProductsCart.forEach(item => {
        const price = Number(item.querySelector('.total-price').innerText.replace("$", ""));
        subtotal += price;
    });
    const formattedSubtotal = subtotal.toFixed(2);
    return formattedSubtotal; // If you want to use the subtotal value elsewhere
};

const subtotalUi = () => { 
    const subtotal = document.getElementById('subtotal')
    const shipping = Number(document.getElementById('shipping').innerText.replace("$", ""));
    const total = document.getElementById('total')

    subtotal.innerHTML=''
    subtotal.innerHTML =`$ ${calculateSubtotal()}` 
    const mathRound = Math.round(calculateSubtotal()) 
    total.innerHTML =`$ ${mathRound + shipping}`
}

const cartLength = () => {  
    const cart_length =  document.querySelector('.cart-length')
    cart_length.innerHTML =''
    cart_length.innerHTML = getCartData().length
}

cartLength()

const ProceedToCheckout = () => {
    // Get the authentication token from local storage
    const token = localStorage.getItem("token");

    // If the token is null, the user is not logged in
    if (token !== null) {
        showAlert("Successful operation")
    } 
    else {
        showAlertDanger("You are not logged in")
    }
}