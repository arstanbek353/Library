import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import { useForm } from 'react-hook-form'
import { yyyy_MM_dd } from '../../helpers/dateFormat'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import BookInstanceForm from '../../components/bookInstanceForm/BookInstanceForm'


const BookInstanceUpdate = () => {
    const { bookinstanceId } = useParams()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [state, setState] = useState(null)
    const [bookinstance, setBookinstance] = useState(null)
    const { loading, error, clearError, request } = useHttp()

    const onSubmit = async (formData) => {
        setBookinstance(null)
        const res = await request(`${baseUrl}/catalog/bookinstance/${bookinstanceId}/update`, 'POST', formData)
        setBookinstance(res)
    }

    const render = async () => {
        clearError()
        const res = await request(`${baseUrl}/catalog/bookinstance/${bookinstanceId}/update`)
        setValue('imprint', res.bookinstance.imprint)
        setValue('book', res.bookinstance.book)
        setValue('status', res.bookinstance.status)
        if (res.bookinstance.due_back) {
            setValue('due_back', yyyy_MM_dd(res.bookinstance.due_back))
        }
        setState(res)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !state) return <Spinner />

    return (
        <>
            <h1>Update BookInstance</h1>
            <BookInstanceForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                bookinstance={bookinstance}
                state={state}
                loading={loading}
            />
        </>
    )
}

export default BookInstanceUpdate