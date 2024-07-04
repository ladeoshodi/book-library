const tableHeaders = ["title", "author", "pages", "read", "delete"]
const myLibrary = [];
const libraryBooks= document.querySelector(".library-books");
const addBookForm = document.querySelector("#add-book-form");
const openForm = document.querySelector(".open-form");

// Book constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead ? 'read ✅' : 'not read yet';
}

// Add prototype methods
// Book.info
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead}`;
};

function addBookToLibrary ({title, author, pages, hasRead} = {}) {
    // Create a new Book object and add to library
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
}

function preloadLibrary() {
    addBookToLibrary({title:"The Hobbit", author:"J.R.R Tolkien", pages:"295", hasRead:false})
    addBookToLibrary({title:"Gentle and Lowly", author:"Dane Ortlund", pages:"198", hasRead:true})
    addBookToLibrary({title:"On Death", author:"Tim Keller", pages:"80", hasRead:true})
    addBookToLibrary({title:"The Four Loves", author:"CS Lewis", pages:"100", hasRead:false})
    addBookToLibrary({title:"You are what you love", author:"James K.A. Smith", pages:"150", hasRead:false})
}

function displayBooks(myLibrary, index=0) {
    let i = index;
    while (i < myLibrary.length) {
        const tableRow = document.createElement("tr");
        const book = myLibrary[i];
        for (const key in book) {
            if (typeof book[key] !== "function") {
                const tableData = document.createElement("td");
                tableData.textContent = book[key];
                tableRow.appendChild(tableData);
            }
        }
        // add delete button to the row
        const tableData = document.createElement("td");
        const delButton = document.createElement("button");
        delButton.textContent = "Delete 🗑️";
        delButton.classList.add("delete-button");
        // add event listener to delete button
        delButton.addEventListener("click", (e) => {
            // Remove the row from the DOM
            tableData.parentElement.remove();
            console.log(myLibrary);
        });
        tableData.appendChild(delButton);
        tableRow.appendChild(tableData);

        // append new row to library table
        libraryBooks.appendChild(tableRow);

        i++;
    }

}

// preload the library with some books
preloadLibrary();

// display the books
displayBooks(myLibrary);

// Capture form input
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // capture all inputs of the form
    let bookTitle = document.querySelector("#book-title");
    let bookAuthor = document.querySelector("#book-author");
    let bookPages = document.querySelector("#book-pages");
    let bookReadOptions = document.querySelectorAll("input[name='book-read']")
    let bookRead;
    for (let i = 0; i < bookReadOptions.length; i++) {
        if (bookReadOptions[i].checked) {
            bookRead = bookReadOptions[i]
        }
    }
    
    // Add new book to library
    addBookToLibrary({
        title: bookTitle.value, 
        author: bookAuthor.value, 
        pages: bookPages.value, 
        hasRead: bookRead.value === "yes" ? true : false
    });
    
    // Append the new book to the table
    displayBooks(myLibrary, myLibrary.length-1);

    // Clear form fields
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    document.querySelector("#book-read-yes").checked = false;
    document.querySelector("#book-read-no").checked = true;
});

// toggle the display of the form
openForm.addEventListener("click", () => {
    addBookForm.classList.toggle("hidden");
});