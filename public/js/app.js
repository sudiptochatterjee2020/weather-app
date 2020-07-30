const weatherUrl = '/weather?address='
const weatherForm = document.querySelector('form');
const msgone = document.querySelector('#message-1');
const msgtwo = document.querySelector('#message-2')
const searchString = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = searchString.value
    msgone.textContent = "Loading..."
    msgtwo.textContent = ""
    fetch(weatherUrl + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgone.textContent = ''
                msgtwo.textContent = data.error
            } else {
                if (data.errorMessage) {
                    msgone.textContent = ''
                    msgtwo.textContent = data.errorMessage    
                } else {
                    msgone.textContent = 'The current temperature is ' + data.currently + ' Celsius. It feels like ' + data.feelsLike + ' Celsius.'
                    msgtwo.textContent = 'Weather summary: ' + data.weatherDescr
                }
            }
        })
    })
})