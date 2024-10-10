document.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("product-container");

      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
                    <img src="${product.image}" alt="${
          product.title
        }" class="product-image">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${
                      product.id
                    }">Add to Cart</button>
                     <button class="wishList" data-id="${
                      product.id
                    }">
                         <img src="./image/download.png" height="20px" width="20px"/>
                      </button>
                `;

        container.appendChild(card);
      });

      // Add click event listener to "Add to Cart" buttons
      const buttons = document.querySelectorAll(".add-to-cart");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.getAttribute("data-id");
          const product = products.find((p) => p.id == productId);
          addToCart(product);
        });
      });
       // Add click event listener to "Add to Cart" buttons
       const wishList = document.querySelectorAll(".wishList");
       wishList.forEach((button) => {
         button.addEventListener("click", () => {
          console.log("Hello")
           const productId = button.getAttribute("data-id");
           const product = products.find((p) => p.id == productId);
           wishLists(product);
         });
       });
    })
    .catch((error) => {console.log("Error fetching products:", error)});
});

// Function to add product to local storage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex > -1) {
    // Product already in cart, increase quantity or keep it as is
    cart[existingProductIndex].quantity += 1;
  } else {
    // New product, add to cart with quantity 1
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} has been added to your cart!`);
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBody = document.getElementById("cart-body");

  // Check if cart is empty
  if (cart.length === 0) {
    cartBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
  } else {
    // Group by product ID
    const groupedCart = {};
    cart.forEach((item) => {
      if (item && item.id) {
        // Ensure item exists and has an ID
        if (!groupedCart[item.id]) {
          groupedCart[item.id] = { ...item, quantity: 0 };
        }
        groupedCart[item.id].quantity += item.quantity;
      }
    });

    // Populate the table with grouped items
    for (const item of Object.values(groupedCart)) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${item.image}" alt="${
        item.title
      }" class="cart-image" /></td>
                <td>${item.title}</td>
               
                <td>
                 <input type="number" id="num1" value="${item.quantity}" aria-label="${item.quantity}" 
                onchange="input(${item.id}, this.value)" data-id="${item.id}" />
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                
                `;
                // <input type="number" id="num1" value="${
                //   item.quantity
                // }"  aria-label="${item.quantity}" 
                //    onchange="input(item)" data-id="${item.id}" />

      cartBody.appendChild(row);
    }
  }

  // Clear cart button functionality
  document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    cartBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
  });
});

function input(productId, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id == productId);

  if (existingProductIndex > -1) {
    // Update the quantity of the item
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      cart.splice(existingProductIndex, 1);
    } else {
      cart[existingProductIndex].quantity = parseInt(newQuantity, 10);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Updated quantity for product ID ${productId} to ${newQuantity}`);
}




function wishLists(product) {
  let cart = JSON.parse(localStorage.getItem("wishList")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex > -1) {
    // Product already in cart, increase quantity or keep it as is
    alert(`${product.title} is already in wishList !`)
    return;
  } else {
    // New product, add to cart with quantity 1
    cart.push({ ...product});
  }

  localStorage.setItem("wishList", JSON.stringify(cart));
  alert(`${product.title} has been added to your cart!`);
}




function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const productCount = document.getElementById('product-count');
  const totalPrice = document.getElementById('total-price');

  // Retrieve and parse cart data from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // Parse JSON, default to empty array


  console.log(cart)

  cartItemsContainer.innerHTML = ''; // Clear previous items
  let total = 0;

  // Loop through each product in the cart and display it
  cart.forEach(product => {
      const itemElement = document.createElement('p');
      itemElement.innerHTML = `<img src="${product.image}" alt="" style="width:50px;"/> <span>${product.quantity}</span> <span>${product.title}</span> <span class="price">$${product.price.toFixed(2)}</span>`;
      cartItemsContainer.appendChild(itemElement);
      total += product.price; // Add to total
  });

  productCount.innerText = cart.length; // Update product count
  totalPrice.innerText = `$${total.toFixed(2)}`; // Update total price
}

// Function to add product to cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get current cart
  cart.push(product); // Add new product
  localStorage.setItem('cart', JSON.stringify(cart)); // Save back to localStorage
  updateCart(); // Update the cart display
}

// Initial call to update cart
updateCart();


// function addToCart(product) {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   cart.push(product);
//   localStorage.setItem('cart', JSON.stringify(cart));
// }



// addToCart({ name: 'Product 1', price: 15, image: 'image1.jpg' });


document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', function(event) {
      // Prevent the default form submission
      event.preventDefault();
      
      // Clear specific local storage keys
      localStorage.removeItem('cart');
      localStorage.removeItem('wishList');
      localStorage.removeItem('items');
      
      // Optionally, if you have a function to remove items from your cart and wishlist display, call it here
      // removeItemsFromCart();
      // removeItemsFromWishList();

      // Redirect to the checkout page (or perform other actions as needed)
      // window.location.href = '/checkout_page_url'; // Change this to your checkout page URL
  });
});
