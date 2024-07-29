const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

// --------------------------------------------------

// Lesson 1: Sending and receiving events
// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');

//     socket.emit('increment');
// })

// --------------------------------------------------

// Lesson 2: Chat application

socket.on('message', (message) => {
    console.log('The message is: ', message);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    // const message = document.querySelector('input').value
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error
            );
        }

        console.log('The message was delivered!',);
    })
})

$sendLocationButton.addEventListener('click', () => {

    $sendLocationButton.setAttribute('disabled', 'disabled')

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})