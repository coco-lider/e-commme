let listProductHTML = document.querySelector('.listProduct');
let cartCountElement = document.querySelector('.icon-cart span'); // Savatcha raqami
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Karzinka miqdorini yangilash funksiyasi
const updateCartCount = () => {
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalQuantity;
}

// Mahsulotlarni HTML'ga qo'shish
const addDataToHTML = () => {
    if(products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

// Mahsulotni savatchaga qo'shish
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0) {
        cart = [{ product_id: product_id, quantity: 1 }];
    } else if(positionThisProductInCart < 0) {
        cart.push({ product_id: product_id, quantity: 1 });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Karzinka miqdorini yangilash
}

// Mahsulot qo'shish tugmasini bosganda
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

// Dastur boshlanishida cartdagi miqdorni yangilash
const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
        updateCartCount(); // Boshlang'ich miqdorni yangilash
    });
}

initApp();