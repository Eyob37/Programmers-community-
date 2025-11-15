// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.querySelector('.btn-primary');
    const settingsBtn = document.querySelector('.btn-secondary');
    
    // Profile editing functionality
    editProfileBtn.addEventListener('click', function() {
        console.log('Edit profile clicked');
        // Ready for future profile editing modal or form
    });
    
    // Settings functionality
    settingsBtn.addEventListener('click', function() {
        console.log('Settings clicked');
        // Ready for future settings modal or page
    });
    
    // Skill tag interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            console.log('Skill clicked:', this.textContent);
            // Ready for future skill-based filtering or navigation
        });
    });
});

// Utility function to update profile information
function updateProfile(profileData) {
    const elements = {
        username: document.getElementById('profile-username'),
        title: document.getElementById('profile-title'),
        description: document.getElementById('profile-description'),
        image: document.getElementById('profile-image')
    };
    
    if (profileData.username) elements.username.textContent = profileData.username;
    if (profileData.title) elements.title.textContent = profileData.title;
    if (profileData.description) elements.description.textContent = profileData.description;
    if (profileData.image) elements.image.src = profileData.image;
}

// Utility function to add a new skill
function addSkill(skillName) {
    const skillsList = document.querySelector('.skills-list');
    const skillTag = document.createElement('span');
    skillTag.className = 'skill-tag';
    skillTag.textContent = skillName;
    
    skillTag.addEventListener('click', function() {
        console.log('Skill clicked:', skillName);
    });
    
    skillsList.appendChild(skillTag);
}

// Utility function to add a new activity
function addActivity(activityText, timeText) {
    const activityList = document.querySelector('.activity-list');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    activityItem.innerHTML = `
        <span class="activity-text">${activityText}</span>
        <span class="activity-time">${timeText}</span>
    `;
    
    activityList.insertBefore(activityItem, activityList.firstChild);
}