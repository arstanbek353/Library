import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'

const Catalog = () => {
    const [state, setState] = useState(null);
    const { loading, error, clearError, request } = useHttp();

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog`)
        setState(data)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !state) return <Spinner />

    return (
        <>
            <h1 className="display-5 fw-bold">{state.title}</h1>
            <p className="col-md-8 fs-4">Welcome to <em>LocalLibrary</em>, a very basic Express website developed as a tutorial example on the Mozilla Developer Network.</p>
            <h2 className="display-5 fw-bold">Dynamic content</h2>
            <p className="col-md-8 fs-4">The library has the following record counts:</p>
            <ul className="list-unstyled">
                <li><strong>Books:</strong> {state.data.book_count}</li>
                <li><strong>Copies:</strong> {state.data.book_instance_count}</li>
                <li><strong>Copies available:</strong> {state.data.book_instance_available_count}</li>
                <li><strong>Authors:</strong> {state.data.author_count}</li>
                <li><strong>Genres:</strong> {state.data.genre_count}</li>
            </ul>
        </>
    )
}

export default Catalog