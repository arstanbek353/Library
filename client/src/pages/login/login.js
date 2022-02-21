import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../components/formControls/formControls"
import Spinner from '../../components/spinner/spinner'
import { useNavigate } from "react-router-dom"
import { Context } from "../../index"
import { observer } from "mobx-react-lite"

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { store } = useContext(Context);


    const onSubmit = async (formData) => {
        await store.login(formData.email, formData.password)
            .then(res => {
                if (res.status == 200) {
                    navigate('/')
                    window.location.reload();
                } else {
                    throw res
                }
            }
            ).catch(err => {
                setError('email', { type: "string", message: err.data.message })
                setError('password', { type: "string", message: err.data.message })
            })
    }

    if (store.isLoading) return <Spinner />

    return (
        <div className="authorization">
            <div className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating">

                        <Input
                            register={register}
                            errors={errors}
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Email"
                            label="Email"
                            validate={{ required: true }}
                        />
                    </div>
                    <div className="form-floating">

                        <Input
                            register={register}
                            errors={errors}
                            name="password"
                            type="password"
                            id="password"
                            placeholder="Password"
                            label="Password"
                            validate={{ required: true }}
                        />
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary"
                    >Login</button>
                </form>
            </div>
        </div>
    )
}

export default observer(Login)