import { Link } from 'react-router-dom'

const GenresList = ({ genres }) => {
    if (genres.length === 0) return '0'
    return genres.map((genre, index) => {
        if (genres.length === index + 1) {
            return <Link to={`../catalog/genres/${genre._id}`} key={genre._id}>{genre.name}</Link>
        }
        return <Link to={`../catalog/genres/${genre._id}`} key={genre._id}>{genre.name}, </Link>
    })
}

export default GenresList