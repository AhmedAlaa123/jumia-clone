var showPassword = document.getElementById('show-password')
var passwordInput = document.getElementById('password')
var users = [];




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
    console.log(users)
  
}


var userDataForm = document.getElementById('user-data')
userDataForm.addEventListener('submit', e => {

    e.preventDefault()
    if (!users.length) {
        getData('get','/Database/users.json',false,getUsers)
        return
    }
    // console.log(e.email)
    var index = users.findIndex(user => user.Email === e.target.email.value)
    // console.log(index,'index')
    if (index > -1) {
        alert('This Email Is Used For Another User')
        e.target.email.focus()
    }
    else {
        //    console.log(e.target.email)
        var user = {
            FName: e.target.fname.value,
            LName: e.target.lname.value,
            Email: e.target.email.value,
            password: e.target.password.value,
            Phone: e.target.phone.value,
            AcceptTerms: e.target.acceptTerms.checked,
            ReceiveNotification: e.target.get_gumia_news.checked
        }
        users.push(user)
        sessionStorage.setItem('users', JSON.stringify(users))
        alert('Account is Created')
        history.back()
        // location.href = '../index.html'
    }




})