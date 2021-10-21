const form = document.querySelector('#login-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = {
        email: form.elements.email.value,
        password: form.elements.password.value,
    }

    if(!formData.email){
        console.log("email vazio")
        return
    }

    if(formData.password != formData.passwordRepeat){
        const passwordError = document.querySelector('#password-error')
        passwordError.hidden = false
        return
    }

    // registerUser(formData)
})

const registerUser = async (formData) => {
    fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}