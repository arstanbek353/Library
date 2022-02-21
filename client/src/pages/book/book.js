import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'
import { useParams, Link } from 'react-router-dom'
import InstancesList from '../../components/instancesList/InstancesList'
import GenresList from '../../components/genresList/GenresList'
import { ControlButtons } from '../../components/formControls/formControls'
import Permission from '../../Permission'
import { roles } from '../../config/config'

const Book = () => {
    let { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [isDeleted, setDeleted] = useState(false);
    const { loading, error, clearError, request } = useHttp();

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/book/${bookId}`)
        setBook(data)
    }

    const deleteHendler = async () => {
        const response = await request(`${baseUrl}/catalog/book/${bookId}/delete`)
        setDeleted(true)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !book) return <Spinner />

    return (
        <>
            <h1>Title: {book.title}</h1>
            <p>
                <strong>Author: </strong>
                <Link
                    to={`../catalog/authors/${book.book.author._id}`}
                >
                    {book.book.author.first_name} {book.book.author.family_name}
                </Link>
            </p>
            <p>
                <strong>Summary: </strong>
                {book.book.summary}
            </p>
            <p>
                <strong>ISBN: </strong>
                {book.book.isbn}
            </p>
            <p>
                <strong>Genre: </strong>
                {<GenresList genres={book.book.genre} />}
            </p>
            <div className="">
                <h4>Copies</h4>
                {<InstancesList instances={book.book_instances} />}
            </div>
            <Permission roles={[roles.editor]}>
                <ControlButtons
                    to={`/catalog/books/${bookId}/update`}
                    isDeleted={isDeleted}
                    name={book.book.title}
                    deleteHendler={deleteHendler}
                />
            </Permission>
        </>
    )
}

export default Book