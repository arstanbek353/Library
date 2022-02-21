import { Link } from 'react-router-dom'
import { Input, Select, Textarea, Checkboxes } from '../formControls/formControls'

const BookForm = ({ register, handleSubmit, errors, onSubmit, book, state, loading }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <Input
                    name="title"
                    type="text"
                    placeholder="Name of book"
                    id="title"
                    label="Title:"
                    register={register}
                    validate={{
                        required: true
                    }}
                    errors={errors}
                />
                <label htmlFor="title">Author:</label>
                {<Select
                    register={register}
                    name="author"
                    validate={{
                        required: true
                    }}
                    options={state.authors.map(author => ({
                        value: `${author.first_name} ${author.family_name}`,
                        id: author._id
                    }))} />}
                <Textarea
                    placeholder="Summary"
                    id="summary"
                    name="summary"
                    label="Summary:"
                    register={register}
                    validate={{
                        required: true
                    }}
                    errors={errors}
                ></Textarea>
                {errors.summary && <span>This field is required</span>}
                <Input
                    type="text"
                    placeholder="ISBN13"
                    id="isbn"
                    name="isbn"
                    label="ISBN:"
                    register={register}
                    validate={{
                        required: true
                    }}
                    errors={errors}
                />
                {<Checkboxes
                    name={"genre"}
                    checkboxes={state.genres.map(value => ({
                        id: value._id,
                        label: value.name,
                        register: register
                    }))}
                />}

            </div>
            <button
                className="btn btn-primary"
                type="submit"
                disabled={loading ? true : false}
            >Submit</button>
            {book ?
                <div className="alert alert-success" role="alert">
                    {book.message} <Link to={`../catalog/books/${book.book._id}`}>
                        <strong>
                            {book.book.title}
                        </strong>
                    </Link>
                </div>
                : ''
            }
        </form>
    )
}
export default BookForm