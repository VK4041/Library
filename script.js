const myLibrary = []
const bookArea = document.querySelector('.book-area')

const Book = function (id, name, author, read, pages) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.read = read;
    this.pages = pages
}

const addBooktoLibrary = function (name, author, read, pages) {
    let id = crypto.randomUUID();
    let bookObj = new Book(id, name, author, read, pages);
    myLibrary.push(bookObj)
}

const displayBooks = function (bookArray) {
    bookArray.forEach(book => {
        createBookCard(book)
    })
}

const createBookCard = function (bookObj) {
    const book = document.createElement('div')
    const titleDiv = document.createElement('div')
    const bookName = document.createElement('p')
    const bookAuthor = document.createElement('p')
    const lastLine = document.createElement('div')
    const crossBtn = document.createElement('button')
    const numPages = document.createElement('p')
    const bookId = document.createElement('p')
    const readBtn = document.createElement('button')

    appendChildren(titleDiv, bookName, bookAuthor)
    appendChildren(lastLine, numPages, readBtn, bookId)
    appendChildren(book, titleDiv, lastLine, crossBtn)

    book.classList.add('book');
    crossBtn.classList.add('cross-btn');
    titleDiv.classList.add('book-title');
    bookName.classList.add('book-name');
    bookAuthor.classList.add('book-author');
    lastLine.classList.add('lastLine');
    numPages.classList.add('num-pages');
    readBtn.classList.add('read-btn', 'unReadStatus');
    bookId.classList.add('book-id')

    bookName.textContent = bookObj.name;
    bookAuthor.textContent = bookObj.author;
    readBtn.textContent = bookObj.read;
    bookId.textContent = bookObj.id;
    crossBtn.textContent = 'X'

    // return book
    bookArea.appendChild(book)
}

const appendChildren = function (parent, ...children) {
    children.forEach(child => parent.appendChild(child))
}

addBooktoLibrary('The Hobbit', 'idk man', 'Un-read', '150')
addBooktoLibrary('Loda Lassan', 'maine banaya hai', 'Un-read', 500)
displayBooks(myLibrary)