// scripts/todos.js
import { displayTodos } from './displayTodos.js';

const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';

export async function initTodos() {
    try {
        const res = await fetch(TODOS_API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        displayTodos(data);
    } catch (err) {
        console.error('Failed to fetch todos:', err);
        const container = document.querySelector('#todos-container');
        if (container) {
            container.innerHTML = `<p class="error">Failed to load todos. Please try again later.</p>`;
        }
    }
}