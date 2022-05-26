
//select  button Element
var btnScrollTop=document.getElementById('btn-scroll-top')

// 
window.onscroll=e=>{
    if(window.scrollY>window.innerHeight    )
    {
        btnScrollTop.classList.add('active')
        // alert('sss')
    }
    else{
        btnScrollTop.classList.remove('active')
    }
}


// adding click event
btnScrollTop.addEventListener('click',e=>{
    window.scrollTo(0,0)
})