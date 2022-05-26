
'use strict'

var CatesImgsContainer=document.getElementById('categories-images-container')
var itemsContainer=document.getElementById('items-container')
var cateId=parseInt(location.search.split('=')[1])

function  setCatesImages(categories){
    


    // getting The Index Of Category Object
    // if(cateId===NaN) return
    var index=categories.findIndex(cate=>{
        return cate.CategoryId==cateId
    })
    if(index>-1)
    {
        
        var cateImgesBaseUrl='../'+categories[index].Category_Image_baseUrl
        categories[index].Category_images.forEach(image => {
            // console.log()

            // creating div

            var div=document.createElement('div')
            div.classList.add('col-3')

            var imgElement=document.createElement('img');
            imgElement.setAttribute('src',`${cateImgesBaseUrl}/${image}`)
            imgElement.classList='img-cover'
            // imgElement.style.minHeight='300px'
            // imgElement.style.objectFit=''
            div.appendChild(imgElement)
            
            CatesImgsContainer.appendChild(div)

            

        });
        console.log(categories[index])

    }
}

getData('get','../Database/Categories.json',false,setCatesImages)

function setItems(items){
   if(!cateId) 
   itemsContainer.parentElement.innerHTML=`
   <h1 class='bg-danger text-white col' id='no-elemnt-message'>لم يتم اضافه اى منتجات للتصنيف الحالى</h1>
   `
   else{

    var falshSaleHeader = document.createElement('div')
    falshSaleHeader.className = 'section-title row justify-content-center text-white bg-green padding align-items-center'
    falshSaleHeader.innerHTML = 'المنتجات'
    itemsContainer.parentElement.insertBefore(falshSaleHeader,itemsContainer)


    // adding items

    var filteredProducts=items.filter(item=>item.CateId===cateId)

    filteredProducts.forEach(product=>{
        var item = document.createElement('div')

        item.className = 'card column item padding'
        item.innerHTML = `
              <img class="item-img" src="../${product.ImageUrl}" alt="">
                    <h4 class="item-name">${product.Name}</h4>
                    <h5 class="item-price">${(product.Price - product.Price *  (product.Discount)/100).toFixed(2)} جنيه</h5>
                    ${product.Discount ? '<del class="item-before-discount">' + product.Price + ' جنيه</del>' : ''}
                    ${product.Discount ? '<span class="item-discount text-danger">' + product.Discount + '%-</span>' : ''}
        `
        item.addEventListener('click',e=>{
            location.assign(`./ItemDetail.html?itemId=${product.ItemId}`)
            sessionStorage.setItem('product_details',JSON.stringify(product))
        })
        itemsContainer.appendChild(item)
    })

   }
  
        


}
getData('get','../Database/items.json',false,setItems)





