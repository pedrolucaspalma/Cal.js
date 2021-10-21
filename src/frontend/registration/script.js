const form = document.querySelector('#registration-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("email", document.getElementById("email").value)

    console.log(formData)
})