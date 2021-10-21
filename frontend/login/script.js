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
    fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
}