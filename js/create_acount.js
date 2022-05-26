var showPassword = document.getElementById('show-password')
var passwordInput = document.getElementById('password')
var users = [];

getUsers();


showPassword.addEventListener('click', (e) => {
    if (passwordInput.getAttribute('type') === 'password')
        passwordInput.setAttribute('type','text')
    else
        passwordInput.setAttribute('type','password')

        // showPassword.classList.toggle
        e.target.classList.toggle('fa-eye-slash')
})




function getUsers() {
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            users = JSON.parse(xhr.responseText)
            sessionStorage.setItem('users', JSON.stringify(users))
            console.log(users)
        }
    }
    xhr.open('get', '../Database/users.json', false)
    xhr.send()
}


var userDataForm = document.getElementById('user-data')
userDataForm.addEventListener('submit', e => {

    e.preventDefault()
    if (null) {
        getUsers()
        return
    }
    var index = users.findIndex(user => user.Email == e.email)
    if (index > -1) {
        alert('This Email Is Used For Another User')
        console.log(index)
        console.log(users)
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
        location.href = '../index.html'
    }




})