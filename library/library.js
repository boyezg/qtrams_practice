const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.getElementById("library");
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? "Read" : "Not Read"}</p>
      <button onclick="toggleReadStatus(${index})">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
      <button onclick="removeBook(${index})">Remove</button>
    `;

    libraryContainer.appendChild(bookCard);
  });
}

function toggleReadStatus(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

document.getElementById("newBookBtn").addEventListener("click", () => {
  document.getElementById("bookFormDialog").showModal();
});

document.getElementById("closeFormBtn").addEventListener("click", () => {
  document.getElementById("bookFormDialog").close();
});

document.getElementById("bookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);
  document.getElementById("bookFormDialog").close();
  e.target.reset();
});

displayBooks();
