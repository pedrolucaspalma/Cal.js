const form = document.querySelector('#registration-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        passwordRepeat: form.elements.passwordRepeat.value
    }

    if(formData.password != formData.passwordRepeat){
        const passwordError = document.querySelector('#password-error')
        passwordError.hidden = false
        return
    }

    registerUser(formData)
})

const registerUser = async (formData) => {
    fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
}