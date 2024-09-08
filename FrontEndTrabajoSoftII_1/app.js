// URL del backend (puedes cambiarla según la configuración de tu backend)
const apiUrl = 'http://localhost:8080/api/books';

// Capturar el formulario de agregar libro
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

// Manejar el evento de envío del formulario para agregar un libro
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    // Obtener los datos del formulario
    const book = {
        isbn: document.getElementById('isbn').value,
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        rating: parseFloat(document.getElementById('rating').value),
        ratingCount: 1  // Inicializamos con un rating count de 1
    };

    // Hacer una solicitud POST al backend para agregar el libro
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el libro');
        }

        const result = await response.json();
        console.log('Libro agregado:', result);

        // Actualizar la lista de libros
        loadBooks();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Función para cargar todos los libros desde el backend
async function loadBooks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error al cargar los libros');
        }

        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error al cargar los libros:', error);
    }
}

// Función para mostrar los libros en la página
function displayBooks(books) {
    bookList.innerHTML = '';  // Limpiar la lista actual
    books.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.textContent = `ISBN: ${book.isbn}, Título: ${book.title}, Autor: ${book.author}, Rating: ${book.rating}`;
        bookList.appendChild(bookElement);
    });
}

// Cargar los libros al cargar la página
loadBooks();
