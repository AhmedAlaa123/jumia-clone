var itemImageElement=document.getElementById('itemImage')
var itemNameElement=document.getElementById('name_label')
var itemBrandElement=document.getElementById('item-brand')
var ratingContainerElement=document.getElementById('rating')
var itemPriceElement=document.getElementById('item_price')
var itemOldPriceElement=document.getElementById('old_item_price')
var itemDesciptionListElement=document.getElementById('item_desciption_list')
var btnAddToCart=document.getElementById('add_item_tobin')

var succeessMessageElement=document.getElementById('item-is-added')

function load(...params) {

    if (!JSON.parse(sessionStorage.getItem('product_details')).ItemId == location.search.split('=')[1])
        document.write(' Page Not Found')
    else {
        var item=JSON.parse(sessionStorage.getItem('product_details'))
        
        console.log(item)
        itemImageElement.src=`/${item.ImageUrl}`
        itemImageElement.title=item.Name;
        itemNameElement.innerHTML=item.Name
        itemBrandElement.innerHTML=`${item.Brand} |`
        var activeRating=Math.floor(item.rate/3)
        var notActiveRating=5-activeRating
        console.log(activeRating,notActiveRating)
        var stars=''
        for(var x=0;x<activeRating;x++)
        {
            stars+=` <span style="color: #F6B01E;font-size: 20px;">&starf;</span>`
        }
        for(var x=0;x<notActiveRating;x++)
        {
            stars+=`<span style="color: gray;font-size: 20px;">&star;</span>`
        }
        ratingContainerElement.innerHTML=stars

       if(item.Discount)
       {
            var priceAfterDiscount=item.Price-item.Price*(item.Discount/100).toFixed(2)
            itemPriceElement.innerHTML=`${priceAfterDiscount} جنيه`;
            itemOldPriceElement.innerHTML=`${item.Price} جنيه`
       }else{
            itemPriceElement.innerHTML=`${item.Price} جنيه`
            // itemOldPriceElement.style.display='none'
       }
       itemDesciptionListElement.innerHTML=`
       <br>
       <li>البلد المصنعه : ${item.CountryMaker}</li>
       <br>
       <li>الحجم : ${item.Size}</li>
       <br>
        <li>اللون : ${item.color}</li>
        <br>
        <li>المواد المصنعه : ${item.RowMaterial}</li>

       `

       btnAddToCart.addEventListener('click',(e)=>{

        var cartItemsString=sessionStorage.getItem('cartItems')
        var cartItems=[]
        if(cartItemsString)
        {
            cartItems =JSON.parse(cartItemsString)
       
        }
        var index=cartItems.findIndex(product=>{
            return item.ItemId===product.ItemId
        })

        //check if item is in cart if  true increment quantity and update tota; price
        if(index>-1)
        {
            cartItems[index].quantity++;
            cartItems[index].totalPrice=cartItems[index].quantity*cartItems[index].finalPrice
        }else{
        item.quantity=1
        item.finalPrice=item.Price-item.Price*(item.Discount/100).toFixed(2)
        item.totalPrice=item.quantity*item.finalPrice;
        cartItems.push(item)
        }
        sessionStorage.setItem('cartItems',JSON.stringify(cartItems))
        succeessMessageElement.classList.add('active')
        var timeoutId=setTimeout(() => {
            succeessMessageElement.classList.remove('active')
        }, 2000);

       })

    }


    console.log()

}
load()