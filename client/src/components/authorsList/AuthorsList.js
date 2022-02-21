import date from '../../helpers/dateFormat'
import { Link } from 'react-router-dom'

const AuthorsList = ({ authors }) => {
    return authors.map(author => {
        return (
            <li key={author._id} className="list-group-item">
                <Link to={author._id} className="ms-2">
                    <span className="fw-bold">{author.first_name} {author.family_name} </span>
                    ({date(author.date_of_birth)} {date(author.date_of_death)})
                </Link>
            </li>
        )
    })
}
export default AuthorsList