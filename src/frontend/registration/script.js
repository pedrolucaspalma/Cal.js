const form = document.querySelector('#registration-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fieldMissing = document.querySelector('#field-missing')
    const passwordError = document.querySelector('#password-error')

    fieldMissing.hidden = true
    passwordError.hidden = true

    
    const formData = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        passwordRepeat: form.elements.passwordRepeat.value
    }

    if(!formData.name | !formData.email | !formData.password){
        fieldMissing.hidden = false
        return
    }

    if(formData.password != formData.passwordRepeat){
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
    });

    // openPostRegistrationPage()
}

// const openPostRegistrationPage = () =>{

// }