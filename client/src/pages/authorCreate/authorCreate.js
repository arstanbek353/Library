import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import AuthorForm from '../../components/authorForm/AuthorForm'

const AuthorCreate = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [author, setAuthor] = useState(null);
    const { loading, request } = useHttp();

    const onSubmit = async (formData) => {
        setAuthor(null)
        const res = await request(`${baseUrl}/catalog/author/create`, 'POST', formData)
        setAuthor(res)
        reset()
    }

    if (loading) return <Spinner />

    return (
        <>
            <h1>Create Author</h1>
            <AuthorForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                author={author}
                loading={loading}
            />
        </>
    )
}

export default AuthorCreate