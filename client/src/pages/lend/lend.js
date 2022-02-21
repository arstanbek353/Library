import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Input, Select } from '../../components/formControls/formControls'
import { useForm } from 'react-hook-form'
import { baseUrl } from "../../config/config"
import { useHttp } from '../../hooks/http.hook'
import Spinner from '../../components/spinner/spinner'
import CustomError from '../../components/error/error'

const Lend = () => {
    const { bookinstanceId } = useParams()
    const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm();
    const [state, setState] = useState(null)
    const [isLend, setLend] = useState(null)
    const { loading, error, clearError, request } = useHttp();

    const render = async () => {
        clearError()
        const data = await request(`${baseUrl}/catalog/bookinstance/${bookinstanceId}/lend`)
        setState(data)
    }

    const onSubmit = async (formData) => {
        if (getValues('userId') == 'Choose') {
            setError('userId')
            return
        }
        const res = await request(`${baseUrl}/catalog/bookinstance/${bookinstanceId}/lend`, 'POST', formData)
        console.log(res)
        setLend(true)
    }

    useEffect(() => {
        render()
    }, [])

    if (error) return <CustomError message={error} />
    if (loading || !state) return <Spinner />

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Select
                register={register}
                name="userId"
                errors={errors}
                validate={{ required: true }}
                options={state.map(book => ({
                    value: book.email,
                    id: book.id
                }))} />
            <Input
                type="date"
                id="due_back"
                name="due_back"
                register={register}
                validate={{ required: true, valueAsDate: true }}
                label="due back:"
                errors={errors} />
            <button
                disabled={loading}
                className="btn btn-primary"
            >Save</button>
            {isLend ?
                <div className="alert alert-success mt-2" role="alert">
                    <strong>
                        {bookinstanceId}
                    </strong> was lended
                </div>
                : ''
            }
        </form>
    )
}

export default Lend