const themeToggle = document.getElementById('theme-toggle');

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
