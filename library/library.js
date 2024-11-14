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

    const button = document.createElement("button");
    button.innerHTML = '<i class="fa fa-ellipsis-v"></i>';
    bookCard.appendChild(button);

    const titleElement = document.createElement("h3");
    titleElement.textContent = "Book Title: " + book.title;
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

    function editDetails() {
      const optionsMenu = document.createElement("div");
      optionsMenu.classList.add("options-menu");
      optionsMenu.style.display = "none";
      bookCard.appendChild(optionsMenu);

      const toggleOption = document.createElement("button");
      toggleOption.textContent = book.read ? "Mark as Unread" : "Mark as Read";
      toggleOption.onclick = () => {
        toggleReadStatus(index);
        toggleOption.textContent = book.read ? "Mark as Unread" : "Mark as Read";
      };
      optionsMenu.appendChild(toggleOption);

      const removeOption = document.createElement("button");
      removeOption.textContent = "Remove";
      removeOption.onclick = () => {
      
        const confirmationDialog = document.getElementById("confirmationDialog");
        confirmationDialog.style.display = "block";
      
       
        document.getElementById("confirmRemove").onclick = () => {
          removeBook(index);
          confirmationDialog.style.display = "none"; 
        };
      
       
        document.getElementById("cancelRemove").onclick = () => {
          confirmationDialog.style.display = "none"; 
        };
      };
      
      optionsMenu.appendChild(removeOption);
      

      button.onmouseenter = () => {
        optionsMenu.style.display = "flex";
        optionsMenu.style.flexDirection = "column";
      };
      
      bookCard.onmouseleave = () => {
        optionsMenu.style.display = "none";
      };
    }

    editDetails();
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

document.getElementById("newBookBtn").onclick = () => {
  document.getElementById("bookFormDialog").style.display = "block";
};

document.getElementById("closeFormBtn").onclick = () => {
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
