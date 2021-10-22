const form = document.querySelector('#login-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fieldMissing = document.querySelector('#field-missing')
    fieldMissing.hidden = true;

    const formData = {
        email: form.elements.email.value,
        password: form.elements.password.value,
    }

    if(!formData.email | !formData.password){
        fieldMissing.hidden = false
        return
    }

    login(formData)
})

const login = async (formData) => {
    const incorrectUser = document.querySelector('#incorrect-credentials')

    const res = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    if(res.status == 400){
        incorrectUser.hidden = false
        return
    }

    console.log(res.headers.values())

    // const parsedRes = await res.json()

    // console.log(parsedRes)

    // console.log(res.headers)

}

// const userToken = ()=> {(console.log(login))}

// userToken()

const saveUserData = (formData) => {
    localStorage.userEmail = formData.email

    openMainAppPage()
}

const openMainAppPage = () => {
    window.location = "../main/index.html"
}