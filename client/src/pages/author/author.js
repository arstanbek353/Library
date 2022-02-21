import { useEffect, useState } from 'react'
import date from '../../helpers/dateFormat'
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'
import { useParams } from 'react-router-dom'
import BooksList from '../../components/booksList/BooksList'
import { ControlButtons } from '../../components/formControls/formControls'
import Permission from '../../Permission'
import { roles } from '../../config/config'

const Author = () => {
    const { authorId } = useParams()
    const [author, setAuthor] = useState(null)
    const [isDeleted, setDeleted] = useState(false)
    const [booksLength, setBooksLength] = useState(false)
    const { loading, error, clearError, request } = useHttp()

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/author/${authorId}`)
        setAuthor(data)
    }

    const deleteHendler = async () => {
        const response = await request(`${baseUrl}/catalog/author/${authorId}/delete`)
        if (response.author_books.length > 0) {
            setBooksLength(true)
            return;
        }
        setDeleted(true)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !author) return <Spinner />

    return (
        <>
            <h1> Author: {author.author.first_name} {author.author.family_name} </h1>
            <p> {date(author.author.date_of_birth)} {date(author.author.date_of_death)} </p>

            <div>
                <h4>Books </h4>
                {booksLength ?
                    <div className="alert alert-booksLength" role="alert">
                        <strong>
                            You should delete this books
                        </strong>
                    </div>
                    : ''
                }
                {<BooksList books={author.author_books} />}
            </div>

            <Permission roles={[roles.editor]}>
                <ControlButtons
                    to={`/catalog/authors/${authorId}/update`}
                    isDeleted={isDeleted}
                    name={`${author.author.first_name} ${author.author.family_name}`}
                    deleteHendler={deleteHendler}
                /></Permission>
        </>
    )
}

export default Author