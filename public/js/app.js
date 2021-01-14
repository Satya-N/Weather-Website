console.log('Client side Javascript file is Loaded ')


const weatherForm = document.querySelector('form')

const searchEl = document.querySelector('input')
const messageOne = document.querySelector('#errMessage')
const messageTwo = document.querySelector('#successMessage')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchEl.value


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})