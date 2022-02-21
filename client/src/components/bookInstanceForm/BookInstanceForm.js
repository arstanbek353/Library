import { Link } from 'react-router-dom'
import { Input, Select } from '../formControls/formControls'

const BookInstanceForm = ({ register, handleSubmit, errors, onSubmit, bookinstance, state, loading }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <Input
                    type="text"
                    placeholder="Publisher and date information"
                    id="imprint"
                    name="imprint"
                    register={register}
                    validate={{ required: true }}
                    label="Imprint:"
                    errors={errors}
                />
                <label htmlFor="title">Book:</label>
                {<Select
                    register={register}
                    name="book"
                    options={state.book_list.map(book => ({
                        value: book.title,
                        id: book._id

                    }))} />}
                <div className="row">
                    <div className="form-group mb-2 col-sm-6">
                        <label htmlFor="title" className="mb-1">Status:</label>
                        {<Select
                            className="col-sm-6"
                            register={register}
                            name="status"
                            options={[
                                { value: 'Maintenance', id: 'Maintenance' },
                                { value: 'Available', id: 'Available' },
                                { value: 'Loaned', id: 'Loaned' },
                                { value: 'Reserved', id: 'Reserved' }
                            ]}
                        />}
                    </div>
                    <Input
                        className="col-sm-6"
                        type="date"
                        id="due_back"
                        name="due_back"
                        register={register}
                        validate={{ valueAsDate: true }}
                        label="Due back:"
                        errors={errors}
                    />
                </div>
            </div>
            <button
                className="btn btn-primary mt-2"
                type="submit"
                disabled={loading ? true : false}
            >Submit</button>
            {bookinstance ?
                <div className="alert alert-success" role="alert">
                    {bookinstance.message} <Link to={`../catalog/bookinstances/${bookinstance.bookinstance._id}`}>
                        <strong>
                            {bookinstance.bookinstance.imprint}
                        </strong>
                    </Link>
                </div>
                : ''
            }
        </form>
    )
}
export default BookInstanceForm