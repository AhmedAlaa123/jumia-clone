var cartItems = []
var cartItemsContainerElement = document.getElementById('Cart-items-Container')
var totalPriceDisplayElement = document.createElement('h2')
totalPriceDisplayElement.classList.add('text-main')
totalPriceDisplayElement.className = 'text-main padding margin-block-end-20 margin-block-start-20 '

var btnPayNowElement = document.createElement('div')
btnPayNowElement.className = 'btn-face text-center padding'
btnPayNowElement.style.display = 'block'
btnPayNowElement.innerHTML = 'الطلب الان'

btnPayNowElement.addEventListener('click', event => {
    if(!sessionStorage.getItem('issigned'))
    {
        alert('يجب تسجيل الدخول لاتمام عمليه الشراء اولا سيتم تحويلك الى صفحه تسجيل الدخول (:')
        location.href='/pages/sign_in'
        return
    }
    cartItems = []
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
    alert('تم تنفيذ طلبك وسيكون طلبك بحوزتك فى اقرب وقت')
    render();
})

function render(...params) {
    cartItemsContainerElement.innerHTML = ''
    var itemsString = sessionStorage.getItem('cartItems')
    var emptyCartElement = document.createElement('h1')
    emptyCartElement.style = 'height:80vh'
    cartItemsContainerElement.style.fontSize = '30px'
    emptyCartElement.className = 'row justify-content-center align-items-center text-danger'
    emptyCartElement.innerHTML = 'السله فارغه'
    if (!itemsString) {
        cartItemsContainerElement.append(emptyCartElement)

    }
    else {

        cartItems = JSON.parse(itemsString)
        // if cart is Empty
        if (cartItems.length == 0) {
            cartItemsContainerElement.append(emptyCartElement)
        }
        else {
            // creating card for each items in cart
            cartItems.forEach(dispalyItemAsCard);

            cartItemsContainerElement.appendChild(totalPriceDisplayElement)
            cartItemsContainerElement.appendChild(btnPayNowElement)
            updateTotalPrice()
        }
    }
}

function updateTotalPrice() {
    var totalPrice = 0
    cartItems.forEach(item => {
        totalPrice += parseFloat(item.totalPrice);
    })
    totalPriceDisplayElement.innerHTML = `الاجمالى  : ${totalPrice.toFixed(2)} جنيه`
    console.log(totalPrice)
}

function dispalyItemAsCard(item, index) {
    // creating card div
    var cardDiv = document.createElement('div')
    cardDiv.className = 'card bg-white padding margin-block-end-20'

    var rowDiv = document.createElement('div')
    rowDiv.className = 'row'

    var colDiv = document.createElement('div')
    colDiv.className = 'col row align-items-center justify-content-center'

    // creating img

    var img = document.createElement('img')
    img.className = 'img-cover'
    img.src = `/${item.ImageUrl}`
    colDiv.appendChild(img)

    var col3 = document.createElement('div')
    col3.className = 'col-3 margin-inline-start-20 column'
    var h2 = document.createElement(h2)
    h2.innerHTML = item.Name
    col3.appendChild(h2)
    var div = document.createElement('div')
    div.className = 'margin-block-start-20'
    var h3 = document.createElement('h3')
    h3.innerHTML = `${item.totalPrice} : جنيه`
    div.appendChild(h3)
    var label = document.createElement('label')
    label.innerHTML = `الكميه : `
    div.appendChild(label)
    var quantityInput = document.createElement('input')
    quantityInput.type = 'number'
    quantityInput.min = '1'
    quantityInput.value = item.quantity
    quantityInput.addEventListener('change', e => {
        console.log(e.target.value)
        var quntity = parseInt(e.target.value)
        item.quantity = quntity
        item.totalPrice = (item.finalPrice * quntity).toFixed(2);
        h3.innerHTML = `${item.totalPrice} : جنيه`
        updateTotalPrice()

    })

    div.appendChild(quantityInput)

    // create remove from cart button
    var btnRemoveFromCart = document.createElement('button')
    btnRemoveFromCart.className = 'btn-danger margin-block-end-20 margin-block-start-20'
    btnRemoveFromCart.style.position = 'relative';
    btnRemoveFromCart.innerHTML = `ازاله من السله     <i class="fa fa-trash" style="position: absolute; right:50px"></i>`
    // adding click Event on Button
    btnRemoveFromCart.addEventListener('click', (event) => {
        var confirmResult = confirm('هل انت متأكد انك تريد ازاله المنتج من السله ؟')

        if (confirmResult) {
            // remove item from cart
            cartItems.splice(index, 1)
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
            // re- render
            render()
        }


    })
    col3.appendChild(div)
    col3.appendChild(btnRemoveFromCart)

    rowDiv.appendChild(colDiv)
    rowDiv.appendChild(col3)
    cardDiv.appendChild(rowDiv)
    // appending col , col3 to cartItemsContainerElement
    cartItemsContainerElement.appendChild(cardDiv)
    // cartItemsContainerElement.appendChild(col3)
    console.log(item,)
}


render()



/*

  <div class="card bg-white padding margin-block-end-20">
                    <div class="row">
                        <div class="col row align-items-center justify-content-center" >
                            <img class="img-cover" src="/images/Categories/Fashion/1.jpg" alt="">
                        </div>
                        
                        <div class="col-3 margin-inline-start-20 column">
                            <h2>Product Name</h2>
                            <div class="margin-block-start-20">
                            <h3 class="margin-block-end-20">102 جنيه السعر :</h3>
                            <label>الكميه : </label>
                            <input type="number" min="1">
                            </div>
                            <button class="btn-danger margin-block-end-20 margin-block-start-20" style="position: relative;"> ازاله من السله     <i class="fa fa-trash" style="position: absolute; right:50px"></i></button>
                        </div>
                    </div>
                </div>
*/