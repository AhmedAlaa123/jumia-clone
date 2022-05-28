'use-strict'
var parent = document.querySelector('main')
function getFlashSalesProducts() {


    var Xhttp = new XMLHttpRequest()
    Xhttp.onreadystatechange = function (event) {
        if (this.readyState == 4 && this.status == 200) {
       
            // parsing data
            var products = JSON.parse(this.responseText)


          



            console.log(products);
            var flashSaleDate = new Date(products.time.startDate.year, products.time.startDate.month - 1, products.time.startDate.day, products.time.startDate.hour, products.time.startDate.minut, products.time.startDate.second)
            console.log(flashSaleDate.toLocaleTimeString())

            var currentDate = new Date()
            // var deffrent = (flashSaleDate.getTime() + products.time.hours * 60 * 60 * 1000) - currentDate.getTime();
            // console.log(flashSaleDate.toLocaleDateString() === currentDate.toLocaleDateString())
            // console.log(products.time.startDate.hour - currentDate.getHours() <= 0)

            if ((flashSaleDate.getTime() + products.time.hours * 60 * 60 * 1000) - currentDate.getTime() > 0) {
     
                    // console.log((flashSaleDate.getTime() + products.time.hours * 60 * 60 * 1000) - currentDate.getTime())
                    
                    
                    // creating Flash Sale Sction

                    var node = document.createElement('section')
                    node.setAttribute('id', 'falsh-sale')
                    node.className = 'margin-block-start-20 margin-block-end-20'
                    var falshSaleHeader = document.createElement('div')
                    falshSaleHeader.className = 'section-title row justify-content-between text-white bg-danger padding align-items-center'
                    falshSaleHeader.innerHTML = falshSaleHeaderContent
                    node.appendChild(falshSaleHeader)
                    // node.innerHTML=x
        
                    var items=showFlashSalesProduct(products.items)
                    node.appendChild(items)
        
                    parent.insertBefore(node, document.getElementById('jumia-express-image').nextSibling)
        
        
                    var flashSalesElement = document.getElementById('falsh-sale')
                    var flashSalHour = document.getElementById('flash-sale-hours')
                    var flashSalMinut = document.getElementById('flash-sale-minuts')
                    var flashSalSecond = document.getElementById('flash-sale-seconds')
                    
                    var totalMS = (flashSaleDate.getTime() / 1000 + products.time.hours * 60 * 60) - currentDate.getTime() / 1000;

                    
                    var s = 1, m = 60 * s, h = 60 * m // unita in seconds
                    // totalMS/=1000 // to seconds
                    var Rh = Math.floor(totalMS / h)
                    totalMS -= Rh * h
                    var Rm = Math.floor(totalMS / m)
                    totalMS -= Rm * m
                    var Rs = Math.floor(totalMS / s)
                    totalMS -= Rs * s
                    var intervalId = setInterval(() => {
                        Rs--
                        if (Rs <= 0) {
                            if (Rm <= 0) {
                                if (Rh <= 0) {
                                    clearInterval(intervalId)
                                    parent.removeChild(node)
                                    // flashSalesElement.style.display='none'
                                }
                                else {
                                    Rm = m*60
                                    Rh--
                                }
                            } else {
                                Rs = s*60
                                Rm--
                            }
                        }

                        flashSalHour.innerHTML = Rh;
                        flashSalMinut.innerHTML = Rm
                        flashSalSecond.innerHTML = Rs

                    }, 1000)


                    // flashSalesElement.style.display='block'

                }

                // parent.before(node)

            }

        

    }
    Xhttp.open('get', '/Database/FlashSales.json')
    Xhttp.send()
}



// calling

getFlashSalesProducts();
// parent.innerHTML=x

var falshSaleHeaderContent = `
<span>Flash Sales Every Day</span>
<div id="flash-sale-time">
    الوقت المتبقى  : <span id="flash-sale-hours"></span> ساعه : <span id="flash-sale-minuts"></span> دقيقه  : <span id="flash-sale-seconds"></span> ثانيه
</div>
<a href="#" class="text-white" style="font-size: 1rem">عرض الكل <i class="fa fa-chevron-left"></i></a>


`

function showFlashSalesProduct(products) {
    if (!products.length) return null
    var itemsView = document.createElement('div')
    itemsView.className = 'items-view row padding'

    products.forEach(product => {
        console.log(product.item.Price - product.item.Price * (product.item.Discount)/100,'item')
        // create card item
        var item = document.createElement('div')

        item.className = 'card column item padding'
        item.innerHTML = `
              <img class="item-img" src="./${product.item.ImageUrl}" alt="">
                    <h4 class="item-name">${product.item.Name}</h4>
                    <h5 class="item-price">${(product.item.Price - product.item.Price *  (product.item.Discount)/100).toFixed(2)} جنيه</h5>
                    ${product.item.Discount ? '<del class="item-before-discount">' + product.item.Price + ' جنيه</del>' : ''}
                    <span class="item-reminder">${product.reminderProducts}باقى منتجات </span>
                    <div class="item-progress-container">
                        <span class="item-progress" style='width:${(product.reminderProducts / product.numberOfProducts) * 100}%'></span>
                    </div>
                    ${product.item.Discount ? '<span class="item-discount text-danger">' + product.item.Discount + '%-</span>' : ''}
        `
        item.addEventListener('click',e=>{
            sessionStorage.setItem('product_details',JSON.stringify(product.item))
            location.assign(`/pages/ItemDetail/?itemId=${product.ItemId}`)
        })

        itemsView.appendChild(item)
    });
    return itemsView
}
 
