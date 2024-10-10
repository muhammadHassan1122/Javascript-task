document.addEventListener("DOMContentLoaded", () => {
    fetch("https://fakestoreapi.com/products")
     });
  
  // Function to add product to local storage
  
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const wishlist = JSON.parse(localStorage.getItem("wishList")) || [];
    console.log(wishlist);
    
    const containerWishlistBody = document.getElementsByClassName("wishList")[0];
    
    // Check if wishlist is empty
    if (wishlist.length === 0) {
      containerWishlistBody.innerHTML = '<p>Your wishlist is empty.</p>';
    } else {
      wishlist.forEach((item) => {
        if (item && item.id) {
          const wishlistBody = document.createElement("div");
          wishlistBody.classList.add("product-card");
          wishlistBody.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="product-image">
            <h3 class="product-title">${item.title}</h3>
            <p class="product-description">${item.description}</p>
            <p class="product-price">$${item.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
            <div id="wishlist">
    <div class="product-card" data-id="${item.id}">
      <button class="remove-from-wishlist" data-id="${item.id}">
        <img src="./image/download(1).png" height="20px" width="20px" />
      </button>
      <!-- Other product details -->
    </div>
  </div>
          `;
          containerWishlistBody.appendChild(wishlistBody);
        }
        const buttons = document.querySelectorAll(".add-to-cart");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.getAttribute("data-id");
          const product = wishlist.find((p) => p.id == productId);
          addToCart(product);
        });
      });
        const list = document.querySelectorAll(".remove-from-wishlist");
          list.forEach((button) => {
            button.addEventListener("click", () => {
              const productId = button.getAttribute("data-id");
              const products = wishlist.find((p) => p.id == productId);
              removeFromWishlist(products);
            });
          });
        
        
      });
    }
  
    // Clear wishlist button functionality
    // document.getElementsByClassName("remove-from-wishlist").addEventListener("click", () => {
    //   localStorage.removeItem("wishList");
    //   containerWishlistBody.innerHTML = '<p>Your wishlist is empty.</p>';
    // });
    
  });
  
  
  
  
  
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













  



function removeFromWishlist(event) {
  console.log("Hello")
  const button = event.currentTarget; // Get the button that was clicked
  const productId = button.getAttribute('data-id'); // Get product ID

  // Remove from local storage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // Remove from document
  const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (productCard) {
    productCard.remove(); // Remove the product card from the DOM
  }
}

// Attach event listeners to all remove buttons
document.querySelectorAll('.remove-from-wishlist').forEach(button => {
  button.addEventListener('click', removeFromWishlist);
});

// Function to remove item from wishlist
function removeFromWishlist(itemId) {
  const wishlist = JSON.parse(localStorage.getItem("wishList")) || [];
  const updatedWishlist = wishlist.filter(item => item.id !== itemId);
  localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
  location.reload(); // Refresh to update the displayed wishlist
}
