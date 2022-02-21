import { Link } from 'react-router-dom'

const CustomError = () => {
    return (
        <div className="Error">
            <div className="h-100 p-5 text-white bg-danger rounded-3">
                <h2>Something went wrong!!!</h2>
                <p>Try again after few minutes</p>
                <Link className="btn btn-outline-light" to="/">Return to Home</Link>
            </div>
        </div>
    )
}

export default CustomError