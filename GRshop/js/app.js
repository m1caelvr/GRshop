let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart')
let iconCartSpan = document.querySelector('.icon-cart span')

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
// document.addEventListener('click', function(event) {
//     var isCart = event.target.closest('.cartTab');
//     var isCartTab = event.target.closest('.icon-cart');
//     var isIcon = event.target.classList.contains('cartTab');
//     var isIconCart = event.target.classList.contains('icon-cart');

//     if (!isCartTab && !isIconCart && !isCart && !isIcon) {
//         body.classList.remove('showCart');
//     }
// });

const filterAndDisplayProducts = (type) => {
    const filteredProducts = (type === 'todos') ? listProducts : listProducts.filter(product => product.type === type);
    addDataToHTML(filteredProducts);

    const filteredItemCount = filteredProducts.length;
    return filteredItemCount;
};

let todosTag = document.querySelector('.todos-tag');
todosTag.addEventListener('click', () => {
    const filteredItemCount = filterAndDisplayProducts('todos');
    console.log(`Foram filtrados ${filteredItemCount} itens.`);
    
    removeFilterClick();
    todosTag.classList.add('filterClick');
});

let calcaTag = document.querySelector('.calca-tag');
calcaTag.addEventListener('click', () => {
    const filteredItemCount = filterAndDisplayProducts('calca');
    console.log(`Foram filtrados ${filteredItemCount} itens.`);

    removeFilterClick();
    calcaTag.classList.add('filterClick');
});

let conjuntoTag = document.querySelector('.conjunto-tag');
conjuntoTag.addEventListener('click', () => {
    const filteredItemCount = filterAndDisplayProducts('conjunto');
    console.log(`Foram filtrados ${filteredItemCount} itens.`);

    removeFilterClick();
    conjuntoTag.classList.add('filterClick');
});

let croppedTag = document.querySelector('.cropped-tag');
croppedTag.addEventListener('click', () => {
    const filteredItemCount = filterAndDisplayProducts('cropped');
    console.log(`Foram filtrados ${filteredItemCount} itens.`);

    removeFilterClick();
    croppedTag.classList.add('filterClick');
});

let shortTag = document.querySelector('.short-tag');
shortTag.addEventListener('click', () => {
    const filteredItemCount = filterAndDisplayProducts('short');
    console.log(`Foram filtrados ${filteredItemCount} itens.`);

    removeFilterClick();
    shortTag.classList.add('filterClick');
});

let vestidoTag = document.querySelector('.vestido-tag');
vestidoTag.addEventListener('click', () => {
    const filteredItemCount = filterAndDisplayProducts('vestido');
    console.log(`Foram filtrados ${filteredItemCount} itens.`);

    removeFilterClick();
    vestidoTag.classList.add('filterClick');
});

function removeFilterClick() {
    let elementsWithFilterClick = document.querySelectorAll('.filterClick');
    elementsWithFilterClick.forEach(element => {
        element.classList.remove('filterClick');
    });
}


