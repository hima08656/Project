// scripts/displayTodos.js
export function displayTodos(data, mountSelector = '#todos-container') {
    const container = document.querySelector(mountSelector);
    if (!container) return;

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<p>No todos found.</p>';
        return;
    }

    const items = data.slice(0, 20).map(todo => `
    <article class="todo ${todo.completed ? 'done' : 'pending'}">
      <h3>#${todo.id} ${escapeHTML(todo.title)}</h3>
      <p><strong>Status:</strong> ${todo.completed ? 'Completed' : 'Pending'}</p>
      <p><strong>User ID:</strong> ${todo.userId}</p>
    </article>
  `).join('');

    container.innerHTML = `<div class="todo-grid">${items}</div>`;
}

function escapeHTML(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}