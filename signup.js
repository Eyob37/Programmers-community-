 const fileInput = document.getElementById('certificate');
        const fileLabel = document.getElementById('file-upload-label');
        const uploadBox = document.querySelector('.upload-box');
        const themeToggle = document.getElementById('theme-toggle');

        uploadBox.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                fileInput.click();
            }
        });
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                fileLabel.textContent = fileInput.files[0].name;
            } else {
                fileLabel.textContent = 'No file chosen';
            }
        });
        document.querySelector('.signin-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('fullname').value;
            const age = document.getElementById('age').value;
            const grade = document.getElementById('grade').value;
            const interest = document.getElementById('interest').value;
            const certificate = document.getElementById('certificate').files[0];
            const message = document.getElementById('signin-message');
            if (!name || !age || !grade || !interest) {
                message.style.color = '#e74c3c';
                message.textContent = 'Please fill all required fields.';
                return;
            }
            message.style.color = '#27ae60';
            message.textContent = 'Registration successful!';
        });
        function setTheme(dark) {
            if (dark) {
                document.documentElement.classList.add('dark-mode');
                themeToggle.textContent = '☀️ White Mode';
            } else {
                document.documentElement.classList.remove('dark-mode');
                themeToggle.textContent = '🌙 Dark Mode';
            }
        }
        let dark = localStorage.getItem('theme') === 'dark';
        setTheme(dark);
        themeToggle.addEventListener('click', function() {
            dark = !dark;
            setTheme(dark);
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        });