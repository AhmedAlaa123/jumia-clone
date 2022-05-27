var Language = 'ar'

var slidingIndex = 0
var btnSlidRight = document.querySelector('.next')
var btnSlidLeft = document.querySelector('.prev');
var slidingElementLength = 0
var sildingElements = null
var indicators = null
var overlay = document.getElementById('overlay')

// check if overlay is shown or not 
if (!sessionStorage.getItem('shown')) {
    overlay.style.display='flex'
    setTimeout(() => {
        console.log('yes')
        document.body.removeChild(overlay)
        sessionStorage.setItem('shown',true)
    }, 5000)
}else{
    document.body.removeChild(overlay)
}

// sliding left
btnSlidLeft.addEventListener('click', e => {

    if (!sildingElements || !indicators) return
    if (slidingIndex >= slidingElementLength)
        slidingIndex = 0;
    console.log(slidingIndex, slidingElementLength)
    if (slidingIndex < slidingElementLength)
        sildElement()
    slidingIndex++
})
btnSlidRight.addEventListener('click', e => {
    if (!sildingElements || !indicators) return
    console.log(slidingIndex)
    if (slidingIndex < 0)
        slidingIndex = slidingElementLength - 1;

    sildElement()
    slidingIndex--
})
function getSilderImages() {
    var HomeSliderInner = document.getElementById('home-slider-inner')
    var jumaiAllNeedItemsContainer = document.getElementById('jumia-all-you-need-anoncement')
    var httpXml = new XMLHttpRequest();

    httpXml.onreadystatechange = function (event) {
        if (this.readyState === 4 && this.status === 200) {
            var images = JSON.parse(this.responseText)
            showjumaiAllNeedItems(images, jumaiAllNeedItemsContainer)
            slidingElementLength = images.length
            var bollitsContainer = document.querySelector('.bollits');
            var ImageElement;
            var circleElement;
            if (images.length > 1) {
                btnSlidRight.style.display = 'flex';
                btnSlidLeft.style.display = 'flex';
                bollitsContainer.style.display = 'block'
                slidingIndex = Math.floor(Math.random() * images.length)
                images.forEach((image, index) => {
                    circleElement = document.createElement('li')
                    circleElement.classList.add('circle')

                    ImageElement = document.createElement('img')
                    if (slidingIndex == index) {
                        ImageElement.classList.add('active')
                        circleElement.classList.add('active')
                    }

                    ImageElement.setAttribute('src', image)
                    HomeSliderInner.appendChild(ImageElement)
                    bollitsContainer.appendChild(circleElement)
                });
                sildingElements = HomeSliderInner.querySelectorAll('#home-slider-inner>*')
                indicators = bollitsContainer.querySelectorAll('.circle')
                startSliding();
            }
            else if (images.length == 1) {
                ImageElement = document.createElement('img')
                ImageElement.classList.add('active')
                ImageElement.setAttribute('src', images[0])
                HomeSliderInner.appendChild(ImageElement)
                btnSlidRight.style.display = 'none'
                btnSlidLeft.style.display = 'none'
            }
        }
    }
    httpXml.open("get", "../Database/Silder_Home_images.json")
    httpXml.send();
}

function getCategoriesData() {
    var CategoriesElement = document.getElementById('Sections-menu')
    var httpXml = new XMLHttpRequest();

    httpXml.onreadystatechange = function (event) {
        if (this.readyState === 4 && this.status === 200) {
            var Categories = JSON.parse(this.responseText)
            console.log(Categories)

            Categories.forEach(element => {

                var ListItem = document.createElement('li')
                var Anchor = document.createElement('a')
                var CategoryIcon = document.createElement('i');
                Anchor.setAttribute('href', `./pages/Categories/?CategoryId=${element.CategoryId}`)
                // Anchor.setAttribute('target', '_blank')

                CategoryIcon.className = `fa ${element.Category_Icon} margin-inline-end-10`
                Anchor.appendChild(CategoryIcon);

                var SectionName = document.createTextNode(Language === 'ar' ? element.Arabic_Name : element.English_Name);

                Anchor.appendChild(SectionName);
                ListItem.appendChild(Anchor);
                ListItem.classList.add('margin-block-end-10')
                CategoriesElement.appendChild(ListItem);
            });
        }
    }
    httpXml.open("get", "../Database/Categories.json")
    httpXml.send();


}
function startSliding() {

    console.log(indicators)
    var intervalId = setInterval(() => {
        if (!indicators || !sildingElements) {
            clearInterval(intervalId)
            return
        }
        if (slidingIndex >= sildingElements.length || slidingIndex < 0) {
            slidingIndex = 0
        }
        sildElement();

        slidingIndex++;
    }, 5000);
}

function sildElement() {
    sildingElements.forEach((element, index) => {
        console.log(index)
        element.classList.remove('active')
        indicators[index].classList.remove('active')
    })
    sildingElements[slidingIndex].classList.add('active')
    indicators[slidingIndex].classList.add('active')
}

function showjumaiAllNeedItems(images, container) {
    images.forEach(image => {
        var div = document.createElement('div')
        div.className = 'col-6 card'
        div.style.cursor = 'pointer'
        div.style.border = '2px solid var(--border-color)'
        var img = document.createElement('img')
        img.className = 'img-cover'
        img.style.maxHeight = '350px'
        img.setAttribute('src', image)
        div.appendChild(img)

        container.appendChild(div)


    })
}




// call
getSilderImages();
getCategoriesData()