import { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import { useForm } from 'react-hook-form'
import GenreForm from '../../components/genreForm/GenreForm'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'

const GenreCreate = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [genre, setGenre] = useState(null);
    const { loading, request } = useHttp();

    const onSubmit = async (formData) => {
        setGenre(null)
        const res = await request(`${baseUrl}/catalog/genre/create`, 'POST', formData)
        setGenre(res)
    }

    if (loading) return <Spinner />

    return (
        <>
            <h1>Create Genre</h1>
            <GenreForm
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                genre={genre}
                loading={loading}
            />
        </>
    )
}

export default GenreCreate