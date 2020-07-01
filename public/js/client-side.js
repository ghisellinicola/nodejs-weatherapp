console.log('Client side javascript is loaded!')

// example 1
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// example 2
// fetch('http://localhost:3000/weather?location=Bologna').then((response) => {
    
// response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.degrees)
//             console.log(data.forecast)
//             console.log(data.rain_perc)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMsg = document.querySelector('#error')
const forecastMsg = document.querySelector('#forecast')

// errorMsg.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault() //do not prevent the browser to reload!

    const location = search.value

    console.log('Location: ' + location)

    fetch('/weather?location=' + location).then((response) => {
        
    response.json().then((data) => {
            if (data.error){
                errorMsg.textContent = data.error
                console.log(data.error)
            } else {
                console.log(data.description)
                console.log(data.value)
                // forecastMsg.textContent = data.forecast + ' ' + data.degrees + ' ' + data.rain_perc
                forecastMsg.textContent = data.description
                // console.log(data.degrees)
                // console.log(data.forecast)
                // console.log(data.rain_perc)
            }
        })
    })
})