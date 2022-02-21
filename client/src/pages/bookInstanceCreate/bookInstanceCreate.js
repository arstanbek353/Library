import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import { useForm } from 'react-hook-form'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import BookInstanceForm from '../../components/bookInstanceForm/BookInstanceForm'


const BookInstanceCreate = () => {
    const { register, handleSubmit, onChange, reset, formState: { errors } } = useForm()
    const [state, setState] = useState(null)
    const [bookinstance, setBookinstance] = useState(null)
    const { loading, error, clearError, request } = useHttp();

    const onSubmit = async (formData) => {
        setBookinstance(null)
        const res = await request(`${baseUrl}/catalog/bookinstance/create`, 'POST', formData)
        setBookinstance(res)
        reset()
    }

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/bookinstance/create`)
        setState(data)
    }

    useEffect(() => {
        render()
    }, []);

    if (error) return <CustomError message={error} />
    if (loading || !state) return <Spinner />

    return (
        <>
            <h1>Create BookInstance</h1>
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

export default BookInstanceCreate