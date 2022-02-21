import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import CustomError from '../../components/error/error'
import Spinner from '../../components/spinner/spinner'
import { baseUrl } from '../../config/config'
import AuthorsList from '../../components/authorsList/AuthorsList'
import Pagination from '../../components/pagination/pagination'

const Authors = () => {
    const [authors, setAuthors] = useState(null)
    const { loading, error, clearError, request } = useHttp()

    const render = async (skip = 1, limit = 10) => {
        clearError()
        const data = await request(`${baseUrl}/catalog/authors?page=${skip}&limit=${limit}`)
        setAuthors(data)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError />
    if (loading || !authors) return <Spinner />

    return (
        <>
            <h1>{authors.title}</h1>
            <ul className="list-group mb-3">
                {<AuthorsList authors={authors.author_list} />}
            </ul>
            <Pagination
                prev={authors.prev}
                pages={authors.pages}
                next={authors.next}
                render={render}
            />
        </>
    )
}

export default Authors