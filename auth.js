// scripts/auth.js

const USERS_KEY = 'app_users';
const SESSION_KEY = 'app_session';

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(email) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, loggedInAt: Date.now() }));
}

function getSession() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
        return null;
    }
}

export function logout() {
    localStorage.removeItem(SESSION_KEY);
}

export function requireAuth() {
    const session = getSession();
    if (!session || !session.email) {
        // Redirect to login if not authenticated
        window.location.href = './login.html';
    }
}

export function handleSignup(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    // Basic validation
    if (!email || !password) {
        alert('Please fill all fields.');
        return;
    }

    const users = getUsers();
    const exists = users.some(u => u.email === email);
    if (exists) {
        alert('User already exists. Please login.');
        window.location.href = './login.html';
        return;
    }

    users.push({ email, password });
    saveUsers(users);

    alert('Signup successful. Please login.');
    window.location.href = './login.html';
}

export function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Invalid credentials.');
        return;
    }

    setSession(email);
    window.location.href = './todos.html';
}