const addDataToHTML = (filteredProducts) => {
    listProductHTML.innerHTML = '';

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;

            let sizeOptions = product.size.map(size => `
                <input class="size-option" type="radio" id="size-${size}-${product.id}" name="size-selector-${product.id}">
                <label class="labelSize" for="size-${size}-${product.id}">${size}</label>
            `).join('');

            newProduct.innerHTML = `
                <div class="model-img">
                    <img class="imgProductClass" src="${product.image}" alt="Imagem Carregada">
                </div>
                <div class="backContainItem">
                    <div class="backContainerColor">
                        <div class="containerColor">
                            <ul>
                                ${product.colors.map((color, index) => `
                                    <li>
                                        <input type="radio" id="${color}-option-${product.id}" name="color-selector-${product.id}" ${index === 0 ? 'checked' : ''}>
                                        <label for="${color}-option-${product.id}"></label>
                                        <div class="check ${color}"></div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="backName">
                        <h2>${product.name}</h2>
                    </div>
                    <div class="backSize">
                        <div class="size">Tamanhos: ${sizeOptions}</div>
                    </div>
                    <div class="price">R$${product.price}</div>
                </div>
                

                <!-- <button class="addCart">
                    Adicionar ao carrinho
                </button> -->
                
                    <button class="addCart order"><span class="default">Adicionar ao carrinho</span><span class="success">Adicionado ao carrinho
                    <svg viewbox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg></span>
                    <div class="box"></div>
                    <div class="truck">
                    <div class="back"></div>
                    <div class="front">
                        <div class="window"></div>
                    </div>
                    <div class="light top"></div>
                    <div class="light bottom"></div>
                    </div>
                    <div class="lines"></div>
            `;
            listProductHTML.appendChild(newProduct);
        });
    } else {
        listProductHTML.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }
};

function paginaTotalmenteCarregada() {
    setTimeout(function() {
        document.getElementById("loading-screen").style.animation = "opacityOut 1s ease";
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
        }, 1000);
    }, 1000);
}
window.onload = paginaTotalmenteCarregada;

const calculateTotal = () => {
    let totalValue = 0;

    carts.forEach(cart => {
        let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);

        if (positionProduct >= 0) {
            let info = listProducts[positionProduct];
            totalValue += info.price * cart.quantity;
        }
    });

    return totalValue;
};
const addToCart = (product_id) => {
    let selectedSize = getSelectedSize(product_id);
    let SelectedColor = getSelectedColor(product_id);

    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id && value.selectedSize === selectedSize && value.selectedColor === SelectedColor);

    if (carts.length <= 0 || positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1,
            selectedSize: selectedSize,
            selectedColor: SelectedColor
        });
    } else {
        carts[positionThisProductInCart].quantity += 1;
    }

    addCartToHTML();
    addCartToMemory();
    addCartValueDiv();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}
let notProductMessage = document.querySelector('.notProduct');
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    carts.forEach(cart => {
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.dataset.id = cart.product_id;
        let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);

        if (positionProduct >= 0) {
            let info = listProducts[positionProduct];
            let selectedSize = cart.selectedSize;
            let selectedColor = cart.selectedColor;
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="headerItemCart">
                    <div class="name">
                        <div>
                            ${info.name}
                        </div>
                        <div class="removeItemCart" data-product-id="${info.id}">
                            <ion-icon name="close"></ion-icon>
                        </div>
                        <div>
                            <div class="cartSizeClosets selected-size-${info.id}">Tamanho: ${selectedSize}</div>
                            <div class="backColorCart">
                                <div class="cartCorClosets">
                                    Cor:
                                </div>
                                <div class="colorCart ${selectedColor}"></div>
                            </div>
                        </div>   
                    </div>
                    <div class="footerItemCart">
                        <div class="totalPrice">
                            R$${info.price * cart.quantity}
                        </div>
                        <div class="quantity">
                            <span class="minus">-</span>
                            <span>${cart.quantity}</span>
                            <span class="plus">+</span>
                        </div>
                    </div>                
                </div>
                `;

                listCartHTML.appendChild(newCart);
                totalQuantity += cart.quantity;

                const removeItemCart = newCart.querySelector('.removeItemCart');
                removeItemCart.addEventListener('click', () => {
                    const productId = removeItemCart.dataset.productId;
                    removeItemFromCart(productId);
                    addCartValueDiv();
                });
            }
    });

    iconCartSpan.innerText = totalQuantity;

    if (totalQuantity > 0) {
        notProductMessage.style.display = 'none';
    } else {
        notProductMessage.style.display = 'block';
    }
}
const getSelectedSize = (product_id) => {
    let selectedSizeInput = document.querySelector(`input[name="size-selector-${product_id}"]:checked`);
    return selectedSizeInput ? selectedSizeInput.nextElementSibling.innerText : 'N/A';
}
const getSelectedColor = (product_id) => {
    let selectedColorInput = document.querySelector(`input[name="color-selector-${product_id}"]:checked`);
    return selectedColorInput ? selectedColorInput.id.split('-')[0] : 'N/A';
}

const removeItemFromCart = (productId) => {
    const index = carts.findIndex(cart => cart.product_id === productId);
    if (index !== -1) {
        carts.splice(index, 1);
        addCartToMemory();
        addCartToHTML();
    }
}

