loggedInUser = sessionStorage.getItem('loggedInUser');
if (!loggedInUser) {
    alert('You must be logged in to access this page.');
    window.location.href = 'login.html';
}
