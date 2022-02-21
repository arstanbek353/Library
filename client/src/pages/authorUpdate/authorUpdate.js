import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import { yyyy_MM_dd } from '../../helpers/dateFormat'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'
import AuthorForm from '../../components/authorForm/AuthorForm'
import { useParams } from 'react-router'

const AuthorUpdate = () => {
    const { authorId } = useParams()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [author, setAuthor] = useState(null)
    const { loading, request } = useHttp()

    const onSubmit = async (formData) => {
        setAuthor(null)
        const res = await request(`${baseUrl}/catalog/author/${authorId}/update`, 'POST', formData)
        setAuthor(res)
    }

    const render = async () => {
        const res = await request(`${baseUrl}/catalog/author/${authorId}/update`)
        setValue('first_name', res.author.first_name)
        setValue('family_name', res.author.family_name)
        if (res.author.date_of_birth) {
            setValue('date_of_birth', yyyy_MM_dd(res.author.date_of_birth))
        }
        if (res.author.date_of_death) {
            setValue('date_of_death', yyyy_MM_dd(res.author.date_of_death))
        }
    }

    useEffect(() => {
        render()
    }, [])

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

export default AuthorUpdate