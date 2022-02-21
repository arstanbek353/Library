import { useEffect, useState } from "react"
import { useHttp } from '../../hooks/http.hook'
import date from '../../helpers/dateFormat'
import getStatusClass from '../../helpers/getStatusClass'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import { baseUrl } from '../../config/config'
import { useParams, Link } from 'react-router-dom'
import { ControlButtons } from '../../components/formControls/formControls'
import Permission from '../../Permission'
import { roles } from '../../config/config'


const BookInstance = () => {
    const { bookinstanceId } = useParams()
    const [bookinstance, setBookinstance] = useState(null)
    const [isDeleted, setDeleted] = useState(false)
    const [isAccept, setAccept] = useState(false)
    const { loading, error, clearError, request } = useHttp()

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/bookinstance/${bookinstanceId}`)
        setBookinstance(data)
    }

    const acceptHendler = async () => {
        const data = await request(`${baseUrl}/catalog/bookinstance/accept/${bookinstanceId}`)
        setAccept(true)
    }

    const deleteHendler = async () => {
        const response = await request(`${baseUrl}/catalog/bookinstance/${bookinstanceId}/delete`)
        setDeleted(true)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !bookinstance) return <Spinner />

    return (
        <>
            <h1>Id: {bookinstance.bookinstance._id}</h1>
            <p><strong>Titile:</strong> <Link to={`../catalog/books/${bookinstance.bookinstance.book._id}`}>{bookinstance.title}</Link></p>
            <p><strong>Imprint:</strong> {bookinstance.bookinstance.imprint}</p>
            <p><strong>Status:</strong> <span className={getStatusClass(bookinstance.bookinstance.status)}>{bookinstance.bookinstance.status}</span></p>
            {bookinstance.bookinstance.user ? <p><strong>User:</strong> <span>{bookinstance.bookinstance.user}</span></p> : ''}
            {bookinstance.bookinstance.due_back ?
                <p><strong>Due back:</strong> {date(bookinstance.bookinstance.due_back)}</p> :
                ''
            }

            <Permission roles={[roles.editor]}>
                <ControlButtons
                    to={`/catalog/bookinstances/${bookinstanceId}/update`}
                    isDeleted={isDeleted}
                    name={bookinstance.bookinstance.imprint}
                    deleteHendler={deleteHendler}
                >
                    {bookinstance.bookinstance.user ? <button
                        onClick={acceptHendler}
                        className="btn btn-info"
                    >Accept</button> : <Link
                        to={`/catalog/bookinstances/${bookinstanceId}/lend`}
                        className="btn btn-success"
                    >Lend</Link>}

                </ControlButtons>
                {isAccept ?
                    <div className="alert alert-success mt-2" role="alert">
                        <strong>
                            {bookinstance.bookinstance.imprint}
                        </strong> was accepted
                    </div>
                    : ''
                }
            </Permission>
        </>
    )
}

export default BookInstance