const myLibrary = []
const bookArea = document.querySelector('.book-area')
const bookForm = document.querySelector('.book-form')

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

const displayBooks = function (library) {
    while (bookArea.childElementCount) bookArea.removeChild(bookArea.childNodes[0])
    library.forEach(book => {
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
    appendChildren(lastLine, numPages, bookId)
    appendChildren(book, titleDiv, readBtn, lastLine, crossBtn)

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
    numPages.textContent = bookObj.pages

    crossBtn.setAttribute('data-id', bookObj.id)
    readBtn.setAttribute('data-id', bookObj.id)
    bookArea.appendChild(book)
}

const appendChildren = function (parent, ...children) {
    children.forEach(child => parent.appendChild(child))
}

const removeBook = function (removeId) {
    let idArray = myLibrary.map(book => book.id);
    let removeIndex = idArray.indexOf(removeId)
    myLibrary.splice(removeIndex, 1)
    displayBooks(myLibrary)
}

const addBook = function (event) {
    let inputs = Array.from(event.target).slice(1)
    let data = []
    inputs.forEach(input => data.push(input.value))
    addBooktoLibrary(...data)
    displayBooks(myLibrary)
    event.preventDefault()
    bookForm.reset()
}

bookForm.addEventListener('submit', addBook)
bookArea.addEventListener('click', (event) => {
    let target = event.target
    if (target.hasAttribute('data-id')) {
        if (target.className.includes('cross-btn'))
            removeBook(target.getAttribute('data-id'))

        //else only read/unread is possible
        else {
            target.classList.toggle('readStatus')
            target.textContent = target.className.includes('readStatus') ?
                'Read' : 'Un-Read';
        }
    }
})      