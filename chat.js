// Chat page functionality
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <span class="message-time">${currentTime}</span>
                </div>
                <div class="message-text">${messageText}</div>
            </div>
        `;
        
        // Add message to chat
        chatMessages.appendChild(messageDiv);
        
        // Clear input
        messageInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key press
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Auto-scroll chat to bottom on page load
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add typing indicator functionality
    let typingTimeout;
    messageInput.addEventListener('input', function() {
        clearTimeout(typingTimeout);
        // Show typing indicator logic here
        
        typingTimeout = setTimeout(() => {
            // Hide typing indicator logic here
        }, 1000);
    });
});

// Utility function to add a new message to chat
function addMessageToChat(messageData) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${messageData.type}`;
    
    let messageHTML = '';
    if (messageData.type === 'received') {
        messageHTML = `
            <div class="message-avatar">
                <img src="${messageData.avatar}" alt="User">
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">${messageData.sender}</span>
                    <span class="message-time">${messageData.time}</span>
                </div>
                <div class="message-text">${messageData.text}</div>
            </div>
        `;
    } else {
        messageHTML = `
            <div class="message-content">
                <div class="message-header">
                    <span class="message-time">${messageData.time}</span>
                </div>
                <div class="message-text">${messageData.text}</div>
            </div>
        `;
    }
    
    messageDiv.innerHTML = messageHTML;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}