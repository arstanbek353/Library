import { useEffect, useState } from "react"
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'
import { Link } from "react-router-dom"
import Pagination from '../../components/pagination/pagination'

const Books = () => {
    const [state, setState] = useState(null)
    const { loading, error, clearError, request } = useHttp()

    const render = async (skip = 1, limit = 4) => {
        clearError()
        const data = await request(`${baseUrl}/catalog/books?page=${skip}&limit=${limit}`)
        setState(data)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !state) return <Spinner />

    return (
        <>
            <h1>{state.title}</h1>
            <ul className="list-group mb-3">
                {
                    state.book_list.map((book) => <li key={book._id} className="list-group-item">
                        <Link to={book._id} className="ms-2">
                            <span className="fw-bold">{book.title} </span>
                            ({book.author.first_name} {book.author.family_name})
                        </Link>
                    </li>)
                }
            </ul>
            <Pagination
                prev={state.prev}
                pages={state.pages}
                next={state.next}
                render={render}
            />
        </>
    )
}

export default Books