let db;

const request = indexedDB.open('WebAppDB', 1);
request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'username' });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
};

request.onerror = (event) => {
    console.error('IndexedDB error:', event.target.errorCode);
};

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');

    const getRequest = store.get(username);
    getRequest.onsuccess = () => {
        if (getRequest.result) {
            alert('Username already exists!');
        } else {
            store.add({ username, password });
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        }
    };

    getRequest.onerror = () => {
        console.error('Error checking username existence.');
    };
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');

    const getRequest = store.get(username);
    getRequest.onsuccess = () => {
        const user = getRequest.result;
        if (user && user.password === password) {
            sessionStorage.setItem('loggedInUser', username);
            window.location.href = 'protectedPage.html';
        } else {
            alert('Invalid username or password!');
        }
    };

    getRequest.onerror = () => {
        console.error('Error fetching user data.');
    };
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}
