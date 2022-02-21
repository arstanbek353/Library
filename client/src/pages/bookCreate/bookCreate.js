import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import { useForm } from 'react-hook-form'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import BookForm from '../../components/bookForm/BookForm'


const BookCreate = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [state, setState] = useState(null)
    const [book, setBook] = useState(null)
    const { loading, error, clearError, request } = useHttp()

    const onSubmit = async (formData) => {
        setBook(null)
        const res = await request(`${baseUrl}/catalog/book/create`, 'POST', formData)
        console.log(res)
        setBook(res)
        reset()
    }

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/book/create`)
        setState(data)
    }

    useEffect(() => {
        render()
    }, []);

    if (error) return <CustomError message={error} />
    if (loading || !state) return <Spinner />

    return (
        <>
            <h1>Create Book</h1>
            <BookForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                book={book}
                state={state}
                loading={loading}
            />
        </>
    )
}

export default BookCreate