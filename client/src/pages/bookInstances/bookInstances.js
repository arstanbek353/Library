import { useEffect, useState } from "react"
import { useHttp } from '../../hooks/http.hook'
import date from '../../helpers/dateFormat'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'
import { Link } from 'react-router-dom'
import Pagination from '../../components/pagination/pagination'

const instances = (arr) => {
    if (!arr) return <li>none</li>

    return arr.map(instance => {

        let className = 'text-success'
        if (instance.status === 'Maintenance') {
            className = 'text-danger'
        } else if (instance.status === 'Available') {
            className = 'text-success'
        } else {
            className = 'text-warning'
        }
        return (
            <tr key={instance._id}>
                <td>
                    <Link to={instance._id}>
                        {instance.book.title} {instance.imprint}
                    </Link>
                </td>
                <td>
                    <span className={className}> {instance.status}</span>
                </td>
                <td>
                    {instance.stutus !== 'Available' ?
                        <span> {instance.due_back
                            ? date(instance.due_back) : '--'}
                        </span> :
                        ''}
                </td>
            </tr>
        )
    })
}


const BookInstances = () => {
    const [bookInstances, setBookInstances] = useState(null);
    const { loading, error, clearError, request } = useHttp();
    const render = async (skip = 1, limit = 10) => {
        clearError()
        const data = await request(`${baseUrl}/catalog/bookinstances?page=${skip}&limit=${limit}`)
        setBookInstances(data)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError />
    if (loading || !bookInstances) return <Spinner />

    return (
        <>
            <h1>{bookInstances.title}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bookInstances.bookinstance_list ?
                        instances(bookInstances.bookinstance_list) :
                        <li>none</li>
                    }
                </tbody>
            </table>
            <ul>
            </ul>
            <Pagination
                prev={bookInstances.prev}
                pages={bookInstances.pages}
                next={bookInstances.next}
                render={render}
            />

        </>
    )
}

export default BookInstances