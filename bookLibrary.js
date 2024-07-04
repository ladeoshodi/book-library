const myLibrary = [];
const libraryBooks= document.querySelector(".library-books");

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

// preload the library with some books
addBookToLibrary({title:"The Hobbit", author:"J.R.R Tolkien", pages:"295", hasRead:false})
addBookToLibrary({title:"Gentle and Lowly", author:"Dane Ortlund", pages:"198", hasRead:true})
addBookToLibrary({title:"On Death", author:"Tim Keller", pages:"80", hasRead:true})
addBookToLibrary({title:"The Four Loves", author:"CS Lewis", pages:"100", hasRead:false})
addBookToLibrary({title:"You are what you love", author:"James K.A. Smith", pages:"150", hasRead:false})

// display books 
myLibrary.forEach((book) => {
    const tableRow = document.createElement("tr");
    for (const key in book) {
        if (typeof book[key] !== "function") {
            const tableData = document.createElement("td");
            tableData.textContent = book[key];
            tableRow.appendChild(tableData);
        }
    }
    libraryBooks.appendChild(tableRow);
});