var notification = document.querySelector('.notificationPay');
var notificationSize = document.querySelector('.notificationSize');
var notificationCart = document.querySelector('.notificationCart');

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;

    if (positionClick.classList.contains('order') || positionClick.closest('.order')) {
        let orderButton = positionClick.closest('.order');
        let product_id = orderButton.parentElement.dataset.id;
        let selectedSize = getSelectedSize(product_id);
        let selectedColor = getSelectedColor(product_id);
        console.log(selectedColor);

        if (selectedSize !== 'N/A') {
            orderButton.disabled = true;
            if (!orderButton.classList.contains('animate')) {
                orderButton.classList.add('animate');
                setTimeout(function () {
                    orderButton.classList.remove('animate');
                    orderButton.disabled = false;
                }, 7000);
            }
            addToCart(product_id);
        } else {
            showNotification(notificationSize);
            return;
        }
    }
});

const getCartItemSize = (product_id, buttonElement) => {
    let cartItem = getParentCartItemElement(buttonElement);
    if (cartItem) {
        let sizeElement = cartItem.querySelector('.cartSizeClosets');
        if (sizeElement) {
            return sizeElement.innerText.replace('Tamanho: ', '');
        }
    }
    console.log(product_id);
};
const getCartItemColor = (product_id, buttonElement) => {
    let cartItem = getParentCartItemElement(buttonElement);
    if (cartItem) {
        let colorElement = cartItem.querySelector('.colorCart');
        if (colorElement) {
            let colorClasses = colorElement.classList;
            return colorClasses[colorClasses.length - 1];
        }
    }
    console.log(product_id);
};
const getParentCartItemElement = (element) => {
    while (element && !element.classList.contains('item')) {
        element = element.parentElement;
    }
    return element;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.closest('.item').dataset.id;
        let size = getCartItemSize(product_id, positionClick);
        let color = getCartItemColor(product_id, positionClick);
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(product_id, size, color, type);
        addCartValueDiv();
    }
});
const changeQuantity = (product_id, size, color, type) => {
    let positionItemInCart = carts.findIndex((value) => 
        value.product_id == product_id && 
        value.selectedSize == size && 
        value.selectedColor == color
    );

    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
const addCartValueDiv = () => {
    let cartValueDiv = document.querySelector('.cartValueDiv');
    let backValueElement = document.querySelector('.backValueElement');

    if (!cartValueDiv) {
        cartValueDiv = document.createElement('div');
        cartValueDiv.classList.add('cartValueDiv');

        backValueElement.appendChild(cartValueDiv);
    }

    cartValueDiv.innerHTML = `
        <h6>Valor total do carrinho:
            <span>R$${calculateTotal().toFixed(2)}</span>
        </h6>
    `;
}
const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            filterAndDisplayProducts('todos');

            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                console.log(carts);
                addCartToHTML();
                addCartValueDiv();
            }
        });
}
initApp();

var decrementValue = 1;
var activeNotifications = [];
var notificationCounter = 1;

function updateProgressBar(progressBar, width) {
    progressBar.style.width = width + "%";

    if (width <= 0) {
        clearInterval(progressBar.interval);

        progressBar.addEventListener('transitionend', function () {
            resetProgressBar(progressBar);
            progressBar.style.display = 'none';
        }, { once: true });
    }
}

function resetProgressBar(progressBar) {
    progressBar.style.width = "0%";
    progressBar.style.display = "block";
}

function increaseProgressBar(progressBar) {
    var currentWidth = parseFloat(progressBar.style.width);
    var newWidth = currentWidth + decrementValue;

    if (newWidth <= 100) {
        updateProgressBar(progressBar, newWidth);
    } else {
        clearInterval(progressBar.interval);
    }
}

function startIncreasing(progressBar) {
    resetProgressBar(progressBar);
    progressBar.interval = setInterval(function () {
        increaseProgressBar(progressBar);
    }, 50);
}

