const myLibrary = []

const Book = function (id, name, author, color) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.color = color
}

const addBooktoLibrary = function (name, author, color) {
    let id = crypto.randomUUID();
    let bookObj = new Book(id, name, author, color);
    myLibrary.push(bookObj)
}

const displayBooks = function (bookArray) {
    for (let book in bookArray) {
        console.log(book)
    }
}

const createBookCard = function(bookObj){
    
}