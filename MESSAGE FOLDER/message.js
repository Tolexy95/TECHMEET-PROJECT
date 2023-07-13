document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.querySelector('.chat-container');
  const messageForm = document.querySelector('.message-form');
  const messageInput = document.querySelector('.message-input');
  const sendMessageButton = document.querySelector('.send-message-button');
  const userMessage=document.querySelector('.userMessage');
  const senderResponse=document.querySelector('.senderResponse');
  

  // Initially hide the chat container
  chatContainer.style.display = 'none';

  // Show the chat container when user starts typing
  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() !== '') {
      chatContainer.style.display = 'block';
    } else {
      chatContainer.style.display = 'none';
    }
  });

  // Handle form submission (send message)
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the typed message
    const typedMessage = messageInput.value.trim();

    if (typedMessage !== '') {
      // Create a new message container and append it to the chat
      const newMessageContainer = createMessageContainer('You', typedMessage);
      chatContainer.appendChild(newMessageContainer);

      // Clear the input field
      messageInput.value = '';

      // Send the message to the API
      sendMessageToAPI(typedMessage);
    }
  });

  // Handle click event on the send message button (image)
  sendMessageButton.addEventListener('click', () => {
    messageForm.dispatchEvent(new Event('submit'));
  });

  // Retrieve messages from the API
  retrieveMessagesFromAPI();
});

// Function to create a new message container
function createMessageContainer(sender, content) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');

  const messageText = document.createElement('p');
  messageText.textContent = content;

  const messageTime = document.createElement('span');
  messageTime.classList.add('message-time');
  messageTime.textContent = getCurrentTime();

  messageContent.appendChild(messageText);
  messageContent.appendChild(messageTime);

  messageContainer.appendChild(messageContent);

  return messageContainer;
}

// Function to get current time in HH:mm AM/PM format
function getCurrentTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${amPm}`;
}

// Function to send the message to the API
function sendMessageToAPI(message) {
  const apiEndpoint = 'https://techmeetappapi.azurewebsites.net/api/Messages';

  // Create the HTTP request object
  const xhr = new XMLHttpRequest();
  xhr.open('POST', apiEndpoint);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Define the data to be sent to the API
  const data = JSON.stringify({message});

  // Send the HTTP request
  xhr.send(data);

  // Handle the API response (optional)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // API request was successful
        console.log('Message sent successfully');
      } else {
        // API request failed
        console.error('Error sending message');
      }
    }
  };
}

// Function to retrieve messages from the API
function retrieveMessagesFromAPI() {
  const apiEndpoint = 'https://techmeetappapi.azurewebsites.net/api/Messages';

  // Create the HTTP request object
  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiEndpoint);

  // Send the HTTP request
  xhr.send();

  // Handle the API response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // API request was successful
        const messages = JSON.parse(xhr.responseText);
        displayMessages(messages);
      } else {
        // API request failed
        console.error('Error retrieving messages');
      }
    }
  };
}

// Function to display the retrieved messages
function displayMessages(messages) {
  const chatContainer = document.querySelector('.chat-container');

  // Clear existing messages
  chatContainer.innerHTML = '';

  // Iterate over the messages and create message containers
  messages.forEach((message) => {
    const {sender, content} = message;
    const messageContainer = createMessageContainer(sender, content);
    chatContainer.appendChild(messageContainer);
  });
}
