document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
    }

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('authToken');
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('loggedInEmail');
            window.location.href = 'login.html';
        });
    }
});
