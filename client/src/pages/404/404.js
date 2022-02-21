import { Link } from 'react-router-dom'

const ErrorPage404 = () => {
    return (
        <div className="Error">
            <div className="h-100 p-5 text-white bg-danger rounded-3">
                <h2>404 page not found!!!</h2>
                <Link className="btn btn-outline-light" to="/">Return to Home</Link>
            </div>
        </div>
    )
}

export default ErrorPage404