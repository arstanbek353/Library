import { Link } from 'react-router-dom'
import { Input } from '../formControls/formControls'

const GenreForm = ({ register, handleSubmit, errors, onSubmit, genre, loading }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="name"
                className="form-control"
                placeholder="Fantasy, Poetry etc."
                id="name"
                label="Genre:"
                register={register}
                validate={{ required: true, minLength: 2 }}
                errors={errors}
            />
            <button
                className="btn btn-primary"
                type="submit"
                disabled={loading ? true : false}
            >Submit</button>
            {genre ?
                <div className="alert alert-success" role="alert">
                    {genre.message} <Link to={`../catalog/genres/${genre.genre._id}`}>
                        <strong>
                            {genre.genre.name}
                        </strong>
                    </Link>
                </div>
                : ''
            }
        </form>
    )
}
export default GenreForm