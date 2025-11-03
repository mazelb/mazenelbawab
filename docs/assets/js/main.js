// Theme toggle and AOS initialization script
function setTheme(dark) {
    if (dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme(true);
    } else {
        setTheme(false);
    }
}
function attachThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(!isDark);
        });
    }
}
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    attachThemeToggle();
    initAOS();
});
