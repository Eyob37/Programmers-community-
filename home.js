// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById("filter-select");
    const searchInput = document.getElementById('search-input');
    const usersContainer = document.getElementById('users-container');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const userCards = usersContainer.querySelectorAll('.user-card');
        
        userCards.forEach(card => {
            const userName = card.querySelector('h3').textContent.toLowerCase();
            const userRole = card.querySelector('p').textContent.toLowerCase();
            
            if (userName.includes(searchTerm) || userRole.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = searchTerm === '' ? 'block' : 'none';
            }
        });
    });
    
    // User card interactions
    const userCards = document.querySelectorAll('.user-card');
    userCards.forEach(card => {
        card.addEventListener('click', function() {
            const userName = this.querySelector('h3').textContent;
            console.log('User card clicked:', userName);
            // Ready for future user profile modal or navigation
        });
    });
});

// Utility function to add a new user to the home page
function addUserToHome(userData) {
    const usersContainer = document.getElementById('users-container');
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.setAttribute('data-user', userData.id);
    
    userCard.innerHTML = `
        <div class="user-avatar">
            <img src="${userData.avatar}" alt="User">
        </div>
        <div class="user-info">
            <h3>${userData.name}</h3>
            <p>${userData.title}</p>
            <div class="user-status ${userData.status}"></div>
        </div>
    `;
    
    usersContainer.appendChild(userCard);
    
    // Add click event listener
    userCard.addEventListener('click', function() {
        console.log('User card clicked:', userData.name);
    });
}
