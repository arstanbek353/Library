import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'
import { useParams } from 'react-router-dom'
import BooksList from '../../components/booksList/BooksList'
import { ControlButtons } from '../../components/formControls/formControls'
import Permission from '../../Permission'
import { roles } from '../../config/config'

const Genre = () => {
    const { genreId } = useParams()
    const [genre, setGenre] = useState(null)
    const [isDeleted, setDeleted] = useState(false)
    const { loading, error, clearError, request } = useHttp()

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/genre/${genreId}`)
        setGenre(data)
    }

    const deleteHendler = async () => {
        const response = await request(`${baseUrl}/catalog/genre/${genreId}/delete`)
        setDeleted(true)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !genre) return <Spinner />

    return (
        <>
            <h1>Genre: {genre.genre.name}</h1>
            <div>
                <h4>Book</h4>
                <dl>
                    {<BooksList books={genre.genre_books} />}
                </dl>
            </div>
            <Permission roles={[roles.editor]}>
                <ControlButtons
                    to={`/catalog/genres/${genreId}/update`}
                    isDeleted={isDeleted}
                    name={genre.genre.name}
                    deleteHendler={deleteHendler}
                />
            </Permission>
        </>
    )
}

export default Genre