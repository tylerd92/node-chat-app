const socket = io();

function scrollToBottom() {
    //Selectors
    const messages = document.getElementById('messages');
    const newMessage = messages.lastElementChild;
    //Heights
    const clientHeight = messages.clientHeight;
    const scrollTop = messages.scrollTop;
    const scrollHeight = messages.scrollHeight;
    const newMessageHeight = newMessage.offsetHeight;
    const lastMessageHeight = newMessage.previousElementSibling ? newMessage.previousElementSibling.offsetHeight : 0;

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
}

socket.on('connect', function() {
    const params = new URLSearchParams(window.location.search);

    socket.emit('join', Object.fromEntries(params), function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    const ol = document.createElement('ol');
    users.forEach(function(user) {
        const li = document.createElement('li');
        li.textContent = user;
        ol.appendChild(li);
    });
    const usersList = document.getElementById('users');
    usersList.innerHTML = '';
    usersList.appendChild(ol);
});

socket.on('newMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a'); 
    const template = document.getElementById('message-template').innerHTML;
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    const div = document.createElement('div');
    div.innerHTML = html;
    document.getElementById('messages').appendChild(div.firstElementChild);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    const template = document.getElementById('location-message-template').innerHTML;
    const formattedTime = moment(message.createdAt).format('h:mm a'); 
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    const div = document.createElement('div');
    div.innerHTML = html;
    document.getElementById('messages').appendChild(div.firstElementChild);
    scrollToBottom();
});

document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const messageTextBox = document.querySelector('[name=message]');

    socket.emit('createMessage', {
        text: messageTextBox.value
    }, function() {
        messageTextBox.value = '';
    });
});

const locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.setAttribute('disabled', 'disabled');
    locationButton.textContent = 'Sending location...';

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttribute('disabled');
        locationButton.textContent = 'Send location';
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttribute('disabled');
        locationButton.textContent = 'Send location';
        alert('Unable to fetch location');
    });
});