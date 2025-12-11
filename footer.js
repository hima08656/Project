// components/footer.js
export function Footer() {
    const year = new Date().getFullYear();
    return `
    <footer class="footer">
      <p>&copy; ${year} Modular JS App</p>
    </footer>
  `;
}