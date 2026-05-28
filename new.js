document.addEventListener("DOMContentLoaded", () => {
    
    
    const burgerBtn = document.getElementById("burgerBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const navLinks = document.getElementById("navLinks");
    const menuOverlay = document.getElementById("menuOverlay");
    
    const cartIconBtn = document.getElementById("cartIconBtn");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartBody = document.getElementById("cartBody");
    const cartBadge = document.getElementById("cartBadge");
    
    const mainImage = document.getElementById("mainImage");
    
    const plusBtn = document.getElementById("plusBtn");
    const minusBtn = document.getElementById("minusBtn");
    const quantityCount = document.getElementById("quantityCount"); 
    const addToCartBtn = document.getElementById("addToCartBtn");
    
    const mobilePrevBtn = document.getElementById("mobilePrevBtn");
    const mobileNextBtn = document.getElementById("mobileNextBtn");
    
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxMainImg = document.getElementById("lightboxMainImg");
    const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
    const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
    const lightboxNextBtn = document.getElementById("lightboxNextBtn");

    
    const thumbs = document.querySelectorAll(".thumb");
    const lightboxThumbs = document.querySelectorAll(".lightbox-thumb");

    const images = [
        "./images/image-product-1.jpg",
        "./images/image-product-2.jpg",
        "./images/image-product-3.jpg",
        "./images/image-product-4.jpg"
    ];

    let currentImgIndex = 0;
    let currentQuantity = 0;
    let totalCartQuantity = 0;

    
    function toggleMenu(isOpen) {
        navLinks.classList.toggle("open", isOpen);
        menuOverlay.classList.toggle("open", isOpen);
    }

    burgerBtn.addEventListener("click", () => toggleMenu(true));
    closeMenuBtn.addEventListener("click", () => toggleMenu(false));
    menuOverlay.addEventListener("click", () => toggleMenu(false));

    
    plusBtn.addEventListener("click", () => {
        currentQuantity++;
        updateCounterUI();
    });

    minusBtn.addEventListener("click", () => {
        if (currentQuantity > 0) {
            currentQuantity--;
            updateCounterUI();
        }
    });

    function updateCounterUI() {
        quantityCount.innerText = currentQuantity;
    }

    
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", (e) => {
            currentImgIndex = parseInt(e.target.dataset.index, 10);
            updateGalleryUI();
        });
    });

    function updateGalleryUI() {
        mainImage.src = images[currentImgIndex];
        thumbs.forEach((t, idx) => {
            t.classList.toggle("active", idx === currentImgIndex);
        });
    }

    
    mobileNextBtn.addEventListener("click", () => {
        currentImgIndex = (currentImgIndex + 1) % images.length;
        updateGalleryUI();
    });

    mobilePrevBtn.addEventListener("click", () => {
        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
        updateGalleryUI();
    });

    
    mainImage.addEventListener("click", () => {
        if (window.innerWidth > 768) {
            lightboxModal.classList.add("active");
            updateLightboxUI();
        }
    });

    lightboxCloseBtn.addEventListener("click", () => lightboxModal.classList.remove("active"));

    function updateLightboxUI() {
        lightboxMainImg.src = images[currentImgIndex];
        lightboxThumbs.forEach((t, idx) => {
            t.classList.toggle("active", idx === currentImgIndex);
        });
    }

    lightboxNextBtn.addEventListener("click", () => {
        currentImgIndex = (currentImgIndex + 1) % images.length;
        updateLightboxUI();
        updateGalleryUI();
    });

    lightboxPrevBtn.addEventListener("click", () => {
        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
        updateLightboxUI();
        updateGalleryUI();
    });

    lightboxThumbs.forEach(thumb => {
        thumb.addEventListener("click", (e) => {
            currentImgIndex = parseInt(e.target.dataset.index, 10);
            updateLightboxUI();
            updateGalleryUI();
        });
    });

    
    cartIconBtn.addEventListener("click", () => {
        cartDropdown.classList.toggle("show");
    });

    addToCartBtn.addEventListener("click", () => {
        if (currentQuantity === 0) return;

        totalCartQuantity += currentQuantity;
        renderCart();
        
        currentQuantity = 0;
        updateCounterUI();
    });

    function renderCart() {
        if (totalCartQuantity > 0) {
            cartBadge.innerText = totalCartQuantity;
            cartBadge.style.display = "block";

            const totalCost = (125.00 * totalCartQuantity).toFixed(2);
            cartBody.innerHTML = `
                <div class="cart-item-flex">
                    <img src="${images[0]}" alt="">
                    <div>
                        <p style="color: var(--dark-grayish-blue); font-size: 0.9rem;">Fall Limited Edition Sneakers</p>
                        <p style="color: var(--dark-grayish-blue); font-size: 0.9rem;">$125.00 x ${totalCartQuantity} <b style="color: var(--very-dark-blue)">$${totalCost}</b></p>
                    </div>
                    <button class="delete-btn" type="button">
                        <img src="./images/icon-delete.svg" alt="Delete">
                    </button>
                </div>
                <button class="checkout-btn" type="button">Checkout</button>
            `;

            
            const deleteBtn = cartBody.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                totalCartQuantity = 0;
                renderCart();
            });

        } else {
            cartBadge.style.display = "none";
            cartBody.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
        }
    }
});
