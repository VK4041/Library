const myLibrary = []
const bookArea = document.querySelector('.book-area')
const bookForm = document.querySelector('.book-form')

const Book = function (bookObj) {
    this.id = bookObj.id;
    this.name = bookObj.name;
    this.author = bookObj.author;
    this.read = bookObj.readStatus;
    this.pages = bookObj.pages
}
Book.prototype.toggleReadStatus = function (target) {
    target.classList.toggle('readStatus')
    this.read = target.className.includes('readStatus') ?
        'Read' : 'Un-Read';
    target.textContent = this.read
}

const addBooktoLibrary = function (formEntries) {
    let id = crypto.randomUUID();
    formEntries.id = id;
    let bookObj = new Book(formEntries);
    myLibrary.push(bookObj)
}

const displayBooks = function (library) {
    //Reset bookArea
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
    if (bookObj.read === 'Read') readBtn.classList.toggle('readStatus')
    bookArea.appendChild(book)
}

const appendChildren = function (parent, ...children) {
    children.forEach(child => parent.appendChild(child))
}

const removeBook = function (removeIndex) {
    myLibrary.splice(removeIndex, 1)
    displayBooks(myLibrary)
}

const addBook = function (event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formEntries = Object.fromEntries(formData)
    if (!formEntries.readStatus) formEntries.readStatus = 'Un-Read'
    if (formEntries.pages === '') formEntries.pages = '0';
    addBooktoLibrary(formEntries)
    displayBooks(myLibrary)
    bookForm.reset()
}
const getTargetBook = function (target) {
    let targetId = target.getAttribute('data-id')
    let idArray = myLibrary.map(book => book.id);
    let removeIndex = idArray.indexOf(target.getAttribute('data-id'))
    let results = myLibrary.map((book, index) => {
        if (book.id === targetId) {
            return { book, index }
        }
    })
    return results
}

bookForm.addEventListener('submit', addBook)
bookArea.addEventListener('click', (event) => {
    let target = event.target
    if (target.hasAttribute('data-id')) {
        let results = getTargetBook(target)
        let book = results[0].book
        let bookIndex = results[0].index

        if (target.className.includes('cross-btn'))
            removeBook(bookIndex)

        else {
            book.toggleReadStatus(target)
        }
    }
})      