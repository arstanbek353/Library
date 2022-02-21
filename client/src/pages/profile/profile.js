import { useContext } from "react"
import { Context } from "../../index"
import { observer } from "mobx-react-lite"
import { Link } from 'react-router-dom'

const Profile = () => {
    const { store } = useContext(Context);

    return (
        <div>
            <div className="h-100 p-5 bg-light border rounded-3">
                <h2>My profile</h2>
                <p>{store.isAuth ? `User ${store.user.email} is authorized` : 'SIGN IN'}</p>
                <p>{store.user.isActivated ? 'Account verified by email' : <span className="text-danger">CONFIRM ACCOUNT! Message was sent to your email</span>}</p>
                <p>User premission <b>{store.user.role}</b></p>
                <button onClick={() => store.logout()} className="btn btn-outline-secondary">Sign out</button>
                <br /><br />
                {store.user.bookInstances.length != 0 ? <h4>List of borrowed books</h4> : ''}
                <ol>
                    {store.user.bookInstances.map(bookInstance => {
                        return (
                            <li key={bookInstance}>
                                <Link to={`../catalog/bookInstances/${bookInstance}`}>{bookInstance}</Link>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default observer(Profile)