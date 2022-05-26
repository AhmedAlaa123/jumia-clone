var navItemBtn = document.querySelectorAll('nav >.nav-item:not(:last-of-type)')
navItemBtn.forEach(element => {
    element.addEventListener('click', e => {

        
 
  // gete dropdown emnu for current item
  var dropDownMenu = element.querySelector('.drop-down-menu')
       
        // remove active class from all drop-down-menu
        document.querySelectorAll('.nav-item .drop-down-menu').forEach(
            ele => {
                if (ele!=dropDownMenu)
                    if (ele.classList.contains('active')) {
                        ele.classList.remove('active')
                    }
            }
        )
      
            // get NavItemTitle for current ELement
            var navItemTitle=element.querySelector('.nav-item-title');
        // remove active class from all nav-item-title
        document.querySelectorAll('.nav-item-title').forEach(
            ele => {
                if(ele!=navItemTitle)
                {
                    ele.classList.remove('active')
                }
            }
            )

        if (!element.querySelector('.nav-item-title').classList.contains('active')) {
            element.querySelector('.nav-item-title').classList.add('active')
        }
        // toggel active class on dropdownmenu
        if (dropDownMenu.classList.contains('active')) {
            dropDownMenu.classList.remove('active')

        }
        else {
            dropDownMenu.classList.add('active')

        }
    })

})

document.forms[0].addEventListener('submit',e=>{
    e.preventDefault()
})