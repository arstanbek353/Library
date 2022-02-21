import { Link } from 'react-router-dom'
import { Input } from '../formControls/formControls'

const AuthorForm = ({ register, handleSubmit, errors, onSubmit, author, loading }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {<Input
                register={register}
                validate={{ required: true }}
                placeholder="First name (Christian) last"
                id="first_name"
                label="First Name:"
                name="first_name"
                errors={errors}
            />}
            {<Input
                register={register}
                validate={{ required: true }}
                placeholder="Family name (surname)"
                id="family_name"
                label="Family Name:"
                name="family_name"
                errors={errors}
            />}
            {<Input
                register={register}
                validate={{ valueAsDate: true }}
                id="date_of_birth"
                label="Date of birth:"
                name="date_of_birth"
                type="date"
                errors={errors}
            />}
            {<Input
                register={register}
                validate={{ valueAsDate: true }}
                id="date_of_death"
                label="Date of death:"
                name="date_of_death"
                type="date"
                errors={errors}
            />}
            <button
                className="btn btn-primary"
                type="submit"
                disabled={loading ? true : false}
            >Submit</button>
            {author ?
                <div className="alert alert-success" role="alert">
                    {author.message} <Link to={`../catalog/authors/${author.author._id}`}>
                        <strong>
                            {author.author.first_name} {author.author.family_name}
                        </strong>
                    </Link>
                </div>
                : ''
            }
        </form>
    )
}
export default AuthorForm