import { Link } from 'react-router-dom'

const BooksList = ({ books }) => {
    if (books.length === 0) return 'none'
    return books.map(book => {
        return (
            <div key={book._id}>
                <dt>
                    <Link to={`../catalog/books/${book._id}`}> {book.title} </Link>
                </dt>
                <dd> {book.summary} </dd>
            </div>
        )
    })
}

export default BooksList