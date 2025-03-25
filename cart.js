let listCartHTML = document.querySelector('.listCart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            newItem.innerHTML = `
            <div class="image"><img src="${info.image}">${info.name}</div>
            <div class="name">$${info.price}</div>
            <div class="quantity">
            <span>${item.quantity}</span>
            <span class="plus">⋀</span>
            <span class="minus">⋁</span>
            </div>
            <div class="totalPrice">$${info.price * item.quantity}</div>
            `;
            listCartHTML.appendChild(newItem);
        });
    }
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        if(type === 'plus') {
            cart[positionItemInCart].quantity += 1;
        } else {
            let changeQuantity = cart[positionItemInCart].quantity - 1;
            if(changeQuantity > 0) {
                cart[positionItemInCart].quantity = changeQuantity;
            } else {
                cart.splice(positionItemInCart, 1);
            }
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    addCartToHTML();
}

const initCart = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addCartToHTML();
    });
}
initCart();
