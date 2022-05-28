var loginForm=document.getElementById('user-data')
var users=[]
var rememberMeCbx=document.getElementById('remember-me')
var showPassword = document.getElementById('show-password')
var passwordInput = document.getElementById('password')

showPassword.addEventListener('click', (e) => {
    if (passwordInput.getAttribute('type') === 'password')
        passwordInput.setAttribute('type','text')
    else
        passwordInput.setAttribute('type','password')

        // showPassword.classList.toggle
        e.target.classList.toggle('fa-eye-slash')
})


if(!sessionStorage.getItem('users'))
{
    getData('get','/Database/users.json',false,getUsers)
}
else{
    users=JSON.parse(sessionStorage.getItem('users'))
}
function getUsers(usersData) {
    users=usersData
    sessionStorage.setItem('users', JSON.stringify(users))
    // console.log(users)
}

if(localStorage.getItem('userEmailAndPass'))
{
    var signInData=JSON.parse(localStorage.getItem('userEmailAndPass'))
    loginForm.email.value=signInData.email
    loginForm.password.value=signInData.password
    rememberMeCbx.checked=true
}

loginForm.addEventListener('submit',(e)=>{
    
    e.preventDefault();

    if(e.target.email.value==='')
    {
        alert('Please Enter Your Email')
        e.target.email.focus()
        return
    }
    if(e.target.password.value==='')
    {
        alert('Please Enter Your Password')
        e.target.password.focus()
        return
    }
    var email=e.target.email.value
    var password=e.target.password.value
    console.log(email,password )
    if(rememberMeCbx.checked)
    {
        var userEmailAndPass={
            email,password
        }
        localStorage.setItem('userEmailAndPass',JSON.stringify(userEmailAndPass))
    }else{
        localStorage.removeItem('userEmailAndPass')
    }
    if(users.length==0)
    {
        getData('get','/Database/users.json',false,getUsers)
        return
    }
    console.log(users,'users')
    var index=users.findIndex(user=>{
        console.log(user)
        return user.Email===email&&password===user.password
    })
    if(index>-1)
    {

        alert('شكرا على تسجيل الدخول')
        sessionStorage.setItem('issigned',true)
        location.href='/';
    }
    else{
        alert('الاميل او كلمه المرور خاطئه!')
        return
    }

})



