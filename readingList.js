let books = getSavedBooks()

const filters={
    searchText:'',
    sortBy:''
}
renderingBooks(books, filters)

document.querySelector('#adding-book').addEventListener('submit',(e)=>{
    e.preventDefault()
    books.push({ 
        id: uuidv4(),
        name: e.target.elements.bookName.value,
        category: e.target.elements.bookCategory.value,
        photo: e.target.elements.bookImage.value,
        status: "willRead",
        createdDate: moment().format('DD-MM-YYYY')
    })
    e.target.elements.bookName.value = ''
    e.target.elements.bookCategory.value=''
    e.target.elements.bookImage.value=''
    saveBooks(books)
    renderingBooks(books, filters)
})

document.querySelector('.filter__read').addEventListener('click',(e)=>{
    filters.sortBy = 'Read'
    renderingBooks(books, filters)
})

document.querySelector('.filter__reading').addEventListener('click', (e) => {
    filters.sortBy = 'Reading'
    renderingBooks(books, filters)
})

document.querySelector('.filter__willRead').addEventListener('click', (e) => {
    filters.sortBy = 'willRead'
    renderingBooks(books, filters)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderingBooks(books, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'books') { //checking the right key from ls
        books = JSON.parse(e.newValue)
        renderingBooks(books, filters)
    }
})