function showNotification(notificationElement) {
    playSound('../sond/sondToaster.MP3');
    vibrate('simple', 0, 600)
    var existingNotification = activeNotifications.find(item => item.notificationElement === notificationElement);

    if (existingNotification) {
        var newNotificationElement = notificationElement.cloneNode(true);
        var progressBar = newNotificationElement.querySelector(".progress");
        var newId = "myProgressBar" + (notificationCounter++);
        progressBar.id = newId;

        document.body.appendChild(newNotificationElement); 
        activeNotifications.push({
            notificationElement: newNotificationElement,
            progressBar: progressBar
        });

        startIncreasing(progressBar);

        setTimeout(function () {
            hideNotification(newNotificationElement, progressBar);
        }, 5800);
    } else {
        var progressBar = notificationElement.querySelector(".progress");
        notificationElement.style.display = 'grid';
        notificationElement.style.animation = 'inset .3s ease-out';
        notificationElement.style.top = '10px';

        activeNotifications.push({
            notificationElement: notificationElement,
            progressBar: progressBar
        });

        startIncreasing(progressBar);

        setTimeout(function () {
            hideNotification(notificationElement, progressBar);
        }, 5800);
    }

    notificationElement.addEventListener('click', function () {
        hideNotification(notificationElement, progressBar);
    });
}

function hideNotification(notificationElement, progressBar) {
    notificationElement.style.animation = 'insetOut .3s ease-out';

    setTimeout(function () {
        notificationElement.style.display = 'none';
        resetProgressBar(progressBar);
        activeNotifications = activeNotifications.filter(item => item.notificationElement !== notificationElement);
    }, 300);
}

function hideAllNotifications() {
    activeNotifications.forEach(item => {
        hideNotification(item.notificationElement, item.progressBar);
    });
}

function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
}
function vibrate(type, interval, duration) {
    if (!window.navigator || !window.navigator.vibrate) {
        return;
    }
  
    if (type === 'doble') {
      var interval = duration + interval;
      window.navigator.vibrate(duration);
        setTimeout(() => {
            window.navigator.vibrate(duration);
        }, interval);
    } else if (type === 'simple') {
      window.navigator.vibrate(duration);
    } else {
      return;
    }
}

const colorMap = {
    'color1': 'Branco',
    'color2': 'Preto',
    'color3': 'Bege',
    'color4': 'Vermelho',
    'color5': 'Verde',
    'color6': 'Vinho',
    'color7': 'Rosa bebê',
};
document.querySelector('.checkOut').addEventListener('click', () => {

    var selectElement = document.getElementById('selectPag');
    var selectedValueElement = selectElement.value;
    
    const selectedOptions = {
        'null': 'null',
        'pix': 'Pix',
        'dinheiro': 'Dinheiro',
        'debito': 'Cartão de Débito',
        'credito': 'Cartão de crédito',
    };

    if (selectedOptions[selectedValueElement] === "null") {
        showNotification(notification);
        return;
    }

    if (carts.length > 0) {
        console.log("numero de produtos: " + carts.length);

        let mensagem = '*Olá, estou interessado(a) nos seguintes itens:*\n';
        let totalQuantity = 0;
        let totalPrice = 0;

        carts.forEach(cart => {
            let positionProduct = listProducts.findIndex(value => value.id == cart.product_id);

            if (positionProduct >= 0) {
                let info = listProducts[positionProduct];
                let colorName = colorMap[cart.selectedColor] || cart.selectedColor;

                mensagem += `*${info.name}* - Quantidade: ${cart.quantity}\n- Tamanho: ${cart.selectedSize}\n- Cor: ${colorName}\n\n`;
                totalQuantity += cart.quantity;
                totalPrice += info.price * cart.quantity;
            }
        });

        mensagem += `*Quantidade total de itens:* _${totalQuantity}_\n`;
        mensagem += `*Forma de pagamento:* _${selectedOptions[selectedValueElement]}_\n\n`
        mensagem += `*Valor total:* _R$${totalPrice.toFixed(2)}_`;

        mensagem = encodeURIComponent(mensagem);
        let linkWhatsapp = `https://wa.me/+5581996160503?text=${mensagem}`;

        window.open(linkWhatsapp, '_blank');
    } else {
        showNotification(notificationCart);
        return;
    }
});

function scrollToBody() {
    var destinationElement = document.getElementById('containerr');
    destinationElement.scrollIntoView({ behavior: 'smooth' });
}
