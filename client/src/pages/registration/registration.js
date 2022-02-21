import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Checkbox, Input } from "../../components/formControls/formControls"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../../index"
import { observer } from "mobx-react-lite"

const Registration = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const { store } = useContext(Context);
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        await store.registration(formData.email, formData.password)
            .then(res => {
                if (res.status == 200) {
                    navigate('/')
                } else {
                    throw res
                }
            }
            ).catch(err => {
                setError('email', { type: "string", message: err.data.message })
                setError('password', { type: "string", message: err.data.message })
            })
    }
    return (
        <div className="authorization">
            <div className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
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
                    <div className="authorization__policy checkbox mb-3">
                        <Checkbox
                            register={register}
                            errors={errors}
                            validate={{ required: true }}
                            name="policy"
                            id="policy"
                        />
                        I have read and agree to the <Link to="#">Privacy Policy and Terms of Use</Link>
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary"
                    >Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default observer(Registration)