import { useEffect, useState } from "react"
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'
import { Link } from "react-router-dom"
import Pagination from '../../components/pagination/pagination'

const Genres = () => {
    const [genres, setGenres] = useState(null);
    const { loading, error, clearError, request } = useHttp();

    const render = async (skip = 1, limit = 10) => {
        clearError()
        const data = await request(`${baseUrl}/catalog/genres?page=${skip}&limit=${limit}`)
        setGenres(data)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !genres) return <Spinner />

    return (
        <>
            <h1>{genres.title}</h1>
            <ul className="list-group mb-3">
                {
                    genres.genre_list.map((genre) => <li key={genre._id} className="list-group-item">
                        <Link to={genre._id} className="ms-2">{genre.name}</Link>
                    </li>)
                }
            </ul>

            <Pagination
                prev={genres.prev}
                pages={genres.pages}
                next={genres.next}
                render={render}
            />
        </>
    )
}

export default Genres