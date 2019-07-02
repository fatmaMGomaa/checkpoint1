const getSavedBooks = () => {
    const booksJSON = localStorage.getItem('books')

    try {
        return booksJSON ? JSON.parse(booksJSON) : []
    } catch (e) {
        return []
    }
}

// Save the notes to localStorage
const saveBooks = (books) => {
    localStorage.setItem('books', JSON.stringify(books))
    console.log('save data')
}

// Remove a note from the list
const removeBook = (id) => {
    const bookIndex = books.findIndex((book) => book.id === id)

    if (bookIndex > -1) {
        books.splice(bookIndex, 1)
    }
}
//generate the book view on the page
const generateBookDOM = (book) => {
    //section container
    const bookEl = document.createElement('section')
    bookEl.className ='books-container__element'
    console.log('section')
    //remove button
    const button = document.createElement('button')
    button.textContent = 'x'
    button.className='delete'
    bookEl.appendChild(button)
    button.addEventListener('click', () => {
        removeBook(book.id)
        saveBooks(books)
        renderingBooks(books, filters)
    })
    //book image
    const image = document.createElement('img')
    if (book.photo.length > 0) {
        image.setAttribute('src', book.photo)
    } else {
        image.setAttribute('src', 'default.jpg')
    }
    bookEl.appendChild(image)
    //book details div
    const detailsDiv = document.createElement('div')
    bookEl.appendChild(detailsDiv)

    const p = document.createElement('p')
    p.textContent = book.category
    detailsDiv.appendChild(p)

    const h2 = document.createElement('h2')
    h2.textContent = book.name
    detailsDiv.appendChild(h2)
    
    const select = document.createElement('select')
    // select.value=book.status
    detailsDiv.appendChild(select)
    select.addEventListener('change', function(e){
        e.preventDefault()
        console.log(e.target.value)
        book.status = e.target.value
        saveBooks(books)
    })

    const option1 = document.createElement('option')
    option1.textContent = "Will Read"
    option1.setAttribute('value', 'willRead')
    select.appendChild(option1)
    const option2 = document.createElement('option')
    option2.textContent = "Read"
    option2.setAttribute('value', 'Read')
    select.appendChild(option2)
    const option3 = document.createElement('option')
    option3.textContent = "Reading"
    option3.setAttribute('value', 'Reading')
    select.appendChild(option3)

    switch (book.status) {
        case "Read":
            option2.setAttribute('selected', '')
            break;
        case "Reading":
            option3.setAttribute('selected', '')
            break;
        case "willRead":
            option1.setAttribute('selected', '')
            break;
    }

    const span = document.createElement('span')
    span.textContent = `Created at ${book.createdDate}`
    detailsDiv.appendChild(span)
    return bookEl
}

const renderingBooks = (books, filters)=>{
    let filteredBooks = books.filter((book) => filters.sortBy!==''?book.status === filters.sortBy:books)
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(filters.searchText.toLowerCase()))
    document.querySelector('.books-container').innerHTML = ''

    filteredBooks.forEach((book) => {
        const bookEl = generateBookDOM(book)
        document.querySelector('.books-container').appendChild(bookEl)
    })
}