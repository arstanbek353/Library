import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import { useForm } from 'react-hook-form'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import BookForm from '../../components/bookForm/BookForm'


const BookCreate = () => {
    const { bookId } = useParams()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [state, setState] = useState(null)
    const [book, setBook] = useState(null)
    const { loading, error, clearError, request } = useHttp()

    const onSubmit = async (formData) => {
        const res = await request(`${baseUrl}/catalog/book/${bookId}/update`, 'POST', formData)
        setBook(res)
    }

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/book/${bookId}/update`)
        setValue('title', data.book.title)
        setValue('author', data.book.author._id)
        setValue('summary', data.book.summary)
        setValue('isbn', data.book.isbn)

        data.book.genre.forEach(genre => {
            data.genres.forEach(item => {
                if (item._id === genre._id) {
                    item.checked = true
                }
            })
        })
        setState(data)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !state) return <Spinner />

    return (
        <>
            <h1>Update Book</h1>
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