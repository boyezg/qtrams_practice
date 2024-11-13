let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.getElementById("library");
  libraryContainer.innerHTML = "";

  myLibrary.forEach(function (book, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;
    bookCard.appendChild(titleElement);

    const authorElement = document.createElement("p");
    authorElement.textContent = "Author: " + book.author;
    bookCard.appendChild(authorElement);

    const pagesElement = document.createElement("p");
    pagesElement.textContent = "Pages: " + book.pages;
    bookCard.appendChild(pagesElement);

    const readElement = document.createElement("p");
    readElement.textContent = "Status: " + (book.read ? "Read" : "Not Read");
    bookCard.appendChild(readElement);

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    toggleButton.onclick = function () {
      toggleReadStatus(index);
    };
    bookCard.appendChild(toggleButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeBook(index);
    };
    bookCard.appendChild(removeButton);

    libraryContainer.appendChild(bookCard);
  });
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

document.getElementById("newBookBtn").onclick = function () {
  document.getElementById("bookFormDialog").style.display = "block";
};

document.getElementById("closeFormBtn").onclick = function () {
  document.getElementById("bookFormDialog").style.display = "none";
};

document.getElementById("bookForm").onsubmit = function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);
  document.getElementById("bookFormDialog").style.display = "none";
  e.target.reset();
};

displayBooks();
