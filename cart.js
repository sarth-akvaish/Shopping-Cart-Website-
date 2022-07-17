let label = document.getElementById("label");
let shoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || [];

// console.log(basket);

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsdata.find((y) => y.id === id) || [];
                return `
            <div class="cart-item">
            <img width="100" src=${search.img} alt="" />
            <div class="details">
                <div class="title-price-x">
                 <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price"> &#x20b9;${search.price} </p>
                 </h4>
                 <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>
                <div class="buttons btn2">
                <i onclick="decrement(${id})" class="bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

                <h3 class="total-price">&#x20b9;${item * search.price}</h3>
            </div>
            </div>
            `;
            }).join(""));
    }
    else {
        shoppingCart.innerHTML = ` `;
        label.innerHTML = ` 
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="Homebtn">Back to Home</button>`;
    }
}

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    console.log(basket);
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;
    console.log(basket);
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) { return; }
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0)  //used to filter the items on the basis of count of items is items cnt is 0 remove them from basket
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    Total_Amount();
};

let removeItem = (id) => {
    let selectedid = id;
    basket = basket.filter((x) => x.id !== selectedid.id);

    
    generateCartItems(); //render the things quickly
    Total_Amount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket)); // update the thing on Local storage
}

let ClearCart = () => {
    basket = [];
    generateCartItems();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
}

let Total_Amount = () => {

    if (basket.length !== 0) {
        let Amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsdata.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        // console.log(Amount);
        label.innerHTML = `
        <h2> Total Bill : &#x20b9; ${Amount} </h2>
         <button class="check-out">Checkout</button>
         <button onclick="ClearCart()" class="removeAll">Clear Cart</button>
        `;
    }
    else {
        return;
    }

}

Total_Amount();