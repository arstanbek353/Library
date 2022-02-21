import { useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { baseUrl } from '../../config/config'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import GenreForm from '../../components/genreForm/GenreForm'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'

const GenreUpdate = () => {
    const { genreId } = useParams()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [genre, setGenre] = useState(null)
    const { loading, error, clearError, request } = useHttp()

    const onSubmit = async (formData) => {
        setGenre(null)
        const res = await request(`${baseUrl}/catalog/genre/${genreId}/update`, 'POST', formData)
        setGenre(res)
    }

    const render = async () => {
        clearError()
        const res = await request(`${baseUrl}/catalog/genre/${genreId}/update`)
        setValue('name', res.genre.name)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading) return <Spinner />

    return (
        <>
            <h1>Update Genre</h1>
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

export default GenreUpdate